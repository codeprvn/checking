
import { INCREASE_COUNT,DECREASE_COUNT, TOGGLE_MENU } from "./constants"

export const increaseCount = () => {
    return {
        type: INCREASE_COUNT,
    }
}

export const decreaseCount = () => {
    return {
        type: DECREASE_COUNT,
    }
}

export const toggleMenu = ()=>{
    return {
        type: TOGGLE_MENU
    }
}