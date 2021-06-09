export const ACTION_TEST = 'action-test';

export const getActionTest = () => {
    return {
        type: ACTION_TEST
    }
};

export const actionTestReducer = (state, action) => {
    console.log('here is the stuff: ' + JSON.stringify(action));

    return state;
}

