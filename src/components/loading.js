import * as React from 'react';
import {connect} from "react-redux";
import getEffectLoadSettings from "../reducer/effects/effectLoadSetings";


class Loading extends React.Component {

    componentDidMount = () => {
        this.props.triggerLoadSettings();
    }

    render = () => {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    };
}

const stateToProps = (store) => {
    return {};
}

const dispatch = (dispatch) => {
    return {
        triggerLoadSettings: () => {
            dispatch(getEffectLoadSettings());
        }
    };
}

export default connect(stateToProps, dispatch)(Loading);
