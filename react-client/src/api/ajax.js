/*
    Function module that can send asynchronous ajax requests
    Package axios library
    The return value of the function is a Promise object
*/

import axios from 'axios';
import {message} from 'antd';

export default function ajax(url, data={}, type='GET') {

    return new Promise((resolve, reject) => {
        let promise;
        // Execute asynchronous ajax requests
        if (type==='GET') {
            promise =  axios.get(url, {
                params: data
            });
        } else {
            promise =  axios.post(url, data);
        }
        promise.then(response => { // If succeeded, invoke resolve(value)
            resolve(response);
        }).catch(error => { // If failed, prompt exception messages instead of invoking reject(value)
            message.error('Request error: ' + error.message);
        });
    });

    
}

ajax('/login', {username: 'WenlongLu', password: '0604'}, 'POST').then();

// add user
ajax('/manage/user/add', {username: 'WenlongLu', password: '0604', notes: 'This is me' }, 'POST').then();


