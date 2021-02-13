const mongoose = require('mongoose');
const md5 = require('blueimp-md5');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    role_id: String,
    notes: String,
    create_time: {type: Number, default: Date.now}
});

const UserModel = mongoose.model('users', userSchema);

// Initialize default administrator
UserModel.findOne({ username: 'admin' }).then( user => {
    if (!user) {
        UserModel.create({ username: 'admin', password: md5('admin') })
            .then( user => {
                console.log('Initialize user. Username: admin, password: admin');
            });
    }
});

module.exports = UserModel;