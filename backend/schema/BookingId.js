const mongoose=require('mongoose')
const booking=new mongoose.Schema({
    phone:{
        type : String,
        required : true
    },
    busno : {
        type : String
    },
    numofseats : {
        type : Number
    },
    customer_went_date : {
        type : String
    },
    Customer_went_time:{
        type:String
    },
    customer_pickup : {
        type : String
    },
    customer_drop : {
        type : String
    },
    total_amt : {
        type : Number
    }
})

const bookmodel = mongoose.model('bookid',booking)
module.exports=bookmodel