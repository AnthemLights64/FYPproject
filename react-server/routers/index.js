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