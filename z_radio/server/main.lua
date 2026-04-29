local channels = {}
local jammer = {}
local batteryData = {}
local usageData = {}
local spawnedDefaultJammer = false

-- ========== BATTERY & USAGE PERSISTENCE ==========

AddEventHandler('onResourceStart', function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then return end
    local batteryJson = LoadResourceFile(GetCurrentResourceName(), 'battery.json')
    batteryData = batteryJson and json.decode(batteryJson) or {}
    local usageJson = LoadResourceFile(GetCurrentResourceName(), 'usage.json')
    usageData = usageJson and json.decode(usageJson) or {}
end)

AddEventHandler('onResourceStop', function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then return end
    for i = 1, #jammer do
        DeleteEntity(jammer[i].entity)
    end
    jammer = {}
    SaveResourceFile(GetCurrentResourceName(), 'battery.json', json.encode(batteryData), -1)
    SaveResourceFile(GetCurrentResourceName(), 'usage.json', json.encode(usageData), -1)
end)

-- ========== BATTERY DRAIN ==========

RegisterNetEvent('z_radio:server:consumeBattery', function(data)
    local src = source
    for i = 1, #data do
        local id = data[i]
        if not batteryData[id] then batteryData[id] = 100 end
        if not usageData[id] then usageData[id] = 0 end

        local drain = Shared.Battery.drainRate
        local battery = batteryData[id] - drain
        batteryData[id] = math.max(battery, 0)

        usageData[id] = usageData[id] + (Shared.Battery.drainInterval / 60)

        TriggerClientEvent('z_radio:client:batteryUpdate', src, batteryData[id])

        if batteryData[id] <= 0 then
            if Shared.RadioBreak.enabled and Shared.RadioBreak.breakOnEmpty then
                TriggerEvent('z_radio:server:breakRadio', src, id)
            else
                TriggerClientEvent('z_radio:client:nocharge', src)
            end
        elseif Shared.RadioBreak.enabled then
            local usageMinutes = usageData[id]
            if usageMinutes >= Shared.RadioBreak.minUsageBeforeBreak then
                local roll = math.random(1, 100)
                if roll <= Shared.RadioBreak.breakChancePerTick then
                    TriggerEvent('z_radio:server:breakRadio', src, id)
                end
            end
        end
    end
end)

-- ========== RADIO BREAK MECHANIC ==========

RegisterNetEvent('z_radio:server:breakRadio', function(src, radioId)
    local player = Framework.core.GetPlayer(src)
    if not player then return end

    local hasWorking = false
    local workingSlot = nil

    for i = 1, #Shared.RadioItem do
        local item = player.getItem(Shared.RadioItem[i])
        if item then
            hasWorking = true
            workingSlot = item.slot
            break
        end
    end

    if not hasWorking then return end

    player.removeItem(Shared.RadioItems.working, 1, workingSlot)
    player.addItem(Shared.RadioItems.broken, 1)

    if batteryData[radioId] then
        batteryData[radioId] = nil
    end
    if usageData[radioId] then
        usageData[radioId] = nil
    end

    TriggerClientEvent('z_radio:client:radioBroken', src)
end)

-- ========== RECHARGE BATTERY ==========

RegisterNetEvent('z_radio:server:rechargeBattery', function()
    local src = source
    local player = Framework.core.GetPlayer(src)
    for i = 1, #Shared.RadioItem do
        local item = player.getItem(Shared.RadioItem[i])
        if item then
            local id = item.metadata?.radioId or false
            if not id then return end
            batteryData[id] = Shared.Battery.rechargeAmount
            player.removeItem(Shared.RadioItems.battery, 1)
            TriggerClientEvent('z_radio:client:batteryUpdate', src, batteryData[id])
            break
        end
    end
end)

-- ========== USE BROKEN RADIO (shows blackscreen) ==========

RegisterNetEvent('z_radio:server:useBrokenRadio', function()
    local src = source
    TriggerClientEvent('z_radio:client:useBroken', src)
end)

-- ========== JAMMER SYSTEM ==========

