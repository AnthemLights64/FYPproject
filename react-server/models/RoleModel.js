const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {type: String, required: true}, // Role name
    auth_name: String, // Authorizer
    auth_time: Number, // Anthorize time
    create_time: {type: Number, default: Date.now}, // Create time
    menus: Array // An array consisting of all menu paths that have operations with permissions
});

const RoleModel = mongoose.model('roles', roleSchema);

module.exports = RoleModel;