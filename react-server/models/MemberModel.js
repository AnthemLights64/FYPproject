const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {type: String, required: true},
    nickname: {type: String, required: true},
    position: {type: String, required: true},
    gender: {type: String},
    dob: {type: String},
    nationality: {type: String},
    phone: {type: String},
    address: {type: String},
    photo: {type: Array, default: []},
    details: {type: String}
});

const MemberModel = mongoose.model('members', memberSchema);

module.exports = MemberModel;