import SPECIAL_TILES_TEMPLATE from '../data/boardTiles.js';

// To allow resetting during new game
let SPECIAL_TILES = JSON.parse(JSON.stringify(SPECIAL_TILES_TEMPLATE));

// Abstract Character Class
class Character {
    constructor(name, abilities) {
        if (new.target === Character) {
            throw new Error("Character is abstract and cannot be instantiated directly");
        }
        this.name = name;
        this.abilities = abilities || "";
        this.tilePosition = 1;
        this.gadgets_points = 0;
        this.isPlaying = false;
        this.canUseAbility = false;
        this.steppedOnBigLight = false;
        this.steppedOnSmallLight = false;
    }

    handleSpecialTile() {
        const currentPosition = this.tilePosition;
        const tile = SPECIAL_TILES[currentPosition];
        if (tile) {
            if (tile.to !== undefined) {
                this.tilePosition = tile.to;
            }
            this.steppedOnBigLight = tile.type === "big-light";
            this.steppedOnSmallLight = tile.type === "small-light";

            return { "tileEffect": tile.type, "newPosition": this.tilePosition };
        }
    }

    move(movement) {
        if (this.steppedOnBigLight) movement *= 2;
        if (this.steppedOnSmallLight) movement = Math.floor(movement / 2);

        this.steppedOnBigLight = false;
        this.steppedOnSmallLight = false;

        if (this.tilePosition + movement < 1) this.tilePosition = 1;
        else if (this.tilePosition + movement > 100) this.tilePosition = 100;
        else this.tilePosition += movement;

        this.handleSpecialTile();
    }

    // Abstract method to be implemented by subclasses
    useAbility() {
        // To be overridden by subclasses
        throw new Error("useAbility method must be implemented by subclass");
    }
}

class Nobita extends Character {
    constructor() {
        super("Nobita", "Randomized start position (Squares 2-10) and Starting Bonus: +1 Gadget Point");
        this.canUseAbility = true;
    }

    useAbility() {
        if (this.canUseAbility) {
            // Nobita's ability implementation
            this.tilePosition = Math.floor(Math.random() * 9) + 2;
            this.gadgets_points = 1;
            this.canUseAbility = false;
        }
    }
}

class Shizuka extends Character {
    constructor() {
        super("Shizuka", "Teleport any player ahead of her position to her current square thrice per game");
        this.canUseAbility = false;
        this.timesAbilityUsed = 0;
        this.playerToTeleport = null;
    }

    setPlayerToTeleport(player) {
        this.playerToTeleport = player;
    }

    useAbility() {
        if (!this.canUseAbility) return;

        if (
            this.playerToTeleport &&
            this.playerToTeleport.tilePosition > this.tilePosition
        ) {
            this.playerToTeleport.tilePosition = this.tilePosition;
        }

        this.timesAbilityUsed++;

        // auto-disable when exhausted
        this.canUseAbility = this.timesAbilityUsed < 3;
    }
}

class Gian extends Character {
    constructor() {
        super("Gian", "Rage State Activation Triggered when displaced by Time Machine Rift - Next Turn: Base Movement + 2 Bonus Squares");
        this.canUseAbility = false;
    }

    useAbility() {
        if (this.canUseAbility) {
            // Gian's ability implementation
            this.tilePosition += 2;
            this.canUseAbility = false;
        }
    }

    handleSpecialTile() {
        const currentPosition = this.tilePosition;
        const tile = SPECIAL_TILES[currentPosition];
        if (tile) {
            if (tile.to !== undefined) {
                this.tilePosition = tile.to;
            }

            this.steppedOnBigLight = tile.type === "big-light";
            this.steppedOnSmallLight = tile.type === "small-light";

            if (tile.type === "rift") {
                this.canUseAbility = true;
                this.useAbility();
            }

            return { "tileEffect": tile.type, "newPosition": this.tilePosition };
        }
    }
}

