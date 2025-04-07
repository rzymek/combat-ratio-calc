import {clone, isDeepEqual} from "remeda";
import {combatRatio} from "./combatRatio.tsx";

export function nextToChangeRatio(tuple: [number, number], whichOne: 0 | 1, byWhat: 1 | -1) {
    const modified = clone(tuple);
    const initialRatio = combatRatio(...tuple);
    if (!initialRatio.every(isFinite)) {
        return tuple[whichOne];
    }
    do {
        modified[whichOne] += byWhat;
    } while (modified.every(x => x > 0) && isDeepEqual(initialRatio, combatRatio(...modified)))
    return Math.abs(modified[whichOne] - tuple[whichOne]);
}