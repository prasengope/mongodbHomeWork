//REQUIRING THE DEPENDENCIES
var mongoose = require('mongoose');

//REFERENCING THE SCHEMA
var Schema = mongoose.Schema;

//CREATING THE SCHEMA
var ArticleSchema = new Schema({
    //BOTH TITLE AND LINK ARE DEFAULT COLUMNS
    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    //REFERENCING TO THE NOTE MODEL
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }
});

//CREATING THE MODEL FROM THE SCHEMA
var Article = mongoose.model('Article', ArticleSchema);

//EXPORT THE ARTICLE MODULE
module.exports = Article;