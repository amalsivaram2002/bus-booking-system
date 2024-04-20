const express = require('express');
const router = express();
const CustomerLogin=require('./schema/CustomerSchema')

router.post("/CustomerLogin",async(req,res)=>
{
    try
    {
        await CustomerLogin(req.body).save();
        console.log(req.body);
        res.status(200).json({message:'sucess'})
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
}
)


router.get('/', (req, res) => {
  res.send('Hello from the route in Routes.js');
});

module.exports = router;

