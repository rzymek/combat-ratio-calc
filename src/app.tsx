import './app.css'
import {clone, isDeepEqual, map, pipe, range, sum} from "remeda";
import {Button} from "./ui/Button.tsx";
import {state} from "./state.ts";
import {update} from "./update.ts";
import {ReactNode} from "preact/compat";
import {combatRatio} from "./combatRatio.tsx";

function add(v: number) {
    return update(() => {
        state[state.selected].push(v)
    })
}

function nextToChangeRatio(tuple: [number, number], whichOne: 0 | 1, byWhat: 1 | -1) {
    const modified = clone(tuple);
    const initial = combatRatio(...tuple);
    if (!initial.every(isFinite)) {
        return tuple[whichOne];
    }
    do {
        modified[whichOne] += byWhat;
    } while (modified.every(x => x > 0) && isDeepEqual(initial, combatRatio(...modified)))
    return modified[whichOne] - initial[whichOne];
}

function Num(props: { children: number }) {
    const x = props.children;
    return <>{isFinite(x) ? x : <>&nbsp;</>}</>;
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
        <div style={{display: 'flex', gap: '1mm', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
            {pipe(
                range(1, 18 + 1),
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
                <div style={{fontSize: '50%'}}><Num>{attacker1}</Num></div>
                <div>{attacker}</div>
                <div style={{fontSize: '50%'}}><Num>{attacker2}</Num></div>
            </div>
            <div style={{fontSize: '1cm'}}>
                <div style={{fontSize: '50%'}}><Num>{defender1}</Num></div>
                <div>{defender}</div>
                <div style={{fontSize: '50%'}}><Num>{defender2}</Num></div>
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

function Proportion(props: { children: [ReactNode, ReactNode] }) {
    return <div style={{display: 'flex', gap: '1mm', flexDirection: 'row', fontSize: '2cm', textAlign: 'center'}}>
        <SelectablePanel type='attacker'>
            {props.children[0]}
        </SelectablePanel>
        <div style={{textAlign: 'center'}}>
            :
        </div>
        <SelectablePanel type='defender'>
            {props.children[1]}
        </SelectablePanel>
    </div>

}

function SelectablePanel(props: { children: ReactNode, type: 'attacker' | 'defender' }) {
    const color = {
        attacker: '#f88',
        defender: '#88f'
    } as const;
    return <div onClick={update(() => state.selected = props.type)} style={{
        flex: 1,
        background: color[props.type],
        borderStyle: 'solid',
        borderWidth: 5,
        borderColor: state.selected === props.type ? 'blue' : 'transparent',
        minHeight: '10mm',
    }}>
        {props.children}
    </div>
}

function RemovableList(props: { values: number[] }) {
    return <div style={{
        display: 'flex',
        padding: '1mm',
        alignContent: "center",
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: "1mm",
        width: '100%',
    }}>
        {props.values.map((v, index) =>
            <Button key={index} onClick={update(() => props.values.splice(index, 1))}>{v}</Button>
        )}
    </div>
}

// function Foo(props: { label: string, values: Line[] }) {
//     return <RoundedPanel label={props.label} style={{display: 'flex', flexDirection: 'column', gap: '1mm'}}>
//         <div style={{display: 'flex', flexDirection: 'row'}}>
//             {props.values.map((line, index) =>
//                 <div key={index} style={{display: 'flex', gap: '1mm', flex: 1}}>
//                     <Button style={{width: 'auto', minWidth: '10mm'}} onClick={update(() => {
//                         line.values.splice(0, line.values.length)
//                     })}>{sum(line.values)} =</Button>
//                     {line.values.map((v, index) =>
//                         <Button key={index}>
//                             {v}
//                         </Button>)}
//                 </div>
//             )}
//             <div style={{display: 'flex', gap: '1mm'}}>
//                 <Button>½</Button>
//             </div>
//         </div>
//         <div style={{display: 'flex', gap: '1mm', flex: 1}}>
//             <Button style={{width: 'auto', minWidth: '10mm'}}>+</Button>
//         </div>
//     </RoundedPanel>
// }
