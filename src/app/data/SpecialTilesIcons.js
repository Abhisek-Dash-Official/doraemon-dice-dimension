import ALL_TILES from "./boardTiles";

const SPECIAL_TILE_ICONS = {
    "door": "door.png",
    "rift": "rift.png",
    "bomb": "bomb.png",
    "bamboo-copter": "bamboo-copter.png",
    "big-light": "big-light.png",
    "small-light": "small-light.png",
    "easter-egg": "easter-egg.png",
};

const DESTINATION_TILE_ICONS = Object.entries(ALL_TILES).reduce(
    (acc, [fromTile, tile]) => {
        if (
            tile.to &&
            ["door", "rift", "bamboo-copter"].includes(tile.type)
        ) {
            acc[tile.to] = {
                fromTile: Number(fromTile),
                fromType: tile.type,
                icon: {
                    door: "door-open.png",
                    rift: "rift-arrival.png",
                    "bamboo-copter": "broken-bamboo-copter.png",
                }[tile.type],
            };
        }
        return acc;
    },
    {}
);

export { SPECIAL_TILE_ICONS, DESTINATION_TILE_ICONS };