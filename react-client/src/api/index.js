/*
    Includes modules for all interface request functions in the application
    The return value of each function is a Promise
*/

import ajax from './ajax';

// login
// export function reqLogin(username, password) {
//     ajax('/login', {username, password}, 'POST');
// }
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST');

// add user
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST');