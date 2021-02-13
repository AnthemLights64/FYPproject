/*
    Function module that can send asynchronous ajax requests
    Package axios library
    The return value of the function is a Promise object
*/

import axios from 'axios';

export default function ajax(url, data={}, type='GET') {
    if (type==='GET') {
        return axios.get(url, {
            params: data
        });
    } else {
        return axios.post(url, data);
    }
}

ajax('/login', {username: 'WenlongLu', password: '0604'}, 'POST').then();

// add user
ajax('/manage/user/add', {username: 'WenlongLu', password: '0604', phone: '0871086286' }).then();


