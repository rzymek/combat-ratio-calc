import './app.css'
import {map, pipe, range, sum} from "remeda";
import {Button} from "./ui/Button.tsx";
import {state} from "./state.ts";
import {update} from "./update.ts";
import {combatRatio} from "./combatRatio.tsx";
import {nextToChangeRatio} from "./nextToChangeRatio.tsx";
import {Num} from "./num.tsx";
import {Proportion} from "./proportion.tsx";
import {Panel} from "./panel.tsx";
import {RemovableList} from "./removableList.tsx";

export function App() {
  const attacker = sum(state.attacker);
  const defender = sum(state.defender);
  const [attackerRatio, defenderRatio] = combatRatio(attacker, defender);
  const attacker1 = nextToChangeRatio([attacker, defender], 0, -1)
  const attacker2 = nextToChangeRatio([attacker, defender], 0, +1)
  const defender1 = nextToChangeRatio([attacker, defender], 1, -1)
  const defender2 = nextToChangeRatio([attacker, defender], 1, +1)
  return <div style={{display: 'flex', gap: '1mm', flexDirection: 'column', margin: '1.6mm', maxWidth: '100%'}}>
    <Proportion>
      <Num>{attackerRatio}</Num>
      <Num>{defenderRatio}</Num>
    </Proportion>
    <Proportion>
      <div style={{fontSize: '1cm'}}>
        <div style={{fontSize: '50%'}}>-<Num>{attacker1}</Num></div>
        <div>{attacker}</div>
        <div style={{fontSize: '50%'}}>+<Num>{attacker2}</Num></div>
      </div>
      <div style={{fontSize: '1cm'}}>
        <div style={{fontSize: '50%'}}>-<Num>{defender1}</Num></div>
        <div>{defender}</div>
        <div style={{fontSize: '50%'}}>+<Num>{defender2}</Num></div>
      </div>
    </Proportion>
    <div style={{
      display: 'flex',
      gap: '1mm',
      flexDirection: 'row',
    }}>
      <Keypad count={10} add={(v) => state.attacker.push(v)}/>
      <Keypad count={10} add={(v) => state.defender.push(v)}/>
    </div>

    <div style={{
      display: 'flex',
      gap: '1mm',
      flexDirection: 'row',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'stretch',
    }}>
      <Panel type='attacker'>
        <RemovableList values={state.attacker}/>
      </Panel>
      <Panel type='defender'>
        <RemovableList values={state.defender}/>
      </Panel>
    </div>
  </div>
}

function Keypad(props: { count: number, add: (v: number) => void }) {
  return <div style={{
    display: 'flex',
    flex: 1,
    gap: '1mm',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden'
  }}>{pipe(
    range(1, props.count + 1),
    map(v => {
      return <Button key={v} onClick={update(() => props.add(v))}>{v}</Button>;
    })
  )}</div>
}