RegisterNetEvent('z_radio:server:spawnobject', function(data)
    local src = source
    CreateThread(function()
        local entity = CreateObject(joaat(Shared.Jammer.model), data.coords.x, data.coords.y, data.coords.z, true, true, false)
        while not DoesEntityExist(entity) do Wait(50) end
        SetEntityHeading(entity, data.coords.w)
        local netobj = NetworkGetNetworkIdFromEntity(entity)
        if data.canRemove then
            local player = Framework.core.GetPlayer(src)
            player.removeItem('jammer', 1)
        end
        TriggerClientEvent('z_radio:client:syncobject', -1, {
            enable = true,
            object = netobj,
            coords = data.coords,
            id = data.id,
            range = data.range or Shared.Jammer.range.default,
            allowedChannels = data.allowedChannels or {},
            canRemove = data.canRemove,
            canDamage = data.canDamage
        })
        jammer[#jammer + 1] = {
            enable = true,
            entity = entity,
            id = data.id,
            coords = data.coords,
            range = data.range or Shared.Jammer.range.default,
            allowedChannels = data.allowedChannels or {},
            canRemove = data.canRemove,
            canDamage = data.canDamage
        }
    end)
end)

RegisterNetEvent('z_radio:server:togglejammer', function(id)
    for i = 1, #jammer do
        local entity = jammer[i]
        if entity.id == id then
            jammer[i].enable = not jammer[i].enable
            TriggerClientEvent('z_radio:client:togglejammer', -1, id, jammer[i].enable)
            break
        end
    end
end)

RegisterNetEvent('z_radio:server:removejammer', function(id, isDamaged)
    local src = source
    CreateThread(function()
        for i = 1, #jammer do
            local entity = jammer[i]
            if entity.id == id then
                DeleteEntity(entity.entity)
                TriggerClientEvent('z_radio:client:removejammer', -1, id)
                table.remove(jammer, i)
                if not isDamaged then
                    local player = Framework.core.GetPlayer(src)
                    player.addItem('jammer', 1)
                end
                break
            end
        end
    end)
end)

RegisterNetEvent('z_radio:server:changeJammerRange', function(id, range)
    for i = 1, #jammer do
        local entity = jammer[i]
        if entity.id == id then
            jammer[i].range = range
            TriggerClientEvent('z_radio:client:changeJammerRange', -1, id, range)
            break
        end
    end
end)

RegisterNetEvent('z_radio:server:removeallowedchannel', function(id, allowedChannels)
    for i = 1, #jammer do
        local entity = jammer[i]
        if entity.id == id then
            jammer[i].allowedChannels = allowedChannels
            TriggerClientEvent('z_radio:client:removeallowedchannel', -1, id, allowedChannels)
            break
        end
    end
end)

RegisterNetEvent('z_radio:server:addallowedchannel', function(id, allowedChannels)
    for i = 1, #jammer do
        local entity = jammer[i]
        if entity.id == id then
            jammer[i].allowedChannels = allowedChannels
            TriggerClientEvent('z_radio:client:addallowedchannel', -1, id, allowedChannels)
            break
        end
    end
end)

-- ========== CHANNEL SYSTEM ==========

RegisterNetEvent('z_radio:server:addToRadioChannel', function(channel, username)
    local src = source
    if not channels[channel] then
        channels[channel] = {}
    end
    channels[channel][tostring(src)] = { name = username, isTalking = false }
    TriggerClientEvent('z_radio:client:radioListUpdate', -1, channels[channel], channel)
end)

RegisterNetEvent('z_radio:server:removeFromRadioChannel', function(channel)
    local src = source
    if not channels[channel] then return end
    channels[channel][tostring(src)] = nil
    TriggerClientEvent('z_radio:client:radioListUpdate', -1, channels[channel], channel)
end)

-- ========== PLAYER DISCONNECT ==========

AddEventHandler("playerDropped", function()
    local plyid = source
    for id, channel in pairs(channels) do
        if channel[tostring(plyid)] then
            channels[id][tostring(plyid)] = nil
            TriggerClientEvent('z_radio:client:radioListUpdate', -1, channels[id], id)
            break
        end
    end
end)

-- ========== DEFAULT JAMMER ==========

