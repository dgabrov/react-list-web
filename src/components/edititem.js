import React from 'react';
import {connect} from 'react-redux';
import {getActionState} from "../reducer/actions/actionState";
import {STATE_ITEMS} from "../store";
import {findItemById, findListById} from "../util/storeUtil";
import {getEffectSaveItem} from "../reducer/effects/effectSaveItem";

class EditItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.item.name
        }

        this.editName = null;
        this.btnSave = null;
        this.btnCancel = null;
    }

    componentDidMount = () => {
        this.editName.focus();
        this.editName.select();
    }

    keyDown = (event) => {
        let bt = null;

        if (event.keyCode === 13) {
            bt = this.btnSave;
        }
        else if(event.keyCode === 27){
            bt = this.btnCancel;
        }

        if(bt && bt.click){
            bt.click();

            event.stopPropagation();
            event.preventDefault();
        }
    }

    render(){
        let addMessage = this.props.adding ? "Add" : "Edit";

        return (
            <div>
                <h3>{addMessage} Item</h3>
                <div className="margin-top">List: {this.props.list.name}</div>
                <div className="margin-top">Item: <input type="text" onKeyDown={this.keyDown} ref={(item) => this.editName = item} value={this.state.name} onChange={this.nameChange}/></div>

                <div className="margin-top">
                    <button type="button" ref={(button) => this.btnSave = button} onClick={this.save}>Save</button>
                    <button type="button" ref={(button) => this.btnCancel = button} onClick={this.cancel}>Cancel</button>
                </div>
            </div>
        );
    }

    nameChange = (event) => {
        let currentValue = event.target.value;

        this.setState(Object.assign({}, this.state, {name: currentValue}));
    }

    save = () => {
        let pr = this.props;
        this.props.save(pr.adding, pr.list.id, pr.item.id, this.state.name);
    }

    cancel = () => {
        this.props.cancel();
    }
}

let stateToProps = (state) => {
    let editItem = state.editItem;

    let adding = editItem.adding;
    let id = editItem.id;
    let listId = editItem.listId;
    let name = '';

    // if adding, list id is provided, if not adding, list id must be figured out
    if(! adding){
        let item = findItemById(state, id);

        if (item != null) {
            name = item.name;
            listId = item.listId;
        }
    }

    let list = findListById(state, listId);

    return {
        adding: adding,
        list: {
            id: listId,
            name: list.name
        },
        item: {
            id: id,
            name: name
        }
    }
};

let dispatch = (dispatch) => {
    return {
        save: (adding, listId, itemId, name) => {
            dispatch(getEffectSaveItem(adding, itemId, listId, name));
        },
        cancel: () => {
            dispatch(getActionState(STATE_ITEMS));
        }
    }
};

export default connect(stateToProps, dispatch)(EditItem);


