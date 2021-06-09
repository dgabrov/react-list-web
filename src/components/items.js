import React from 'react';
import {connect} from "react-redux";
import {findListById, getItemsByListId} from "../util/storeUtil";
import {getActionEditItem} from "../reducer/actions/actionEditItem";
import {getActionError} from "../reducer/actions/actionError";
import {getActionDeleteItems} from "../reducer/actions/actionDeleteItems";
import {getEffectBulkItemAdd} from "../reducer/effects/effectBulkItemAdd";

class Items extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: {},
            bulkValue: this.props.bulkValue
        }

        this.btnBulkAdd = null;
    }

    kd = (event) => {
        if (event.keyCode === 13 && event.ctrlKey) {
            this.btnBulkAdd.click();

            event.stopPropagation();
            event.preventDefault();
        }
    }

    allChecked = () => {
        // return "checked" if it is all checked all of them
        let len = this.props.items.length;

        let selected = this.state.selected;

        let selectedLen = this.props.items.filter((item) => {
            return selected.hasOwnProperty(item.id);
        }).length;

        return (len === selectedLen && len > 0) ? "checked" : "";
    }

    selectAll = () => {
        let keys = Object.keys(this.state.selected);

        let newSelected = {};

        if (keys.length !== this.props.items.length) {
            this.props.items.forEach((item) => {
                newSelected[item.id] = 'current';
            });
        }

        this.setState(Object.assign({}, this.state, {selected: newSelected}));
    }

    render = () => {

        let items = this.props.items.map((item) => {

            let currentId = item.id;

            return (
                <tr key={currentId}>
                    <td><input type="checkbox" checked={this.state.selected.hasOwnProperty(currentId)} onChange={() => {
                        this.toggle(currentId);
                    }}/></td>
                    <td>
                        <button className='button-link' onClick={() => {
                            this.edit(currentId);
                        }}>Edit
                        </button>
                    </td>
                    <td>{item.name}</td>
                </tr>
            );
        });

        return (<div>
            <h3>Items</h3>
            <div className="margin-top">List: {this.props.list.name}</div>

            <table className="margin-top layout full">
                <thead>
                <tr>
                    <th><input type="checkbox" onChange={this.selectAll} checked={this.allChecked()} /></th>
                    <th>Edit</th>
                    <th className="full">Item</th>
                </tr>
                </thead>
                <tbody>
                {items}
                </tbody>
            </table>

            <div className="margin-top">
                <button type="button" onClick={this.add}>Add</button>
                <button type="button" onClick={this.remove}>Remove</button>
            </div>

            <h4 className="margin-top">Bulk Add</h4>
            <textarea onKeyDown={this.kd} className="full" rows="20" onChange={this.changeBulk} value={this.state.bulkValue}></textarea>
            <button ref={(button) => this.btnBulkAdd = button} type="button" onClick={this.bulk}>Bulk Add</button>
        </div>);
    }

    bulk = () => {
        // get the value stored in the state for the bulk and then invoke the function passed as parameter
        let value = this.state.bulkValue;
        let listId = this.props.list.id;

        this.props.bulk(listId, value);

        // and now delete the value
        this.setState(Object.assign({}, this.state, {bulkValue: ''}));
    }

    add = () => {
        let listId = this.props.list.id;
        this.props.add(listId);
    }

    remove = () => {
        let selectedIds = Object.keys(this.state.selected);

        this.props.remove(selectedIds);
    }

    edit = (id) => {
        this.props.edit(id);
    }

    changeBulk = (event) => {
        let newValue = event.target.value;
        let stateModifier = {bulkValue: newValue};

        this.setState(Object.assign({}, this.state, stateModifier));

    }

    toggle = (id) => {
        let sel = this.state.selected;

        if (sel.hasOwnProperty(id)) {
            delete sel[id];
        } else {
            sel[id] = 'current';
        }

        sel = Object.assign({}, sel);

        this.setState(Object.assign({}, this.state, {selected: sel}));
    }

}


const stateToProps = (state) => {

    let listId = state.itemListId;

    let list = findListById(state, listId);
    let items = getItemsByListId(state, listId);
    let bulkValue = state.bulkInsert;

    return {
        bulkValue: bulkValue,
        list: {
            id: list.id,
            name: list.name
        },
        items: items
    };
}

const dispatch = (dispatch, getState) => {
    return {
        bulk: (listId, value) => {
            dispatch(getEffectBulkItemAdd(listId, value))
        },
        add: (listId) => {
            dispatch(getActionEditItem('', true, listId));
        },
        remove: (selectedIds) => {
            if (selectedIds.length === 0) {
                dispatch(getActionError("Please select at least one item to delete"));
            }
            else {
                dispatch(getActionDeleteItems(selectedIds));
            }
        },
        edit: (id) => {
            // the list id shall be figured out from the actual application store
            dispatch(getActionEditItem(id, false, ''));
        }
    };
}

export default connect(stateToProps, dispatch)(Items);
