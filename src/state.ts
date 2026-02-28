import {clone} from "remeda";
import type {RoundingMethod} from "./combatRatio.tsx";

const initialState = {
  attacker: [] as number[],
  defender: [] as number[],
  selected: 'attacker' as 'attacker' | 'defender',
  selectedLine: 0,
  rounding: 'benefits defender' as RoundingMethod,
};

export const state = clone(initialState);

export function resetState() {
  const preserve: Partial<typeof state> = {}
  Object.assign(state, clone(initialState), preserve);
}