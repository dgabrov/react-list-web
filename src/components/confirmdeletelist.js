import React from 'react';
import {connect} from 'react-redux';
import {getActionState} from "../reducer/actions/actionState";
import {STATE_LISTS} from "../store";
import {getEffectDeleteLists} from "../reducer/effects/effectDeleteLists";
import {prepareDeleteList} from "../util/storeUtil";

class ConfirmDeleteList extends React.Component {

    render = () => {

        let controls = this.props.items.map(
            (item) => {
                let key = "key_" + item.id;
                let nrElements = item.nrElements;
                let name = item.name;

                return (<li key={key}>{name} <span className={'red'}>({nrElements})</span></li>);
            }
        );

        return (
            <div>
                <h3>Confirm Delete List</h3>
                <div className="margin-top">Are you sure you want to <span className="red">delete</span> the following lists???</div>
                <ul>
                    {controls}
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
    };

    cancel = () => {
        this.props.cancel();
    };

}

// items: [
//     {id: "id1", name: "the first name", nrElements: 0},
//     {id: "id2", name: "second", nrElements: 23},
//     {id: "id3", name: "the third name", nrElements: 11},
//     {id: "id4", name: "the fourth and last", nrElements: 2},
// ]


let stateToProps = (state) => {

    let ids = state.deleteListId;
    let arr = prepareDeleteList(state, ids);

    return {
        items: arr
    };
};

let dispatch = (dispatch, getState) => {
    return {
        confirm: (ids) => {
            dispatch(getEffectDeleteLists(ids));
        },

        cancel: () => {
            dispatch(getActionState(STATE_LISTS));
        }
    }
}

export default connect(stateToProps, dispatch)(ConfirmDeleteList);
