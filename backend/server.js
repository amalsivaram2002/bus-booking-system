const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// const routes = require('./Routes.js');
const BusOwnerSignUp=require('./schema/BusOwnerSignUp.js')
const BusOwnerLogin=require('./schema/BusOwnerLogin.js')
const addingbusinfo=require('./schema/AddBusInformation.js')
const businfo=require('./schema/BusInfo.js')


const customerloginmodel=require('./schema/CustomerSignup.js')
const customerloginsmodel=require('./schema/CustomerLogin.js')
const confirmingTicket = require('./schema/BookingId.js')

const app = express();
app.use(cors());
app.use(express.json());
// app.use(routes);

mongoose.connect('mongodb://127.0.0.1:27017/BusBooking', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Connection succeeded');
});




app.post('/ownerSignUp',(req,res)=>{
  res.set({
    'Access-Control-Allow-Origin': '*',
  });
  console.log("adding new bus owner")
  console.log(req.body)
  BusOwnerSignUp.create(req.body)
  .then(data=>{res.json(data)})
  .catch(err=>{res.json(err)})
})

app.post('/busownerlogin',(req,res)=>{
  res.set({
    'Access-Control-Allow-Origin': '*',
  });
  const phone= req.body.phone;
  const password=req.body.password;
  console.log(phone)
  BusOwnerLogin.findOne({phone})
  .then(user=>{
    if (user==null)
    {
      res.json(2)
    }
    else if (user.password==password)
    {
      res.json(1)
    }
    else
    {
      res.json("Password mismatched")
    }
  })
  .catch(err=>res.json(err))
  
})

app.get('/listAllOwners',async(req,res)=>{
  BusOwnerSignUp.find({},{})
  .then((data)=>{
    res.json({"data":data})
  })
  .catch((err)=>{
    res.json(err)
  })
})

app.put('/update-bus-owner/:id',async(req,res)=>{
  if (req.body.name && req.body.phone && req.body.password)
  {
    BusOwnerSignUp.findByIdAndUpdate(req.params.id,req.body,{new : true})
    .then((data)=>{
      if (data)
      {
        console.log(data)
        res.json({
          "data":data,
          "sucess":true
        })
      }
      else
      {
        getNotFoundResponse(data, res);
      }
    })
    .catch((err)=>{
      console.log(err)
      res.status(500).json({
        "sucess":false,
        "error":"canot find the bus owner"
      })
    })
  }
  
  else
  {
    res.status(400).json({"sucess":false,"error":"enter all the fields"})
  }
  
})

app.delete('/bus-owner/:id',async(req,res)=>{
  BusOwnerSignUp.findByIdAndDelete(req.params.id)
  .then((data)=>{
    if (data)
    {
      res.status(204).json({"scucess":true})
    }
    else
    {
      getNotFoundResponse(data,res)
    }
    
  })
  .catch((err)=>{
    console.log(err)
    res.status(500).json({"sucess":false,"error":"something went wrong"})
  })
})

app.post('/addBusInformation',(req,res)=>{
  console.log("Adding new hi Bus")
  res.set({
    'Access-Control-Allow-Origin': '*',
  });
  addingbusinfo.create(req.body)
  .then(bus=>res.json(bus))
  .catch((err)=>{
    res.json(err)
    console.log(err)
  })
})

app.post('/addNewBus',(req,res)=>{
  console.log("adding new bus number")
  res.set({
    'Access-Control-Allow-Origin': '*',
  });
  const phone = req.body.phone
  const busno=req.body.busno
  BusOwnerSignUp.updateOne({phone: phone},{$push:{busno:busno}})
  .then(data=> {res.json(data)})
  .catch(err=> { res.json(err)})
})

