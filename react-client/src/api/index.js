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

// Add or Update user
export const reqAddOrUpdateUser = (user) => ajax(BASE + '/management/user/' + (user._id ? 'update' : 'add'), user, 'POST');

// Get members paging list
export const reqMembers = (pageNum, pageSize) => ajax(BASE + '/management/member/list', {pageNum, pageSize});

// Search members paging list
export const reqSearchMembers = ({pageNum, pageSize, searchName, searchType}) => ajax(BASE + '/management/member/search', {
    pageNum,
    pageSize,
    searchName,
    searchType
});

// Delete the specified image
export const reqDeleteImg = (name) => ajax(BASE + '/management/member/image/delete', {name}, 'POST');

// Add/Update Member
export const reqAddOrUpdateMember = (member) => ajax(BASE + '/management/member/' + (member._id ? 'update' : 'add'), member, 'POST');

// Delete member
export const reqDeleteMember = (member) => ajax(BASE + '/management/member/delete', member, 'POST');

// Get the role list
export const reqRoles = () => ajax(BASE + '/management/role/list');

// Add new role
export const reqAddRole = (roleName) => ajax(BASE + '/management/role/add', {roleName}, 'POST');

// Set role permissions
export const reqSetRolePermissions = (role) => ajax('/management/role/update', role, 'POST');

// Delete role
export const reqDeleteRole = (role) => ajax(BASE + '/management/role/delete', role, 'POST');

// Get the user list
export const reqUsers = () => ajax(BASE + '/management/user/list');

// Delete user
export const reqDeleteUser = (userId) => ajax(BASE + '/management/user/delete', {userId}, 'POST');

// Get events list
export const reqEvents = () => ajax(BASE + '/calendar/events');

// Add new event
export const reqAddEvent = (events) => ajax(BASE + '/calendar/add', events, 'POST');