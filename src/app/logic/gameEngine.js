import { Nobita, Shizuka, Gian, Suneo, Dekisugi, exchangePositions, resetSpecialTiles } from "./charactorClasses.js";
export function RestartGameEngine(playingCharacters) {
    // playingCharacters = {Nobita: {tile: 1, mode: 'p', points: 0}, ...}

    // Reset special tiles for a fresh board
    resetSpecialTiles();

    const newCharacters = {};

    // Loop through each character name and create fresh class instances
    Object.keys(playingCharacters).forEach((charName) => {
        switch (charName) {
            case "Nobita":
                newCharacters[charName] = new Nobita();
                newCharacters[charName].useAbility();  // Used Nobita's ability at start
                break;
            case "Shizuka":
                newCharacters[charName] = new Shizuka();
                break;
            case "Gian":
                newCharacters[charName] = new Gian();
                break;
            case "Suneo":
                newCharacters[charName] = new Suneo();
                break;
            case "Dekisugi":
                newCharacters[charName] = new Dekisugi();
                break;
            default:
                console.warn(`Unknown character: ${charName}`);
                break;
        }
    });

    // Return the updated playingCharacters object
    return { updatedCharacters: playingCharacters, newPlayersObjects: newCharacters };
}

export function HandleDiceRollTurn(movement, currentTurn, charectersObjects) {
    const character = charectersObjects[currentTurn];
    if (!character) return { canUseAbility: false };

    character.move(movement);

    let canUseAbility = character.canUseAbility;

    if (character instanceof Shizuka) {
        if (!character.canUseAbility) {
            canUseAbility = false;
        } else {
            const hasValidTarget = Object.values(charectersObjects).some(
                p =>
                    p !== character &&
                    p.tilePosition > character.tilePosition &&
                    (p.tilePosition - character.tilePosition) <= 5
            );
            canUseAbility = hasValidTarget;
        }
    }

    return {
        canUseAbility,
        newTile: character.tilePosition
    };
}

export function HandleUseAbility(currentTurn, charectersObjects) {
    const character = charectersObjects[currentTurn];
    if (!character) return;
    if (character instanceof Shizuka) {
        const players = Object.values(charectersObjects);

        // find players ahead of Shizuka
        const target = players
            .filter(p => p !== character && p.tilePosition > character.tilePosition)
            .sort((a, b) => a.tilePosition - b.tilePosition)[0];

        if (!target) return; // no valid target

        character.setPlayerToTeleport(target);
    }

    character.useAbility();
}

export function CheckCanUseAbility(currentTurn, charectersObjects) {
    const character = charectersObjects[currentTurn];
    return character.canUseAbility;
}