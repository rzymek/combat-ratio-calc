import {DSL, extractFirst} from 'react-dsl-editor'
import {
  alternative,
  anyOrder,
  DslEditor,
  named,
  newline,
  NodeTypes,
  pattern,
  sequence,
  term,
  ws
} from 'react-dsl-editor'
import useLocalStorage from "use-local-storage-state"
import dedent from "dedent";
import {useCallback} from "preact/hooks";
import {update} from "./update.ts";
import { state } from "./state.ts";
import {RoundingMethod} from "./combatRatio.tsx";

const decimal = pattern(/[0-9]+([.,][0-9]+)?/);
const settingsDsl = anyOrder(
  sequence(term('unit:'), ws, named('unit', decimal), newline),
  sequence(term('rounding:'), ws, named('rounding', alternative(
    term('benefits attacker'),
    term('benefits defender'),
    term('mathematical'),
  )), newline),
)

export function Settings() {
  const [code, setCode] = useLocalStorage('combat-calc-settings', {
    defaultValue: dedent`
      rounding: benefits defender
      unit: 1      
    `
  })
  const onParsed = useCallback((dsl: DSL<NodeTypes<typeof settingsDsl>>) => {
    setTimeout(update(()=>{
      state.rounding = extractFirst(dsl.result, 'rounding') as RoundingMethod;
    }),0);
  }, []);
  return <DslEditor
    style={{
      minHeight: '3cm',
      width: '100%', lineHeight: '1.3em', fontFamily: 'monospace', fontSize: 13
    }}
    onParsed={onParsed}
    grammar={settingsDsl}
    code={code} onChange={setCode}
  />;
}