RegisterNetEvent("z_radio:server:createdefaultjammer", function()
    if spawnedDefaultJammer then return end
    for i = 1, #Shared.Jammer.default do
        local data = Shared.Jammer.default[i]
        TriggerEvent('z_radio:server:spawnobject', {
            coords = data.coords,
            id = data.id,
            range = data.range,
            allowedChannels = data.allowedChannels,
            canRemove = false,
            canDamage = data.canDamage
        })
    end
    spawnedDefaultJammer = true
end)

-- ========== RADIO DATA HELPERS ==========

local function SetRadioData(src, slot)
    local player = Framework.core.GetPlayer(src)
    local radioId = player.id .. math.random(1000, 9999)
    local name = player.charinfo.firstname .. " " .. player.charinfo.lastname
    if Shared.Inventory == 'ox' then
        exports.ox_inventory:SetMetadata(src, slot, { radioId = radioId, name = name })
        return radioId
    elseif Shared.Inventory == 'qb' or Shared.Inventory == 'ps' then
        local items = player.items
        local item = items[slot]
        if item then
            item.info = item.info or {}
            item.info = {
                radioId = radioId,
                name = name
            }
            local invResourceName = exports.bl_bridge:getFramework('inventory')
            exports[invResourceName]:SetInventory(src, items)
            return radioId
        end
        return false
    elseif Shared.Inventory == 'qs' then
        exports['qs-inventory']:SetItemMetadata(src, slot, { radioId = radioId, name = name })
        return radioId
    else
        return false
    end
end

local function GetSlotWithRadio(source)
    local player = Framework.core.GetPlayer(source)
    for i = 1, #Shared.RadioItem do
        local item = player.getItem(Shared.RadioItem[i])
        if item then
            return item.slot
        end
    end
end

lib.callback.register('z_radio:server:getradiodata', function(source, slot)
    if not Shared.Inventory or not Shared.Battery.state then return 100, 'PERSONAL' end
    local battery = 100
    local player = Framework.core.GetPlayer(source)
    if not slot then
        slot = GetSlotWithRadio(source)
    end
    local slotData = player.items[slot]
    if slotData and lib.table.contains(Shared.RadioItem, slotData.name) then
        local id = false
        if not slotData.metadata?.radioId then
            id = SetRadioData(source, slot)
        else
            id = slotData.metadata?.radioId
        end
        battery = id and batteryData[id] or 100
        local usage = id and usageData[id] or 0
        return battery, id, usage
    end
    return battery, nil, 0
end)

lib.callback.register('z_radio:server:getjammer', function()
    return jammer
end)

-- ========== COMMANDS ==========

if Shared.UseCommand or not Shared.Inventory then
    if not Shared.Ready then return end
    lib.addCommand('radio', {
        help = 'Otworz menu radia',
        params = {},
    }, function(source)
        TriggerClientEvent('z_radio:client:use', source, 100)
    end)
    lib.addCommand('jammer', {
        help = 'Ustaw Jammer',
        params = {},
    }, function(source)
        TriggerClientEvent('z_radio:client:usejammer', source)
    end)
    lib.addCommand('rechargeradio', {
        help = 'Naladuj baterie radia',
        params = {},
    }, function(source)
        TriggerClientEvent('z_radio:client:recharge', source)
    end)
end

lib.addCommand('remradiodata', {
    help = 'Usun dane radia',
    params = {},
}, function(source)
    TriggerClientEvent('z_radio:client:removedata', source)
end)

-- ========== REGISTER USABLE ITEMS ==========

if Shared.Ready then
    for i = 1, #Shared.RadioItem do
        Framework.core.RegisterUsableItem(Shared.RadioItem[i], function(source, slot, metadata)
            TriggerClientEvent('z_radio:client:use', source, slot, metadata)
        end)
    end

    Framework.core.RegisterUsableItem(Shared.RadioItems.broken, function(source, slot, metadata)
        TriggerClientEvent('z_radio:client:useBroken', source)
    end)

    if Shared.Jammer.state then
        Framework.core.RegisterUsableItem('jammer', function(source)
            TriggerClientEvent('z_radio:client:usejammer', source)
        end)
    end

    if Shared.Battery.state then
        Framework.core.RegisterUsableItem(Shared.RadioItems.battery, function(source)
            TriggerClientEvent('z_radio:client:recharge', source)
        end)
    end
end
