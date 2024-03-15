let initialState ={
    count: 0,
    toggle: true,
}

export const reducers = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREASE_COUNT':
            return {
                ...state,
                count: state.count + 1
            };

        case 'DECREASE_COUNT':
            return {
                ...state,
                count: state.count - 1
            };

        case 'TOGGLE_MENU':
            return {
                ...state,
                toggle: !state.toggle
            };

        default:
            return state;
    }
}
