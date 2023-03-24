const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name : String , 
    desc : String , 
    favourite : {
        type : Boolean , 
        default : false
    } , 
    image : String ,
    price : Number ,
    type : String ,
})

const ProductModel = mongoose.model('Product' , ProductSchema)
module.exports = ProductModel