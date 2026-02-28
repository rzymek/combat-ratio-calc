import {ReactNode} from "preact/compat";
import {Panel} from "./panel.tsx";

export function Proportion(props: { children: [ReactNode, ReactNode] }) {
    return <div style={{display: 'flex', gap: '1mm', flexDirection: 'row', fontSize: '2cm', textAlign: 'center'}}>
        <Panel type='attacker'>
            {props.children[0]}
        </Panel>
        <div style={{textAlign: 'center'}}>
            :
        </div>
        <Panel type='defender'>
            {props.children[1]}
        </Panel>
    </div>

}