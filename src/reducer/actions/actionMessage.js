export const ACTION_MESSAGE = 'action-message';

export const getActionMessage = (message) => {
    return {
        type: ACTION_MESSAGE,
        message: message
    }
};

export const actionMessageReducer = (state, action) => {
    let messages = state.messages.slice();

    messages.push({
        message: action.message,
        date: new Date()
    });

    return Object.assign({}, state, {messages: messages});
}

