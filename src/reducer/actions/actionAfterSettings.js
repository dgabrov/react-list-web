/*
import {STATE_VIEW} from "../../store";
import {getItemsByListId} from "../../util/storeUtil";

export const ACTION_VIEW_LIST = 'action-view-list';

export const getActionViewList = (id) => {
    return {
        type: ACTION_VIEW_LIST,
        id: id
    }
};

export const actionViewListReducer = (state, action) => {
    let id = action.id;

    let ids = getItemsByListId(state, id).map((item) => {
        return item.id;
    });

    return Object.assign(
        {}, state,
        {view: {id: id, itemIds: ids}},
        {state: STATE_VIEW})
}


 */

export const ACTION_AFTER_SETTINGS = 'action-after-settings';

export const getActionAfterSettings = (settings) => {
    return {
        type: ACTION_AFTER_SETTINGS,
        settings: settings
    }
}

export const actionAfterSettingsReducer = (state, action) => {
    let settings = action.settings;

    return Object.assign({}, state, {settingsLoaded: true}, {settings: settings});

}