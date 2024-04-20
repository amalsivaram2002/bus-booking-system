const mongoose= require('mongoose');
const customerlogin=new mongoose.Schema({
    phone : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const custlogin=mongoose.model('customerlogins',customerlogin);
module.exports=custlogin;