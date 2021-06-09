export const getEffectTest = () => {
    return (dispatch, getState) => {
        console.log("effect test happens here");

        let obj = getState();

        console.log('the current state: ' + JSON.stringify(obj));
    };
}
