// Contains Door, rift, Bomb, Bamboo Copter, Body-Exchange-Machine, big-light, small-light position in tiles (1-100)

const SPECIAL_TILES_TEMPLATE = {
    // 🟢 Doors (Ladders) - Boost Progress
    7: { type: "door", to: 13 },
    17: { type: "door", to: 24 },
    21: { type: "door", to: 32 },
    44: { type: "door", to: 65 },
    69: { type: "door", to: 88 },

    // 🔴 Time Rifts (Snakes)
    9: { type: "rift", to: 2 },
    26: { type: "rift", to: 8 },
    50: { type: "rift", to: 35 },
    63: { type: "rift", to: 41 },
    71: { type: "rift", to: 55 },
    89: { type: "rift", to: 67 },
    97: { type: "rift", to: 78 },

    // 💣 Bomb
    14: { type: "bomb", to: 1 },

    // 🚁 Bamboo Copter (+10)
    12: { type: "bamboo-copter", to: 22 },
    28: { type: "bamboo-copter", to: 38 },
    46: { type: "bamboo-copter", to: 56 },
    60: { type: "bamboo-copter", to: 70 },
    75: { type: "bamboo-copter", to: 85 },

    // 🥚 Easter-Egg
    66: { type: "easter-egg" },

    // 🔆 Big Light (Double Move)
    52: { type: "big-light" },
    48: { type: "big-light" },
    82: { type: "big-light" },

    // 🌙 Small Light (Half Move)
    19: { type: "small-light" },
    57: { type: "small-light" },
    90: { type: "small-light" },
};

const ALL_TILES = Object.fromEntries(
    Array.from({ length: 100 }, (_, i) => {
        const tile = i + 1; // 1 to 100
        return [tile, SPECIAL_TILES_TEMPLATE[tile] ?? { type: "none" }];
    })
)

export default ALL_TILES;