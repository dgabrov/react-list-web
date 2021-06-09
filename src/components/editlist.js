import React from 'react';
import {connect} from "react-redux";
import {findListById} from "../util/storeUtil";
import {getActionState} from "../reducer/actions/actionState";
import {STATE_LISTS} from "../store";
import {getEffectSaveList} from "../reducer/effects/effectSaveList";

class EditList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: props.name
        }

        this.btnSave = null;
        this.btnCancel = null;
        this.editName = null;
    }

    componentDidMount = () => {
        this.editName.focus();
        this.editName.select();
    }

    kd = (event) => {
        let kc = event.keyCode;
        let bt = null;

        if (kc === 13) {
            bt = this.btnSave;
        }
        else if(kc === 27){
            bt = this.btnCancel;
        }

        if(bt && bt.click){
            bt.click();

            event.stopPropagation();
            event.preventDefault();
        }
    }

    render() {

        let addingMessage = this.props.adding ? "Add" : "Edit";

        return (
            <div>
                <h3>{addingMessage} List</h3>
                <div className="margin-top">
                    List:
                    <input type="text"
                           ref={(edt) => this.editName = edt}
                           onChange={this.nameChange}
                           onKeyDown={this.kd}
                           value={this.state.name}/>
                </div>
                <div className="margin-top">
                    <button type="button" ref={(button) => this.btnSave = button} onClick={this.save}>Save</button>
                    <button type="button" ref={(button) => this.btnCancel = button} onClick={this.cancel}>Cancel</button>
                </div>
            </div>
        );
    }

    nameChange = (event) => {
        let newName = event.target.value;

        this.setState(Object.assign({}, this.state, {name: newName}));
    };

    save = () => {
        this.props.save(this.props.adding, this.props.id, this.state.name);
    };

    cancel = () => {
        this.props.cancel();
    };


}

let stateToProps = (state) => {
    let edit = state.editList;

    let id = edit.id;
    let adding = edit.adding;

    let name = '';

    if (!adding) {
        let list = findListById(state, id);
        name = list.name;
    }

    return {
        id: id,
        name: name,
        adding: adding
    };
}

let dispatch = (dispatch, getState) => {
    return {
        save: (adding, id, name) => {
            dispatch(getEffectSaveList(adding, id, name));
        },
        cancel: () => {
            dispatch(getActionState(STATE_LISTS));
        }
    };
}

export default connect(stateToProps, dispatch)(EditList);
