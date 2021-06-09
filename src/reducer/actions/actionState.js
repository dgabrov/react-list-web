export const ACTION_STATE = 'action-state';

export const getActionState = (state) => {
    return {
        type: ACTION_STATE,
        state: state
    }
};

export const actionStateReducer = (state, action) => {
    let newState = action.state;

    return Object.assign({}, state, {state: newState});
}

