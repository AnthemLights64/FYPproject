const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    date: {type: String, require: true},
    eventList: {type: Array, require: true}
});

const EventModel = mongoose.model('events', eventSchema);

module.exports = EventModel;