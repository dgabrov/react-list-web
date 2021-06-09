export const ACTION_AFTER_TOGGLE = 'action-after-toggle';

export const getActionAfterToggle = (id, completed) => {
    return {
        type: ACTION_AFTER_TOGGLE,
        id: id,
        completed: completed
    }
};

export const actionAfterToggleReducer = (state, action) => {
    let id = action.id;
    let completed = action.completed;

    let items = state.items.map((item) => {
        let res = item;

        if (item.id === id) {
            res = Object.assign({}, item, {completed: completed});
        }

        return res;
    });

    let view = Object.assign({}, state.view);
    view.itemIds = state.view.itemIds.slice();

    return Object.assign({}, state, {items: items}, {view: view});
}

