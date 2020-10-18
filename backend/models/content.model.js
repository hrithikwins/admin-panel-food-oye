const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// username
// content

const contentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    userData: {
        type: Array
    }
},{
    timestamps: true,
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
