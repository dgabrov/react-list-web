import React from 'react';
import {connect} from 'react-redux';
import {getActionState} from "../reducer/actions/actionState";
import {STATE_VIEW} from "../store";
import {findListById} from "../util/storeUtil";
import {getEffectReset} from "../reducer/effects/effectReset";

class ConfirmResetList extends React.Component {

    render = () => {
        return (
            <div>
                <h3>Confirm Reset List</h3>
                <div className="margin-top">
                    Are you sure you want to <span className="red">RESET</span> the list <span className="bold">{this.props.name}</span>???
                </div>
                
                <div className="margin-top">
                    <button type="button" onClick={this.reset}>Reset</button>
                    <button type="button" onClick={this.cancel}>Cancel</button>
                </div>
            </div>
        );
    }

    reset = () => {
        this.props.reset(this.props.id);
    }

    cancel = () => {
        this.props.cancel();
    }
}

let stateToProps = (state) => {
    let listId = state.resetListId;
    let list = findListById(state, listId);

    return {
        id: listId,
        name: list.name
    }
};

let dispatch = (dispatch) => {
    return {
        reset: (id) => {
            dispatch(getEffectReset(id));
        },
        cancel: () => {
            dispatch(getActionState(STATE_VIEW));
        }
    }
}

export default connect(stateToProps, dispatch)(ConfirmResetList);
