export const ACTION_REMOVE_EXPIRED_MESSAGES = 'action-remove-expired-messages';

export const getActionRemoveExpiredMessages = () => {
    return {
        type: ACTION_REMOVE_EXPIRED_MESSAGES
    }
};

export const actionRemoveExpiredMessagesReducer = (state, action) => {
    let date = new Date();

    let messages = state.messages.filter((msg) => {
        let res = false;

        if (msg.date && (date - msg.date) < state.settings.removeMessageAfterMs) {
            res = true;
        }

        return res;
    });

    let errors = state.errors.filter((err) => {
        let res = false;

        if (err.date && (date - err.date) < state.settings.removeMessageAfterMs) {
            res = true;
        }

        return res;
    });

    return Object.assign({}, state, {errors}, {messages});
}

