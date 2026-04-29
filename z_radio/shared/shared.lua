---@type number
Shared.MaxFrequency = 500.00

---@class Jammer
---@field state boolean
---@field model string
---@field permission string[]
---@field default table
---@field range table

---@type Jammer
Shared.Jammer = {
    state = true,
    model = 'sm_prop_smug_jammer',
    permission = {"police"},
    default = {},
    range = {
        min = 10.0,
        max = 100.0,
        step = 5.0,
        default = 30.0
    }
}

---@class RadioItems
---@field working string  -- item name for working radio
---@field broken string   -- item name for broken radio
---@field battery string  -- item name for battery/cell

---@type RadioItems
Shared.RadioItems = {
    working = 'radio',
    broken = 'radio_broken',
    battery = 'radiocell',
}

---@type string[]
Shared.RadioItem = {
    'radio'
}

---@class Battery
---@field state boolean           -- enable battery system
---@field consume number          -- how much battery consumed per tick
---@field drainInterval number    -- seconds between each drain tick
---@field drainRate number        -- battery units drained per tick while radio is on
---@field rechargeAmount number   -- how much battery restored by using radiocell

---@type Battery
Shared.Battery = {
    state = true,
    consume = 1,
    drainInterval = 60,       -- drain every 60 seconds
    drainRate = 2,            -- drain 2% per tick
    rechargeAmount = 100,     -- full recharge with battery item
}

---@class RadioBreak
---@field enabled boolean             -- enable radio breaking mechanic
---@field minUsageBeforeBreak number  -- minimum usage time in minutes before radio CAN break
---@field breakChancePerTick number   -- chance (0-100) to break on each drain tick after minUsage
---@field breakOnEmpty boolean        -- instantly break when battery reaches 0

---@type RadioBreak
Shared.RadioBreak = {
    enabled = true,
    minUsageBeforeBreak = 120,    -- 2 hours minimum usage before break possible
    breakChancePerTick = 5,       -- 5% chance per drain tick after min usage
    breakOnEmpty = true,          -- radio breaks when battery hits 0
}

---@type [string]: string
Shared.RadioNames = {
    ["1"] = "MRPD CH#1",
    ["1.%"] = "MRPD CH#1",
    ["2"] = "MRPD CH#2",
    ["2.%"] = "MRPD CH#2",
    ["3"] = "MRPD CH#3",
    ["3.%"] = "MRPD CH#3",
    ["4"] = "MRPD CH#4",
    ["4.%"] = "MRPD CH#4",
    ["5"] = "MRPD CH#5",
    ["5.%"] = "MRPD CH#5",
    ["6"] = "MRPD CH#6",
    ["6.%"] = "MRPD CH#6",
    ["7"] = "MRPD CH#7",
    ["7.%"] = "MRPD CH#7",
    ["8"] = "MRPD CH#8",
    ["8.%"] = "MRPD CH#8",
    ["9"] = "MRPD CH#9",
    ["9.%"] = "MRPD CH#9",
    ["10"] = "MRPD CH#10",
    ["10.%"] = "MRPD CH#10",
    ["420"] = "Ballas CH#1",
    ["420.%"] = "Ballas CH#1",
    ["421"] = "LostMC CH#1",
    ["421.%"] = "LostMC CH#1",
    ["422"] = "Vagos CH#1",
    ["422.%"] = "Vagos CH#1",
}

Shared.RestrictedChannels = {
    [1] = {
        type = 'job',
        name = {"police", "ambulance"}
    },
    [2] = {
        type = 'job',
        name = {"police", "ambulance"}
    },
    [3] = {
        type = 'job',
        name = {"police", "ambulance"}
    },
    [4] = {
        type = 'job',
        name = {"police", "ambulance"}
    },
    [5] = {
        type = 'job',
        name = {"police", "ambulance"}
    },
    [6] = {
        type = 'job',
        name = {"police", "ambulance"}
    },
    [7] = {
        type = 'job',
        name = {"police", "ambulance"}
    },
    [8] = {
        type = 'job',
        name = {"police", "ambulance"}
    },
    [9] = {
        type = 'job',
        name = {"police", "ambulance"}
    },
    [10] = {
        type = 'job',
        name = {"police", "ambulance"}
    },
    [420] = {
        type = 'gang',
        name = {"ballas"}
    },
    [421] = {
        type = 'gang',
        name = {"lostmc"}
    },
    [422] = {
        type = 'gang',
        name = {"vagos"}
    },
}

lib.locale()
