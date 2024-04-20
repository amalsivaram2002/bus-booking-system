const mongoose=require('mongoose')
const businformation=new mongoose.Schema({
    BusNo:{
        type : String,
        required : true,
        unique : true
    },
    Name :{
        type : String,
        required : true
    },
    From : {
        type : String,
        required:true
    },
    To : {
        type : String,
        required :true
    },
    Date : {
        type : String,
        required : true
    },
    Time : {
        type : String,
        required : true
    },
    ReachTime:{
        type: String
    },
    Fare:{
        type : Number,
        required : true
    },
    SeatsRemaning : {
        type : Number,
        required: true
    },
    Ac : {
        type : Number,
        required :true
    },
    Sleeper : {
        type : Number,
        required : true
    },
    PickingPoint : [{
        location : String,
        time : String
    }],
    DroppingPoint : [
        {
            location : String,
            time : String
        }
    ]
})

const businfo=mongoose.model('BusInformation',businformation)
module.exports=businfo