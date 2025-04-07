import {ReactNode} from "preact/compat";
import {SelectablePanel} from "./selectablePanel.tsx";

export function Proportion(props: { children: [ReactNode, ReactNode] }) {
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