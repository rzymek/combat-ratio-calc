import {clone} from "remeda";


const initialState = {
    attacker: [] as number[],
    defender: [] as number[],
    selected: 'attacker' as 'attacker' | 'defender',
    selectedLine: 0,

};

export const state = clone(initialState);

export function resetState() {
    const preserve: Partial<typeof state> = {}
    Object.assign(state, clone(initialState), preserve);
}