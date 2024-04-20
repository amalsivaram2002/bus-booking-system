const mongoose= require('mongoose');
const customer_signup=new mongoose.Schema({
    phone:{
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    age :{
        type : Number,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
}) 

const customerlogin=mongoose.model('CustomerLogin',customer_signup);
module.exports=customerlogin;