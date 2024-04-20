const mongoose=require('mongoose')
const businformationss=new mongoose.Schema({
    BusNo:{
        type : String
    },
    Name :{
        type : String
    },
    From : {
        type : String
    },
    To : {
        type : String
    },
    Date : {
        type : String
    },
    PickTime : {
        type : String
    },
    DropTime:{
        type : String
    },
    Duration:{
        type : String
    },
    Fare :{
        type : Number
    },
    SeatsRemaning : {
        type : Number
    },
    Ac : {
        type : Number
    },
    Sleeper : {
        type : Number
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

const businfos=mongoose.model('businformations',businformationss)
module.exports=businfos