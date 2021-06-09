export const STATE_LOGIN = "login"
export const STATE_CD_ITEM = "cd_item";
export const STATE_CD_LIST = "cd_list";
export const STATE_RS_LIST = "rs_list";
export const STATE_EDIT_ITEM = "edit_item";
export const STATE_EDIT_LIST = "edit_list";
export const STATE_LISTS = "lists";
export const STATE_VIEW = "view";
export const STATE_ITEMS = "items";

export const FILTER_ALL = 'filter-all';
export const FILTER_COMPLETED = 'filter-completed';
export const FILTER_PENDING = 'filter-pending';

const initialStore = {
    settingsLoaded: false,
    settings: {
        apiUrl: "",
        checkMessageEveryMs: 3000,
        removeMessageAfterMs: 1000
    },
    state: STATE_LOGIN,
    lists: [], // array of types {id, name}
    items: [], // array of types {id, listId, name, completed}
    messages: [], // items of structure {message, date}
    errors: [], // items of structure {message, date}
    user: {
        login: '',
        fullName: '',
        token: ''
    },
    editItem: {
        adding: false,
        id: '',
        listId: ''
    },
    editList: {
        adding: false,
        id: ''
    },
    resetListId: '', // the id of the list that is about to be reset
    deleteListId: [],
    deleteItemId: [],
    view: {
        id: '',
        itemIds: []
    },
    itemListId: '',
    bulkInsert: ''
};


export default initialStore;
