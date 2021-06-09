const cache = {
    token: ''
};

export const setToken = (token) => {
    cache.token = token;
};

const getToken = () => {
    return cache.token;
}

export default getToken;
