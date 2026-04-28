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

---@type string[]
Shared.RadioItem = {
    'radio'
}

---@class Battery
---@field state boolean
---@field consume number
---@field depletionTime number

---@type Battery
Shared.Battery = {
    state = true,
    consume = 1,
    depletionTime = 1,
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
