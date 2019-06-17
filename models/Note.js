//REQUIRING THE DEPENDENCIES
var mongoose = require('mongoose');

//REFERENCING THE SCHEMA
var Schema = mongoose.Schema;

//CREATING THE SCHEMA
var NoteSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
    }
});

//CREATING THE MODEL FROM THE SCHEMA
var Note = mongoose.model('Note', NoteSchema);

//EXPORT THE ARTICLE MODULE
module.exports = Article;