import {state} from "./state.ts";

export function floor(value: number): number {
  return Math.floor(value / state.unit) * state.unit;
}

export function ceil(value: number): number {
  return Math.ceil(value / state.unit) * state.unit;
}

export function round(value: number): number {
  return Math.round(value / state.unit) * state.unit;
}