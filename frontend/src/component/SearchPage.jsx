import React from 'react'
import { useState , useEffect , useContext } from 'react'
import { useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CustomerLogin } from './CustomerLogin'
import {mobilenumber} from '../contextsharing/mobilenumber'


export const SearchPage = () => {

  const navigate=useNavigate()

  const [custphone,setCustPhone]=useState()

  const [input,setInput]=useState({})
  const [buslist,setBus]=useState([])
  const [condition,setCondition]=useState(100)
  const [pickingpoint,setPickingPoint]=useState([])
  const [droppingpoint,setDroppingPoint]=useState([])
  const [pickinglocation,setPickLocation]=useState()
  const [droppinglocation,setDropLocation]=useState()
  const [finalbusnum,setFinalBusNum]=useState();
  const [finaldate,setFinalDate]=useState();
  const [finaseats,setFinalSeats]=useState()
  const[Went_time,setWentTime]=useState()
  const [fares,setFares]=useState()

  const [pastbookings,setPastBookings]=useState([])
  const [viewpastbookings,setViewPastBookings]=useState(0)

  // const cusphone=useContext(mobilenumber)
  
  const location=useLocation()
  
  useEffect(()=>{
    if(location.state.phone)
    {
      setCustPhone(location.state.phone)
    }    
  },[location.state.phone])

  function giveValues(e)
  {
    const name=e.target.name;
    setInput((data)=>{
      return {...data,[name]:e.target.value}
    })

  }

  function searchTask(e)
  {
    e.preventDefault()
    axios.post('http://localhost:4000/getBusDteails',input)
    .then((datas)=>{
      setBus(datas.data)
    })
    .catch((err)=>{console.log(err)})
  }

  function busChoosed(busnum,date,Time,fare,index)
  {
    setCondition(index)
    setPickingPoint(buslist[index].PickingPoint)
    setDroppingPoint(buslist[index].DroppingPoint)
    setFinalBusNum(busnum)
    setFinalDate(date)
    setWentTime(Time);
    setFares(fare)
  }

  function confirmBooking()
  {
    const total=finaseats*fares


    axios.post('http://localhost:4000/reducingseat',{"BusNo":finalbusnum,"Date":finaldate,"seats":finaseats})
    .then((data)=>{
      console.log(data)
    })
    .catch((err)=>{console.log(err)})

    axios.post('http://localhost:4000/confirmingTicket',{"phone":custphone,"busno":finalbusnum,"numofseats":finaseats,"customer_went_date":input.date,"customer_went_time":Went_time,"customer_pickup":pickinglocation,"customer_drop":droppinglocation,"total_amt":total})
    .then(
      (data)=>{
        navigate('/finished')
      }
    )
    .catch(err=>{console.log(err)})
  }

  function pastBookings(e)
  {
    e.preventDefault()
    

    axios.post('http://localhost:4000/customerKnowsPastBooking',{"phone":custphone})
    .then((data)=>{
      setPastBookings(data.data)
    })
    .catch((err)=>{
      console.log(err)
    })

    if (viewpastbookings==1)
    {
      setViewPastBookings(0)
    }
    else
    {
      setViewPastBookings(1)
    }
  }

  return (
    <>
    <div>
      {
        viewpastbookings==0?
        <>
          <button onClick={(e)=>{pastBookings(e)}}>Past Bookings</button>
        </>
        :
        <>
          <button onClick={(e)=>{pastBookings(e)}}>Hide Bookings</button>
        </>
      }
      
    </div>
    <div>
      {
        viewpastbookings==1?
        <>
          <label>From</label>&nbsp;&nbsp;&nbsp;
          <label>To</label>&nbsp;&nbsp;&nbsp;
          <label>Date</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label>Total amt</label>
          <br/>
          {
              pastbookings.map((data,index)=>(
              <>
                <label>{data.customer_pickup}</label>&nbsp;&nbsp;&nbsp;
                <label>{data.customer_drop}</label>&nbsp;&nbsp;&nbsp;
                <label>{data.customer_went_date}</label>&nbsp;&nbsp;&nbsp;
                <label>{data.total_amt}</label>
                <br/>
              </>
            ))
          }
        </>
        :
        <>
        </>
      }
    </div>
    <form onSubmit={searchTask}>
      <label>From:</label>
      <input type='text' name='from' onChange={giveValues}></input>
      <br/>
      <label>To:</label>
      <input type='text' name='to' onChange={giveValues}></input>
      <br/>
      <label>Date:</label>
      <input type='text' name='date' onChange={giveValues}></input>
      <br/>
      <label>Number of Seats:</label>
      <input type='text' name='seats' onChange={(e)=>setFinalSeats(e.target.value)}></input>
      <br/>
      <button type='submit'>Search</button>
    </form>
    <div>
    {buslist.length!=0?
        buslist.map((data,index)=>(
        <div>
          <label>{data.Name}</label>
          <label>{data.From}</label>
          <label>{data.Time}</label>
          <label>{data.To}</label>
          <label>{data.Fare}</label>
          <button onClick={()=>{busChoosed(data.BusNo,data.Date,data.Time,data.Fare,index)}}>Book</button>
          <div>
            {
              condition==index?
              <>
              <label>picking Point:</label>
              {
                pickingpoint.map((pic,index)=>(
                  <>
                  <input type='radio' name='picklocation' value={pic.location} onChange={()=>setPickLocation(pic.location)}></input>
                  <label>{pic.location}:{pic.time}</label>
                  <br/>
                  </>
                ))
              }
              <br/>
              <label>dropping point:</label>
              {
                droppingpoint.map((drop,index)=>(
                <>
                <input type='radio' name='droppinglocation' value={drop.location} onClick={()=>setDropLocation(drop.location)}></input>
                <label>{drop.location}:{drop.time}</label>
                <br/>
                </>
                ))
              }
              <button onClick={()=>{confirmBooking()}}>Confirming Booking</button>
              </>
              :
              <></>
            }
          </div>
        </div>
        ))
      :<div><label>No bus found</label></div>
    }
    </div>
    </>
  )
}
