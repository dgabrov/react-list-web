import React from 'react';
import {connect} from 'react-redux';
import {findListById, getObjectFromArray} from "../util/storeUtil";
import {getActionState} from "../reducer/actions/actionState";
import {STATE_ITEMS} from "../store";
import {getEffectDeleteItems} from "../reducer/effects/effectDeleteItems";

class ConfirmDeleteItem extends React.Component {


    render = () => {
        let components = this.props.items.map(
            (item) => {
                return <li key={item.id}>{item.name}</li>
            }
        );

        return (
            <div>
                <h3>Confirm Delete Items</h3>
                <div className="margin-top">
                    Are you sure you want to <span className="red">delete</span> the following items
                    from the list <span className="bold">{this.props.list.name}</span>???
                </div>
                <ul>
                    {components}
                </ul>

                <div className="margin-top">
                    <button type="button" onClick={this.confirm}>Delete</button>
                    <button type="button" onClick={this.cancel}>Cancel</button>
                </div>
            </div>
        );
    }

    confirm = () => {
        let ids = this.props.items.map((item) => item.id);

        this.props.confirm(ids);
    }

    cancel = () => {
        this.props.cancel();
    }
}

let stateToProps = (state) => {
    let deleteItemId = state.deleteItemId; // the array of ids taken into account

    // build the object with ids as keys
    let obj = getObjectFromArray(deleteItemId, () => {
        return "";
    });

    let items = state.items.filter((item) => {
        let id = item.id;

        return obj.hasOwnProperty(id);
    });

    let listId = items[0].listId;
    let list = findListById(state, listId);

    return {
        list: {
            id: listId,
            name: list.name
        },
        items: items
    };
};

let dispatch = (dispatch) => {
    return {
        cancel: () => {
            dispatch(getActionState(STATE_ITEMS));
        },
        confirm: (ids) => {
            dispatch(getEffectDeleteItems(ids));
        }
    };
};

export default connect(stateToProps, dispatch)(ConfirmDeleteItem);
