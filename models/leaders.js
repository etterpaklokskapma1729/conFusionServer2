const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
    rating : {
        type : Number,
        min : 1,
        max : 5,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    }
},{
        timestamps : true    
});

var leaderSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type :  String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    featured : {
        type : Boolean,
        default : true
    },
    comments : [commentSchema]
},{
        timestamps : true    
});

var leaders = mongoose.model('Leader', leaderSchema);

module.exports = leaders;