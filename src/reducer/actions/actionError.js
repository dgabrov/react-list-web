export const ACTION_ERROR = 'action-error';

export const getActionError = (message) => {
    return {
        type: ACTION_ERROR,
        error: message
    }
};

export const actionErrorReducer = (state, action) => {
    let errors = state.errors.slice();

    errors.push({
        message: action.error,
        date: new Date()
    });

    return Object.assign({}, state, {errors: errors});
}