app.post('/updateBusInformation',(req,res)=>{
  console.log("updating bus information")
  res.set({
    'Access-Control-Allow-Origin': '*',
  });
  const busnumber=req.body.busno;
  const date=req.body.date;
  const whattoupdate=req.body.what;
  console.log("updating")
  if (whattoupdate==1)
  {
    console.log("changing fare")
    const updatingvalue=req.body.fare;
    businfo.updateOne({BusNo:busnumber,Date:date},{$set:{Fare:updatingvalue}})
    .then(data=>{res.json(data)})
    .catch(err=>{res.json(err)})
  }
  else if (whattoupdate==2)
  {
    console.log("changing time")
    const time =req.body.time;
    console.log(time)
    console.log(busnumber)
    console.log(date)
    businfo.updateOne({BusNo:busnumber,Date:date},{$set:{Time:time}})
    .then(data=>{res.json(data)})
    .catch(err=>{res.json(err)})
  }
  else if (whattoupdate==3)
  {
    console.log("adding pick up point")
    const place =req.body.place;
    const time = req.body.time;
    businfo.updateOne({BusNo:busnumber,Date:date},{$push:{PickingPoint:{location:place,time:time}}})
    .then(data=>{res.json(data)})
    .catch(err=>{res.json(err)})
  }
  else if (whattoupdate==4)
  {
    console.log("adding dropping up point")
    const place =req.body.place;
    const time = req.body.time;
    businfo.updateOne({BusNo:busnumber,Date:date},{$push:{DroppingPoint:{location:place,time:time}}})
    .then(data=>{res.json(data)})
    .catch(err=>{res.json(err)})
  }
  else if (whattoupdate==5)
  {
    console.log("removing pick up point")
    const place =req.body.place;
    businfo.updateOne({BusNo:busnumber,Date:date},{$pull:{PickingPoint:{location:place}}})
    .then(data=>{res.json(data)})
    .catch(err=>{res.json(err)})
  }
  else if (whattoupdate==6)
  {
    console.log("removing drropping up point")
    const place =req.body.place;
    businfo.updateOne({BusNo:busnumber,Date:date},{$pull:{DroppingPoint:{location:place}}})
    .then(data=>{res.json(data)})
    .catch(err=>{res.json(err)})
  }
  else
  {
    res.json("nothing to update")
  }

})

app.post('/getOwnerBuses',(req,res)=>{
  console.log("owner getting buses")
  const phone=req.body.phone;
  BusOwnerSignUp.findOne({phone},{busno:1})
  .then((data)=>{
    res.json(data)
  })
  .catch((err)=>{
    res.json(err)
  })
})

app.post('/seatsReamaninginAllBus',(req,res)=>{
  console.log("owner searching for seats")
  const phone=req.body.phone
  const date=req.body.date
  BusOwnerSignUp.findOne({phone:phone })
  .then(data=>{
    const busesnum=data.busno
    businfo.find({BusNo:{$in:busesnum},Date:date})
    .then(datas=>{res.json(datas)})
    .catch(err=>{res.json(err)})
  })
  .catch(err=>{res.json(err)})
})




app.post('/CustomerSignUp',  (req, res)=> {
  res.set({
    'Access-Control-Allow-Origin': '*',
  });
  console.log("adding new customer")
  console.log(req.body)
  customerloginmodel.create(req.body)
  .then(customerlogin=>res.json({"value":1}))
  .catch(err=>{
    console.log(err)
    res.json(err)
  })

});

app.post('/customerlogin',(req,res)=>{
  res.set({
    'Access-Control-Allow-Origin': '*',
  });
  console.log("login")
  const phone= req.body.phone;
  const password=req.body.password;
  customerloginsmodel.findOne({phone})
  .then(user=>{
    if (user==null)
    {
      res.json(2)
    }
    else if (user.password==password)
    {
      res.json(1)
    }
    else
    {
      res.json("Password mismatched")
    }
  })
  .catch(err=>res.json(err))
  
})

// Inputs are : From  ,  To   ,   Date

app.get('/getBusDteails',(req,res)=>{
  console.log("Reteriving the Bus Details")
  res.set({
    'Access-Control-Allow-Origin': '*',
  });
  console.log(req.body)
  const source=req.body.from;
  const destination=req.body.to;
  const date=req.body.date;
  console.log(source,destination,date)
  businfo.find({From : source,To:destination,Date: date})
  .then(data=>{res.json(data)})
  .catch(err=>{res.json(err)})
})


app.post('/confirmingTicket',(req,res)=>{
  console.log("confirming order")
  confirmingTicket.create(req.body)
  .then(data=>{res.json("booking confirmed")})
  .catch(err=> { res.json(err)})

})

app.post('/reducingseat',(req,res)=>{
  console.log("reducing the seat")
  const busno = req.body.BusNo;
  const date= req.body.Date
  const numseats=req.body.seats;
  console.log(busno,date,numseats)
  businfo.findOne({BusNo:busno , Date : date},{SeatsRemaning:1  })
  .then(data=>{
    const availableseats=data.SeatsRemaning-numseats
    console.log(availableseats)
    businfo.updateOne({BusNo:busno , Date : date},{$set:{SeatsRemaning:availableseats}})
    .then(dat=>{res.json("seats reduced")})
    .catch(err=>{res.json(err)})
  })
  .catch(err=>{res.json(err)})
})

app.post('/customerKnowsPastBooking',(req,res)=>{
  const phone=req.body.phone
  confirmingTicket.find({phone : phone})
  .then(data=>{res.json(data)})
  .catch(err=>{res.json(err)})
})


app.listen(4000, function () {
  console.log('Server is running on port 3000');
});
function getNotFoundResponse(data, res) {
  console.log(data);
  res.status(404).json({
    "sucess": false,
    "error": "canot find the bus owner"
  });
}

