import './app.css'
import {map, pipe, range, sum, filter} from "remeda";
import {Button} from "./ui/Button.tsx";
import {state} from "./state.ts";
import {update} from "./update.ts";
import {combatRatio} from "./combatRatio.tsx";
import {nextToChangeRatio} from "./nextToChangeRatio.tsx";
import {Num} from "./num.tsx";
import {Proportion} from "./proportion.tsx";
import {SelectablePanel} from "./selectablePanel.tsx";
import {RemovableList} from "./removableList.tsx";

const startFrom = 1;

function add(v: number) {
    return update(() => {
        state[state.selected].push(v)
    })
}

export function App() {
    const attacker = sum(state.attacker);
    const defender = sum(state.defender);
    const [attackerRatio, defenderRatio] = combatRatio(attacker, defender);
    const attacker1 = nextToChangeRatio([attacker, defender], 0, -1)
    const attacker2 = nextToChangeRatio([attacker, defender], 0, +1)
    const defender1 = nextToChangeRatio([attacker, defender], 1, -1)
    const defender2 = nextToChangeRatio([attacker, defender], 1, +1)
    return <div style={{display: 'flex', gap: '1mm', flexDirection: 'column', margin: '1.6mm', maxWidth: '100%'}}>
        <div style={{display: 'flex', gap: '1mm', flexWrap: 'wrap', justifyContent: 'flex-start', maxHeight: '21mm', overflow:'hidden'}}>
            {pipe(
                range(startFrom, 30 + 1),
                filter(v => v !== 0),
                map(v => {
                    return <Button key={v} onClick={add(v)}>{v}</Button>;
                })
            )}
        </div>
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
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'stretch',
        }}>
            <SelectablePanel type='attacker'>
                <RemovableList values={state.attacker}/>
            </SelectablePanel>
            <SelectablePanel type='defender'>
                <RemovableList values={state.defender}/>
            </SelectablePanel>
        </div>
    </div>
}
