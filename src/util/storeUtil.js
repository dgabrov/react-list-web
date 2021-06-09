export const findItemById = (state, id) => {
    let item = null;

    let arr = state.items.filter((item) => {return item.id === id});

    if (arr.length > 0) {
        item = arr[0];
    }

    return item;
}

export const findListById = (state, id) => {
    let list = null;

    let arr = state.lists.filter((list) => {
        return list.id === id;
    });

    if (arr.length > 0) {
        list = arr[0]; // anyway for an id there is one list and only one
    }

    return list;
}

/**
 *
 * @param ids - the values that are to be used as key in the resulting object. Must be an array
 * @param fn - the function returning the initialization object for the newly created item
 */
export const getObjectFromArray = (ids, fn) => {
    let obj = {};

    ids.forEach((id) => {
        obj[id] = fn();
    })

    return obj;
}

export const prepareDeleteList = (state, ids) => {
    let obj = getObjectFromArray(ids, () => {return {count: 0}});

    let lists = state.lists;
    let items = state.items;

    items.forEach((item) => {
        let listId = item.listId;

        if (obj.hasOwnProperty(listId)) {
            let val = obj[listId];
            val.count = val.count + 1;
        }
    });

    lists = lists.filter((list) => {
        return obj.hasOwnProperty(list.id);
    }).map((list) => {
        return {id: list.id, name: list.name, nrElements: obj[list.id].count};
    });

    return lists;

};

export const getItemsByListId = (state, id) => {
    let items = state.items.filter((item) => {
        return item.listId === id;
    });

    return items;
};