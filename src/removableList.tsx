import {Button} from "./ui/Button.tsx";
import {update} from "./update.ts";

export function RemovableList(props: { values: number[] }) {
    return <div style={{
        display: 'flex',
        padding: '1mm',
        alignContent: "center",
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: "1mm",
        width: '100%',
    }}>
        <Button onClick={update(() => props.values.length = 0)}>X</Button>
        {props.values.map((v, index) =>
            <Button key={index} onClick={update(() => props.values.splice(index, 1))}>{v}</Button>
        )}
    </div>
}