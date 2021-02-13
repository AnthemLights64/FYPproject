/*
    Define the router module
*/

const express = require('express');
const md5 = require('blueimp-md5');

const UserModel = require('../models/UserModel');
const RoleModel = require('../models/RoleModel');

// Fetch the router object
const router = express.Router();

// Specify the attributes to be filtered
const filter = { password: 0, __v: 0 }

// Login
router.post('/login', (req, res) => {
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