class Suneo extends Character {
    constructor(maxCooldown = 5) {
        super("Suneo", "Nullify ONE Anywhere Door or Time Machine Rift effect directed at him per game and Starting Bonus: +1 Gadget Point");
        this.gadgets_points = 1;
        this.abilityCooldown = 0;  // turns left to cooldown
        this.maxCooldown = maxCooldown; // maximum cooldown in turns
        this.canUseAbility = false;
        this.positionBeforeRifted = null;
    }
    useAbility() {
        if (this.canUseAbility && this.abilityCooldown <= 0 && this.positionBeforeRifted !== null) {
            // Suneo's ability implementation
            this.tilePosition = this.positionBeforeRifted;
            this.positionBeforeRifted = null;

            this.abilityCooldown = this.maxCooldown;
            this.canUseAbility = false;
        }
    }

    move(movement) {
        if (this.steppedOnBigLight) movement *= 2;
        if (this.steppedOnSmallLight) movement = Math.floor(movement / 2);

        this.abilityCooldown = Math.max(0, this.abilityCooldown - 1);
        if (this.abilityCooldown === 0 && this.positionBeforeRifted && this.positionBeforeRifted !== this.tilePosition) {
            this.canUseAbility = true;
        }

        this.steppedOnBigLight = false;
        this.steppedOnSmallLight = false;

        if (this.tilePosition + movement < 1) this.tilePosition = 1;
        else if (this.tilePosition + movement > 100) this.tilePosition = 100;
        else this.tilePosition += movement;

        this.handleSpecialTile();
    }

    handleSpecialTile() {

        const currentPosition = this.tilePosition;
        const tile = SPECIAL_TILES[currentPosition];
        if (tile) {
            if (tile.to !== undefined) {
                this.tilePosition = tile.to;
            }

            this.steppedOnBigLight = tile.type === "big-light";
            this.steppedOnSmallLight = tile.type === "small-light";

            if (tile.type === "rift") {
                this.positionBeforeRifted = currentPosition;
                if (this.abilityCooldown === 0) {
                    this.canUseAbility = true;
                }
            }

            return { "tileEffect": tile.type, "newPosition": this.tilePosition };
        }
    }
}

class Dekisugi extends Character {
    constructor(maxCooldown = 5) {
        super("Dekisugi", "Can multiply his dice roll result by -1 to reverse the outcome Usage: Unlimited activations per mission (Cooldown: 5 turn)");
        this.abilityCooldown = 0;  // turns left to cooldown
        this.maxCooldown = maxCooldown; // maximum cooldown in turns
        this.canUseAbility = true;
    }

    useAbility() {
        if (this.canUseAbility && this.abilityCooldown <= 0) {
            // Dekisugi's ability is implemented in the gameEngine, where the dice result is multiplied by -1 if user chooses to use it. This function is just to manage cooldown.
            this.abilityCooldown = this.maxCooldown;
            this.canUseAbility = false;
        }
    }

    move(movement) {
        this.abilityCooldown = Math.max(0, this.abilityCooldown - 1);;
        if (this.abilityCooldown === 0) {
            this.canUseAbility = true;
        }

        if (this.steppedOnBigLight) movement *= 2;
        if (this.steppedOnSmallLight) movement = Math.floor(movement / 2);

        this.steppedOnBigLight = false;
        this.steppedOnSmallLight = false;

        if (this.tilePosition + movement < 1) this.tilePosition = 1;
        else if (this.tilePosition + movement > 100) this.tilePosition = 100;
        else this.tilePosition += movement;

        this.handleSpecialTile();
    }
}

// Helper function to exchange positions of two characters
function exchangePositions(charA, charB) {
    const tempPosition = charA.tilePosition;
    charA.tilePosition = charB.tilePosition;
    charB.tilePosition = tempPosition;
    return { newPositionA: charA.tilePosition, newPositionB: charB.tilePosition };
}

// Function to reset special tiles to initial state
function resetSpecialTiles() {
    SPECIAL_TILES = JSON.parse(JSON.stringify(SPECIAL_TILES_TEMPLATE));
}

export { Nobita, Shizuka, Gian, Suneo, Dekisugi, exchangePositions, resetSpecialTiles };