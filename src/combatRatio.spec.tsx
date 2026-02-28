import {describe, expect, it} from "vitest";
import {state} from "./state.ts";
import {combatRatio} from "./combatRatio.tsx";

describe('combatRatio', () => {
  it('mathematical', () => {
    state.unit = 1;
    state.rounding = 'mathematical';
    expect(combatRatio(5, 3)).toEqual([2, 1])
  })
  it('benefits defender', () => {
    state.unit = 1;
    state.rounding = 'benefits defender';
    expect(combatRatio(5, 3)).toEqual([1, 1])
  })
  it('benefits attacker', () => {
    state.unit = 1;
    state.rounding = 'benefits attacker';
    expect(combatRatio(5, 3)).toEqual([2, 1])
  })
  it('0.5', () => {
    state.unit = 0.5;
    state.rounding = 'mathematical';
    expect(combatRatio(5, 3)).toEqual([1.5, 1])
  })
});