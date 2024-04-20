const mongoose=require('mongoose')
const busowner=new mongoose.Schema({
    phone : {
        type : Number,
        required : true
    },
    name : {
        type : String
    },
    age : {
        type : Number
    },
    gender : {
        type : String
    },
    password : {
        type : String
    },
    busno : [
        {
            type : String
        }
    ]
})

const owneradding = mongoose.model('busownerinfo',busowner)
module.exports=owneradding