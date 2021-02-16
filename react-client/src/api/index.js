/*
    Includes modules for all interface request functions in the application
    The return value of each function is a Promise
*/

import ajax from './ajax';

const BASE = '';

// login
// export function reqLogin(username, password) {
//     ajax('/login', {username, password}, 'POST');
// }
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST');

// add user
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST');