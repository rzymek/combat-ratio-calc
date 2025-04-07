export function Num(props: { children: number }) {
    const x = props.children;
    return <>{isFinite(x) ? x : <>&nbsp;</>}</>;
}