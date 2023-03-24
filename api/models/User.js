const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type : String , 
        required : true
    },
    email: {
        type : String , 
        required : true , 
        unique : true
    },
    password : {
        type : String , 
        required : true
    },
    cart : {
        type : Array , 
    },
    role : {
        type : String , 
        required : true , 
        default : 'user'
    }
});

const UserModel = mongoose.model('User' , UserSchema)
module.exports = UserModel