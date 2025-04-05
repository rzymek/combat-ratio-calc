import {clone} from "remeda";

export interface Line {
    values: number[],
    modifiers: {}
}

const initialState = {
    attacker: [{values: [], modifiers: {}}] as Line[],
    defender: [{values: [], modifiers: {}}] as Line[],
    selected: 'attacker' as 'attacker' | 'defender',
    selectedLine: 0,

} as const;

export const state = clone(initialState);

export function resetState() {
    const preserve: Partial<typeof state> = {}
    Object.assign(state, clone(initialState), preserve);
}