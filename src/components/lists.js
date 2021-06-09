import React from "react";
import {connect} from "react-redux";
import * as _ from "underscore";
import {getEffectListSearch} from "../reducer/effects/effectListSearch";
import {getActionEditList} from "../reducer/actions/actionEditList";
import {getActionRemoveLists} from "../reducer/actions/actionRemoveLists";
import {getActionError} from "../reducer/actions/actionError";
import {getActionViewList} from "../reducer/actions/actionViewList";
import {getActionItems} from "../reducer/actions/actionItems";

class Lists extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: {},
            search: ''
        };

        this.btnSearch = null;
        this.editSearch = null;
    }

    componentDidMount = () => {
        this.editSearch.select();
        this.editSearch.focus();
    }

    kd = (event) => {
        if(event.keyCode === 13){
            this.btnSearch.click();

            event.stopPropagation();
            event.preventDefault();
        }
    }

    hasItems = () => {
        return _.isArray(this.props.lists) && this.props.lists.length > 0;
    };

    updateSearch = (value) => {
        this.setState(
            Object.assign({}, this.state, {search: value})
        );
    };

    toggle = (id) => {

        let sel = this.state.selected;

        if (sel.hasOwnProperty(id)) {
            delete sel[id];
        }
        else {
            sel[id] = "current";
        }

        sel = Object.assign({}, sel);

        this.setState(Object.assign({}, this.state, {selected: sel}));

    };

    getControls = () => {
        let controls = [];

        if (this.hasItems()) {
            controls = this.props.lists.map((list) => {
                let currentId = list.id;

                return (
                    <tr key={currentId}>
                        <td><input type="checkbox" checked={this.state.selected.hasOwnProperty(currentId)}
                                   onChange={() => {
                                       this.toggle(currentId);
                                   }}/></td>
                        <td>
                            <button className="button-link" onClick={(event) => {
                                this.edit(currentId);
                            }}>Edit
                            </button>
                        </td>
                        <td>
                            <button className="button-link" onClick={(event) => {
                                this.view(currentId);
                            }}>View
                            </button>
                        </td>
                        <td>
                            <button className="button-link" onClick={(event) => {
                                this.items(currentId);
                            }}>Items
                            </button>
                        </td>
                        <td>
                            <div className="padded">{list.name}</div>
                        </td>
                    </tr>
                );
            });
        }
        else {
            controls.push(
                <tr key={'info'}>
                    <td colSpan="5" className="italic">No items...</td>
                </tr>
            );
        }

        return controls;
    };

    render = () => {
        let current = this;
        let controls = this.getControls();

        return (<div>
                <h3>Lists</h3>
                <div className="margin-top">
                    Search:
                    <input type="text"
                           value={this.state.search}
                           ref={
                               (edit) => {
                                   this.editSearch = edit;
                               }
                           }
                           onKeyDown={this.kd}
                           onChange={(event) => {
                               this.updateSearch(event.target.value);
                           }}
                    />

                    <button type="button"
                            ref={(btn1) => {
                                current.btnSearch = btn1;
                            }}
                            onClick={() => this.props.search(this.state.search)}>
                        Search
                    </button>
                </div>
                <table className="layout margin-top full">
                    <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>Edit</th>
                        <th>View</th>
                        <th>Items</th>
                        <th className="full">
                            <div className="padded">List</div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {controls}
                    </tbody>
                </table>
                <div className="margin-top">
                    <button type="button" onClick={() => {
                        this.props.add();
                    }}>Add
                    </button>
                    <button type="button" onClick={this.remove}>Remove</button>
                </div>

            </div>
        )

    };

    remove = () => {
        let ids = Object.keys(this.state.selected);

        this.props.remove(ids);
    };

    search = (event) => {
        let strValue = event.target.value;

        this.props.search(strValue);
    };

    edit = (listId) => {
        this.props.edit(listId);
    };

    view = (list) => {
        this.props.view(list);
    };

    items = (list) => {
        this.props.items(list);
    };
}

//  this is the current structure of the props
//  {
//     lists: [
//         {id: 11, name: "list number 1"},
//         {id: 21, name: "another list item here"}
//     ]
// };


let stateToProps = (state) => {
    return {
        lists: state.lists
    };
};

let dispatcher = (dispatch) => {
    return {
        search: (strValue) => {
            dispatch(getEffectListSearch(strValue));
        },
        edit: (id) => {
            dispatch(getActionEditList(id, false));
        },
        view: (id) => {
            dispatch(getActionViewList(id));
        },
        items: (listId) => {
            dispatch(getActionItems(listId));
        },
        add: () => {
            dispatch(getActionEditList('', true)); // the id will be generated later
        },
        remove: (ids) => {
            if (ids.length > 0) {
                dispatch(getActionRemoveLists(ids));
            }
            else {
                dispatch(getActionError("Plesae select at least one list to delete"));
            }
        }

    };
};

export default connect(stateToProps, dispatcher)(Lists);
