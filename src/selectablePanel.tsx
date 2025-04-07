import {ReactNode} from "preact/compat";
import {update} from "./update.ts";
import {state} from "./state.ts";

export function SelectablePanel(props: { children: ReactNode, type: 'attacker' | 'defender' }) {
    const color = {
        attacker: '#f66',
        defender: '#66f'
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