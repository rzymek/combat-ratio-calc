import {ReactNode} from "preact/compat";

export function Panel(props: { children: ReactNode, type: 'attacker' | 'defender' }) {
    const color = {
        attacker: '#f66',
        defender: '#66f'
    } as const;
    return <div style={{
        flex: 1,
        background: color[props.type],
        minHeight: '10mm',
    }}>
        {props.children}
    </div>
}