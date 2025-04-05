import './app.css'
import {map, pipe, range, sum} from "remeda";
import {Button} from "./ui/Button.tsx";
import {RoundedPanel} from "./ui/RoundedPanel.tsx";
import {Line, state} from "./state.ts";
import {update} from "./update.ts";

function add(v: number) {
    return update(() => {
        state[state.selected][state.selectedLine].values.push(v)
    })
}

export function App() {
    return <div style={{display: 'flex', gap: '1mm', flexDirection: 'column', margin: '1.6mm'}}>
        <div style={{display: 'flex', gap: '1mm'}}>
            {pipe(
                range(1, 10 + 1),
                map(v => {
                    return <Button key={v} onClick={add(v)}>{v}</Button>;
                })
            )}
        </div>
        <div style={{display: 'flex', gap: '1mm'}}>
            {pipe(
                range(11, 20 + 1),
                map(v => <Button key={v} onClick={add(v)}>{v}</Button>)
            )}
        </div>
        <Foo label='Attacker' values={state.attacker}/>
    </div>
}

function Foo(props: { label: string, values: Line[] }) {
    return <RoundedPanel label={props.label} style={{display: 'flex', flexDirection: 'column', gap: '1mm'}}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {props.values.map((line, index) =>
                <div key={index} style={{display: 'flex', gap: '1mm', flex: 1}}>
                    <Button style={{width: 'auto', minWidth: '10mm'}} onClick={update(()=>{
                        line.values.splice(0, line.values.length)
                    })}>{sum(line.values)} =</Button>
                    {line.values.map((v, index) =>
                        <Button key={index}>
                            {v}
                        </Button>)}
                </div>
            )}
            <div style={{display: 'flex', gap: '1mm'}}>
                <Button>½</Button>
            </div>
        </div>
        <div style={{display: 'flex', gap: '1mm', flex: 1}}>
            <Button style={{width: 'auto', minWidth: '10mm'}}>+</Button>
        </div>
    </RoundedPanel>
}
