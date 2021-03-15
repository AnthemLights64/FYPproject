/*
    Define the router module
*/

const express = require('express');
const md5 = require('blueimp-md5');

const UserModel = require('../models/UserModel');
const RoleModel = require('../models/RoleModel');
const MemberModel = require('../models/MemberModel');

// Fetch the router object
const router = express.Router();

// Specify the attributes to be filtered
const filter = { password: 0, __v: 0 }

var ObjectId = require('mongodb').ObjectId;

// Login
router.post('/login', (req, res) => {
const {username, password} = req.body;
UserModel.findOne({username, password: md5(password)})
    .then(user => {
        if (user) {
            // Generate a cookie (userid: user._id)
            res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24});
            if (user.role_id) {
                RoleModel.findOne({_id: user.role_id})
                    .then(role => {
                        user._doc.role = role;
                        console.log('role user', user);
                        res.send({status: 0, data: user});
                    });
            } else {
                user._doc.role = {menus: []};
                res.send({status: 0, data: user});
            }
        } else {
            res.send({status: 1, msg: 'Invalid username or password!'});
        }
    }).catch(error => {
        console.error('Login exception occurs', error);
        res.send({status: 1, msg: 'Login exception occurs. Please try again.'});
    });
});

// Add user
router.post('/manage/user/add', (req, res) => {
    // Read the data of request parameters
    const {username, password} = req.body;
    // Check if the user already exists
    // Search by username
    UserModel.findOne({username})
        .then(user => {
            if (user) { // User already exists
                res.send({status: 1, msg: 'This user already exists.'});
                return new Promise(() => {});
            } else { // User doesn't exist
                return UserModel.create({...req.body, password: md5(password || 'WenlongLu')});
            }
        }).then(user => {
            res.send({status: 0, data: user});
        }).catch(error => {
            console.error('Add user exception occurs', error);
            res.send({status: 1, msg: 'Add user exception occurs. Please try again.'});
        });
});

// Update user
router.post('/manage/user/update', (req, res) => {
    const user = req.body;
    UserModel.findOneAndUpdate({_id: user._id}, user)
        .then(oldUser => {
            const data = Object.assign(oldUser, user);
            res.send({status: 0, data});
        }).catch(error => {
            console.error('Update user exception occurs', error);
            res.send({status: 1, msg: 'Update user exception occurs. Please try again.'});
        });
});

// Delete user
router.post('/manage/user/delete', (req, res) => {
    const {userId} = req.body;
    UserModel.deleteOne({_id: userId})
        .then((doc) => {
            res.send({status: 0});
        });
});

// Get a list of all users
router.get('/manage/user/list', (req, res) => {
    UserModel.find({username: {'$ne': 'admin'}}) // $ne means not equal to
        .then(users => {
            RoleModel.find().then(roles => {
                res.send({status: 0, data: {users, roles}});
            });
        }).catch(error => {
            console.error('Get users list exception occurs', error)
            res.send({status: 1, msg: 'Get users list exception occurs,. Please try again.'});
        });
});

// Add role
router.post('/manage/role/add', (req, res) => {
    const {roleName} = req.body;
    RoleModel.create({name: roleName})
        .then(role => {
            res.send({status: 0, data: role});
        }).catch(error => {
            console.error('Add role exception occurs', error);
            res.send({status: 1, msg: 'Add role exception occurs. Please try again.'});
        });
});

// Get role list
router.get('/manage/role/list', (req, res) => {
    RoleModel.find()
        .then(roles => {
            res.send({status: 0, data: roles});
        }).catch(error => {
            console.error('Get role list exception occurs', error);
            res.send({status: 1, msg: 'Get role list exception occurs. Please try again.'});
        });
});

// Update role (set permissions)
router.post('/manage/role/update', (req, res) => {
    const role = req.body;
    role.auth_time = Date.now();
    RoleModel.findOneAndUpdate({_id: role._id}, role)
        .then(oldRole => {
            res.send({status: 0, data: {...oldRole._doc, ...role}});
        }).catch(error => {
            console.error('Update role exception occurs', error);
            res.send({status: 1, msg: 'Update role exception. Please try again.'});
        });
});

// Get the paging information object of the specified array
function pageFilter(arr, pageNum, pageSize) {
    pageNum = pageNum * 1;
    pageSize = pageSize * 1;
    const total = arr.length;
    const pages = Math.floor((total + pageSize - 1) / pageSize);
    const start = pageSize * (pageNum - 1);
    const end = start + pageSize <= total ? start + pageSize : total;
    const list = [];
    for (var i=start; i<end; i++) {
        list.push(arr[i]);
    }
    return {
        pageNum,
        total,
        pages,
        pageSize,
        list
    }
}

// Add new member
router.post('/management/member/add', (req, res) => {
    const member = req.body;
    MemberModel.create(member)
        .then(member => {
            res.send({
                status: 0,
                data: member
            });
        })
        .catch(error => {
            console.error('Failed to add new member!', error);
            res.send({
                status: 1,
                msg: 'Failed to add new member. Please try again.'
            });
        });
});

// Update a member
router.post('/management/member/update', (req, res) => {
    const member = req.body;
    MemberModel.findOneAndUpdate({_id: ObjectId(member._id)}, member)
        .then(m => {
            res.send({
                status: 0
            });
        })
        .catch(error => {
            console.error('Failed to update member!', error);
            res.send({
                status: 1,
                msg: 'Failed to update member. Please try again.'
            });
        });
});

// Detele a member
router.post('/management/member/delete', (req, res) => {
    const member = req.body;
    //console.log(member._id)
    MemberModel.findOneAndDelete({_id: ObjectId(member._id)}, member)
        .then(member => {
            res.send({
                status: 0,
                data: member,
            });
        })
        .catch(error => {
            console.error('Failed to delete member!', error);
            res.send({
                status: 1,
                msg: 'Failed to delete member. Please try again.'
            });
        });
});

// Get members paging lsit
router.get('/management/member/list', (req, res) => {
    const {pageNum, pageSize} = req.query;
    MemberModel.find({})
        .then(members => {
            res.send({
                status: 0,
                data: pageFilter(members, pageNum, pageSize)
            });
        })
        .catch(error => {
            console.error('Failed to get members paging list!', error);
            res.send({
                status: 1,
                msg: 'Failed to get members paging list. Please try again.'
            });
        });
});

// Search members list
router.get('/management/member/search', (req, res) => {
    const {pageNum, pageSize, searchName, searchType } = req.query;
    let match = {};
    if (searchType==='memberName') {
        match = {name: new RegExp(`^.*${searchName}.*$`)};
    } else if (searchType==='memberNickname') {
        match = {nickname: new RegExp(`^.*${searchName}.*$`)};
    } else if (searchType==='memberPosition') {
        match = {position: new RegExp(`^.*${searchName}.*$`)};
    }
    MemberModel.find(match)
        .then(members => {
            res.send({
                status: 0,
                data: pageFilter(members, pageNum, pageSize)
            });
        })
        .catch(error => {
            console.error('Failed to get the matching list!', error);
            res.send({
                status: 1,
                a: searchName,
                b: searchType,
                msg: 'Failed to get the matching list. Please try again'
            });
        });
});

require('./file-upload')(router);

module.exports = router;