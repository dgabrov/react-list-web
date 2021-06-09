import service from '../../services/service';
import {getActionAfterSettings} from "../actions/actionAfterSettings";

const getEffectLoadSettings = () => {
    return (dispatch, getState) => {
        service.getSettings()
            .then((res) => {
                // post ajax request and attempt to retrieve the settings json file in the public folder
                let apiUrl = res.apiUrl;
                let checkMessageEveryMs = res.checkMessageEveryMs;
                let removeMessageAfterMs = res.removeMessageAfterMs;

                // assemble settings, get the service and populate the api url
                let settings = {apiUrl, checkMessageEveryMs, removeMessageAfterMs};

                service.setApiUrl(apiUrl);

                // dispatch the action
                dispatch(getActionAfterSettings(settings));
            })
            .catch((err) => {
                console.log('error encountered: ' + err);
            });

        // then trigger afterSettingsAction that will setup the values in the
    };
};

export default getEffectLoadSettings;
