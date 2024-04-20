const mongoose= require('mongoose');
const busownerlogin=new mongoose.Schema({
    phone : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const ownlogin=mongoose.model('busownerinfos',busownerlogin);
module.exports=ownlogin;