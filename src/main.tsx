import {render} from 'preact'
import './index.css'
import {App} from "./app.tsx";

const app = document.getElementById('app');


export function rerender() {
    app && render(<App/>, app)
}

rerender();