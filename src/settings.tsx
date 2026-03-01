import {update} from "./update.ts";
import {state} from "./state.ts";
import {RoundingMethod, roundingMethods} from "./combatRatio.tsx";

export function Settings() {
  return <div style={{display: 'flex', gap: '4mm'}}>
    <label>
      Rounding: <select value={state.rounding} onChange={e => update(() =>
      state.rounding = e.currentTarget.value as RoundingMethod
    )()}>
      {roundingMethods.map(m => <option key={m}>{m}</option>)}
    </select>
    </label>
    <label>
      Unit: <select value={state.unit} onChange={e => update(() =>
      state.unit = Number(e.currentTarget.value)
    )()}>
      {[1, 0.5].map(m => <option key={m}>{m}</option>)}
    </select>
    </label>
  </div>
}