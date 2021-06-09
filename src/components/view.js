import React from 'react';
import {connect} from 'react-redux';
import {findListById, getObjectFromArray} from "../util/storeUtil";
import {getActionState} from "../reducer/actions/actionState";
import {FILTER_ALL, FILTER_COMPLETED, FILTER_PENDING, STATE_LISTS} from "../store";
import {getActionReset} from "../reducer/actions/actionReset";
import {getEffectToggle} from "../reducer/effects/effectToggle";
import {getActionListFilter} from "../reducer/actions/actionListFilter";

class View extends React.Component {

    render = () => {

        let rows = this.props.items.map((item) => {

            let className = item.completed ? 'completed' : 'not-completed';
            let name = item.name;
            let id = item.id;

            return (
                <tr key={id} onClick={() => {
                    this.toggle(id)
                }}>
                    <td className={className}>
                        <div className="padded spaced">{name}</div>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <h3>List: {this.props.list.name}</h3>

                <div className="margin-bottom margin-top">
                    <div className="menu" onClick={this.completed}>Completed</div>
                    <div className="menu" onClick={this.pending}>Pending</div>
                    <div className="menu" onClick={this.all}>All</div>
                    <div className="clear"></div>
                </div>

                <table className="margin-top layout full">
                    <thead>
                    <tr>
                        <th className="full padded">Item</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>

                <div className="margin-top">
                    <button type="button" onClick={this.back}>Back</button>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <button type="button" onClick={this.reset}>Reset</button>
                </div>
            </div>
        );
    };

    toggle = (id) => {
        this.props.toggle(id);
    }

    all = () => {
        this.props.filter(FILTER_ALL);
    };

    completed = () => {
        this.props.filter(FILTER_COMPLETED);
    };

    pending = () => {
        this.props.filter(FILTER_PENDING);
    };

    back = () => {
        this.props.back();
    };

    reset = () => {
        let currentList = this.props.list;

        this.props.reset(currentList.id);
    }

}


let stateToProps = (state) => {

    let view = state.view;

    let listId = view.id;
    let itemIds = view.itemIds;

    let list = findListById(state, listId);

    let obj = getObjectFromArray(itemIds, () => {return "";});
    let items = state.items.filter((item) => {
        return obj.hasOwnProperty(item.id);
    });

    return {
        list: {
            id: list.id,
            name: list.name
        },
        items: items
    }

};

let dispatch = (dispatch) => {

    return {
        filter: (strFilter) => {
            dispatch(getActionListFilter(strFilter));
        },
        back: () => {
            dispatch(getActionState(STATE_LISTS));
        },
        toggle: (id) => {
            dispatch(getEffectToggle(id));
        },
        reset: (id) => {
            dispatch(getActionReset(id));
        }
    };
};

export default connect(stateToProps, dispatch)(View);
