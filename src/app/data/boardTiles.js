// Contains Door, rift, Bomb, Bamboo Copter, Body-Exchange-Machine, big-light, small-light position in tiles (1-100)

export const SPECIAL_TILES_TEMPLATE = {
    // 🟢 Doors (Ladders) - Boost Progress
    3: { type: "door", to: 17 },
    7: { type: "door", to: 13 },
    21: { type: "door", to: 32 },
    44: { type: "door", to: 92 },
    69: { type: "door", to: 88 },

    // 🔴 Time Rifts (Snakes)
    9: { type: "rift", to: 2 },
    26: { type: "rift", to: 8 },
    50: { type: "rift", to: 35 },
    63: { type: "rift", to: 41 },
    71: { type: "rift", to: 55 },
    89: { type: "rift", to: 67 },
    97: { type: "rift", to: 78 },

    // 💣 Bombs
    15: { type: "bomb", to: 1 },
    37: { type: "bomb", to: 1 },
    84: { type: "bomb", to: 1 },

    // 🚁 Bamboo Copter (+10)
    12: { type: "bamboo-copter", to: 22 },
    28: { type: "bamboo-copter", to: 38 },
    46: { type: "bamboo-copter", to: 56 },
    60: { type: "bamboo-copter", to: 70 },
    75: { type: "bamboo-copter", to: 85 },

    // 🔄 Body Exchange Machine
    33: { type: "exchange-machine" },
    66: { type: "exchange-machine" },

    // 🔆 Big Light (Double Move)
    5: { type: "big-light" },
    48: { type: "big-light" },
    82: { type: "big-light" },

    // 🌙 Small Light (Half Move)
    19: { type: "small-light" },
    57: { type: "small-light" },
    90: { type: "small-light" },
};