export function combatRatio(attacker: number, defender: number): [number, number] {
    if (attacker > defender) {
        return defender !== 0 ? [Math.floor(attacker / defender), 1] : [1, 1];
    } else {
        return attacker !== 0 ? [1, Math.ceil(defender / attacker)] : [1, 1];
    }
}