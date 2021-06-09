import * as _ from 'underscore';
import {ACTION_TEST, actionTestReducer} from "./actions/actionTest";
import {ACTION_AFTER_LOGIN, actionAfterLoginReducer} from "./actions/actionAfterLogin";
import {ACTION_ERROR, actionErrorReducer} from "./actions/actionError";
import {ACTION_MESSAGE, actionMessageReducer} from "./actions/actionMessage";
import {ACTION_LOGOUT, actionLogoutReducer} from "./actions/actionLogout";
import {ACTION_STATE, actionStateReducer} from "./actions/actionState";
import {ACTION_AFTER_SEARCH_LIST, actionAfterSearchListReducer} from "./actions/actionAfterSearch";
import {ACTION_EDIT_LIST, actionEditListReducer} from "./actions/actionEditList";
import {ACTION_AFTER_SAVE_LIST, actionAfterSaveListReducer} from "./actions/actionAfterSaveList";
import {ACTION_REMOVE_LISTS, actionRemoveListsReducer} from "./actions/actionRemoveLists";
import {ACTION_AFTER_DELETE_LISTS, actionAfterDeleteListsReducer} from "./actions/actionAfterDeleteLists";
import {ACTION_VIEW_LIST, actionViewListReducer} from "./actions/actionViewList";
import {ACTION_RESET, actionResetReducer} from "./actions/actionReset";
import {ACTION_AFTER_TOGGLE, actionAfterToggleReducer} from "./actions/actionAfterToggle";
import {ACTION_LIST_FILTER, actionListFilterReducer} from "./actions/actionListFilter";
import {ACTION_AFTER_LIST_RESET, actionAfterListResetReducer} from "./actions/actionAfterListReset";
import {ACTION_ITEMS, actionItemsReducer} from "./actions/actionItems";
import {ACTION_EDIT_ITEM, actionEditItemReducer} from "./actions/actionEditItem";
import {ACTION_AFTER_SAVE_ITEM, actionAfterSaveItemReducer} from "./actions/actionAfterSaveItem";
import {ACTION_DELETE_ITEMS, actionDeleteItemsReducer} from "./actions/actionDeleteItems";
import {ACTION_AFTER_DELETE_ITEMS, actionAfterDeleteItemsReducer} from "./actions/actionAfterDeleteItems";
import {ACTION_AFTER_BULK_ADD, actionAfterBulkAddReducer} from "./actions/actionAfterBulkAdd";
import {ACTION_REMOVE_EXPIRED_MESSAGES, actionRemoveExpiredMessagesReducer} from "./actions/actionRemoveExpiredMessages";
import {ACTION_AFTER_SETTINGS, actionAfterSettingsReducer} from "./actions/actionAfterSettings";


let actionMaps = {};

actionMaps[ACTION_TEST] = actionTestReducer;
actionMaps[ACTION_AFTER_LOGIN] = actionAfterLoginReducer;
actionMaps[ACTION_ERROR] = actionErrorReducer;
actionMaps[ACTION_MESSAGE] = actionMessageReducer;
actionMaps[ACTION_LOGOUT] = actionLogoutReducer;
actionMaps[ACTION_STATE] = actionStateReducer;
actionMaps[ACTION_AFTER_SEARCH_LIST] = actionAfterSearchListReducer;
actionMaps[ACTION_EDIT_LIST] = actionEditListReducer;
actionMaps[ACTION_AFTER_SAVE_LIST] = actionAfterSaveListReducer;
actionMaps[ACTION_REMOVE_LISTS] = actionRemoveListsReducer;
actionMaps[ACTION_AFTER_DELETE_LISTS] = actionAfterDeleteListsReducer;
actionMaps[ACTION_VIEW_LIST] = actionViewListReducer;
actionMaps[ACTION_RESET] = actionResetReducer;
actionMaps[ACTION_AFTER_TOGGLE] = actionAfterToggleReducer;
actionMaps[ACTION_LIST_FILTER] = actionListFilterReducer;
actionMaps[ACTION_AFTER_LIST_RESET] = actionAfterListResetReducer;
actionMaps[ACTION_ITEMS] = actionItemsReducer;
actionMaps[ACTION_EDIT_ITEM] = actionEditItemReducer;
actionMaps[ACTION_AFTER_SAVE_ITEM] = actionAfterSaveItemReducer;
actionMaps[ACTION_DELETE_ITEMS] = actionDeleteItemsReducer;
actionMaps[ACTION_AFTER_DELETE_ITEMS] = actionAfterDeleteItemsReducer;
actionMaps[ACTION_AFTER_BULK_ADD] = actionAfterBulkAddReducer;
actionMaps[ACTION_REMOVE_EXPIRED_MESSAGES] = actionRemoveExpiredMessagesReducer;
actionMaps[ACTION_AFTER_SETTINGS] = actionAfterSettingsReducer;

let reducerFunction = (state, action) => {
    // get the action type
    let type = action.type;

    // with the action type, try to get a reducer
    let reducer = actionMaps[type];

    let res = state;
    if (_.isFunction(reducer)) {
        res = reducer(state, action);
    }

    return res;
}

export default reducerFunction;

