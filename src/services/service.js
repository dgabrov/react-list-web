import getToken from '../util/cache';
import constants from "../util/constants";


const processPromise = (p) => {
    return new Promise((resolve, reject) => {
        p.then((data) => {
            if (data.status && data.status === 200) {
                resolve(data.json());
            }
            else {
                data.json().then((err) => {
                    if (err && err.message) {
                        reject(err.message);
                    }
                    else {
                        reject('generic error ' + JSON.stringify(err));
                    }
                }).catch((err) => {
                    reject(err);
                });
            }
        }).catch((err) => {
            reject(err);
        });
    });
}

export class Service {

    constructor() {
        this.apiUrl = "";
    }

    setApiUrl = (url) => {
        this.apiUrl = url;
    }

    login = (login, password) => {
        let p = fetch(this.apiUrl + '/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({login, password})
        });

        return processPromise(p);
    }

    searchList = (search) => {
        let p = fetch(
            this.apiUrl + '/searchList',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : getToken()
                },
                body: JSON.stringify({search})
            });

        return processPromise(p);
    }

    addList = (id, name) => {
        let p = fetch(
            this.apiUrl + '/addList',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : getToken()
                },
                body: JSON.stringify({id, name})
            });

        return processPromise(p);
    }

    updateList = (id, name) => {
        let p = fetch(
            this.apiUrl + '/updateList',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : getToken()
                },
                body: JSON.stringify({id, name})
            });

        return processPromise(p);
    }

    deleteLists = (ids) => {
        let p = fetch(
            this.apiUrl + '/deleteLists',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : getToken()
                },
                body: JSON.stringify({ids})
            });

        return processPromise(p);
    }

    toggleCompleted = (id) => {
        let p = fetch(
            this.apiUrl + '/toggleCompleted',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : getToken()
                },
                body: JSON.stringify({id})
            });

        return processPromise(p);
    }

    resetList = (listId) => {
        let p = fetch(
            this.apiUrl + '/resetList',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : getToken()
                },
                body: JSON.stringify({id: listId})
            });

        return processPromise(p);
    }

    addItem = (id, listId, name) => {
        let p = fetch(
            this.apiUrl + '/addItem',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : getToken()
                },
                body: JSON.stringify({id, listId, name})
            });

        return processPromise(p);
    }

    updateItem = (id, name) => {
        let p = fetch(
            this.apiUrl + '/updateItem',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : getToken()
                },
                body: JSON.stringify({id, name})
            });

        return processPromise(p);
    }

    deleteItems = (ids) => {
        let p = fetch(
            this.apiUrl + '/deleteItems',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : getToken()
                },
                body: JSON.stringify({ids})
            });

        return processPromise(p);
    }

    bulkAdd = (listId, bulkData) => {
        let p = fetch(
            this.apiUrl + '/bulkAdd',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : getToken()
                },
                body: JSON.stringify({id: listId, bulkData})
            });

        return processPromise(p);
    }

    logout = () => {
        let p = fetch(
            this.apiUrl + '/logout',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : getToken()
                },
                body: JSON.stringify({logout: true})
            });

        return processPromise(p);
    }

    getSettings = () => {
        let p = fetch(
            window.location.href + "/" + constants.settingsUrl,
        ).then((body) => {return body.json(); });

        return p;
    }
}

const instance = new Service();

export default instance;

