import {state} from "./state.ts";
import {round,floor,ceil} from "./rounding.ts";
import { keys } from "remeda";

const roundingMethod = {
  'benefits defender': (attacker, defender) => {
    if (attacker > defender) {
      return defender !== 0 ? [floor(attacker / defender), 1] : [NaN, NaN];
    } else {
      return attacker !== 0 ? [1, ceil(defender / attacker)] : [NaN, NaN];
    }
  },
  'benefits attacker': (attacker, defender) => {
    if (attacker > defender) {
      return defender !== 0 ? [ceil(attacker / defender), 1] : [NaN, NaN];
    } else {
      return attacker !== 0 ? [1, floor(defender / attacker)] : [NaN, NaN];
    }
  },
  mathematical: (attacker, defender) => {
    if (attacker > defender) {
      return defender !== 0 ? [round(attacker / defender), 1] : [NaN, NaN];
    } else {
      return attacker !== 0 ? [1, round(defender / attacker)] : [NaN, NaN];
    }
  },
  'round down': (attacker, defender) => {
    if (attacker > defender) {
      return defender !== 0 ? [floor(attacker / defender), 1] : [NaN, NaN];
    } else {
      return attacker !== 0 ? [1, floor(defender / attacker)] : [NaN, NaN];
    }
  }
} as const satisfies Record<string, typeof combatRatio> ;

export const roundingMethods = keys(roundingMethod);
export type RoundingMethod = keyof typeof roundingMethod;

export function combatRatio(attacker: number, defender: number): [number, number] {
  const method = roundingMethod[state.rounding] ?? roundingMethod["benefits defender"];
  return method(attacker, defender);
}

