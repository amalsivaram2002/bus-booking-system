import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './OwnerPage.css'

export const OwnerPage = () => {

  const location=useLocation()

  useEffect(()=>{
    if (location.state.phone)
    {
      console.log("hello",location.state.phone)
      setOwnerPhone(location.state.phone)
    }
    
  },[location.state])


  const [ownerphone,setOwnerPhone]=useState()

  const [condition,setCoondition]=useState(1)
  const [input,setInput]=useState({})
  const [pickup,setPickUp]=useState({})
  const [drop,setDrop]=useState({})
  const [finalpick,setFinalPick]=useState([])
  const [finaldrop,setFinalDrop]=useState([])
  const [buses,setBusses]=useState([])


  const [choosedbus,setChoosedBus]=useState([])
  const [updateDate,setUpdateDate]=useState()
  const [what,setWhat]=useState()
  const [updateinput,setUpdateInput]=useState({})

  const [remaingbus,setRemaningBus]=useState([])
  const [remaingdate,setRemaningDate]=useState()



  useEffect(()=>{
    axios.post('http://localhost:4000/getOwnerBuses',{phone:ownerphone})
    .then((data)=>{
      console.log(data)
      setBusses(data.data.busno)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[condition]
  )
  

  function addinput(e)
  {
    e.preventDefault()
    const name=e.target.name

      if (name=='Fare' || name=='SeatsRemaning' || name=='Ac'  || name=='Sleeper')
      {
        setInput((pastdata)=>{
          return {...pastdata,[name]:Number(e.target.value)}
        })
      }
      else
      {
        setInput((pastdata)=>{
          return {...pastdata,[name]:e.target.value}
        })
      }  
  }

  function picking(e)
  {
    const name=e.target.name;
    setPickUp((prevdata)=>{
      return {...prevdata,[name]:e.target.value}
    })
  }

  function droping(e)
  {
    const name=e.target.name;
      setDrop((prevdata)=>{
      return {...prevdata,[name]:e.target.value}
    })
  }

  function addpick(e)
  {
    e.preventDefault()
    finalpick.push(pickup)
    setPickUp({})
  }

  function adddrop(e)
  {
    e.preventDefault()
    finaldrop.push(drop)
    setDrop({})
  }


  async function addBus(e)
  {
    e.preventDefault()
    setInput((pastdata)=>{
      const updatedData = {...pastdata, ["PickingPoint"]: finalpick, ["DroppingPoint"]: finaldrop};
      console.log('Updated data:', updatedData);
      return updatedData;
    })
    
    axios.post('http://localhost:4000/addBusInformation',input)
    .then((data)=>{
      console.log(data)
    })
    .catch((err)=>{
      console.log(err)
    })

    axios.post('http://localhost:4000/addNewBus',{phone:ownerphone,busno:input.BusNo})
    .then((data)=>{
      console.log(data)
    })
    .catch((err)=>{
      console.log(err)
    })
    
    
  }

  function remaningSeats()
  {
    console.log(ownerphone)
    console.log(remaingdate)
    axios.post('http://localhost:4000/seatsReamaninginAllBus',{phone:ownerphone,date:remaingdate})
    .then((data)=>{
      console.log(data.data)
      setRemaningBus(data.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    setUpdateInput((data)=>{
      return{...data,["busno"]:choosedbus,["date"]:updateDate,["what"]:what}
    })
  },[choosedbus,updateDate,what])

  function updatedata(e)
  {
    const name=e.target.name
     setUpdateInput((datas)=>{
      console.log("amla")
      return {...datas,[name]:e.target.value}
      })

  }

  function changeData()
  {
    axios.post('http://localhost:4000/updateBusInformation',updateinput)
      .then((data)=>{
        console.log(data)
      })
      .catch((err)=>{
        console.log(err)
      }) 
  }

  return (
    <>
      <button id='addButton'  onClick={()=>{setCoondition(1)}}>Add Bus</button>
      <button id='updateButton'  onClick={()=>{setCoondition(2)}}>updating bus</button>
      <button id='seatsButton'  onClick={()=>{setCoondition(3)}}>Seats Remaning</button>

      <div>
        {
          condition==1?
          <div>
            <form onSubmit={addBus} id='addbusform'>
              <label>Bus No:</label>
              <input type='text' name='BusNo' onChange={addinput}></input>
              <br/>
              <label>Name:</label>
              <input type='text' name='Name' onChange={addinput}></input>
              <br/>
              <label>From:</label>
              <input type='text' name='From' onChange={addinput}></input>
              <br/>
              <label>To:</label>
              <input type='text' name='To' onChange={addinput}></input>
              <br/>
              <label>Date:</label>
              <input type='text' name='Date' onChange={addinput}></input>
              <br/>
              <label>Time:</label>
              <input type='text' name='Time' onChange={addinput}></input>
              <br/>
              <label>Reach Time:</label>
              <input type='text' name='ReachTime' onChange={addinput}></input>
              <br/>
              <label>Fare:</label>
              <input type='text' name='Fare' onChange={addinput}></input>
              <br/>
              <label>SeatsRemaning:</label>
              <input type='text' name='SeatsRemaning' onChange={addinput}></input>
              <br/>
              <label>Ac:</label>
              <input type='text' name='Ac' onChange={addinput}></input>
              <br/>
              <label>Sleeper:</label>
              <input type='text' name='Sleeper' onChange={addinput}></input>
              <br/>
              <label>Pick Up:</label>
              <input type='text' name='location' onChange={picking}></input>
              <input type='text' name='time' onChange={picking}></input>
              <button type='submit' onClick={addpick}>Add</button>
              <br/>
              <label>Drop point:</label>
              <input type='text' name='location' onChange={droping}></input>
              <input type='text' name='time' onChange={droping}></input>
              <button type='submit' onClick={adddrop}>Add</button>
              <br/>
              <button type='submit'>Add Bus</button>
            </form>
          </div>
          :
          <></>
        }
      </div>

      <div>
        {
          condition==2?
          <>
            <label>Date:</label>
            <input type='text'  onChange={(e)=>{setUpdateDate(e.target.value)}}></input>
            <br/>
            <div>
              <label>Choose Bus:</label>
              {
                buses.map((data)=>(
                <>
                  <input type='radio' value={data} checked={choosedbus==data} onClick={()=>{setChoosedBus(data)}}></input>
                  <label>{data}</label>
                </>
                ))
              }
            </div>
          <br/>
          <button type='submit' onClick={()=>{setWhat(1)}}>Change Fare</button>
          <button type='submit' onClick={()=>{setWhat(2)}}>Change Time</button>
          <button type='submit' onClick={()=>{setWhat(3)}}>Add PickUp Point</button>
          <button type='submit' onClick={()=>{setWhat(4)}}>Remove PickUp Point</button>
          <button type='submit' onClick={()=>{setWhat(5)}}>Remove PickUp Point</button>
          <button type='submit' onClick={()=>{setWhat(6)}}>Remove Drop Point</button>
          <br/>
          <div>
          {
              what==1?
              <>
                <label>Enter the Fare</label>
                <input type='text' name='fare' onChange={(e)=>{updatedata(e)}}></input>
                <button onClick={changeData}>Update</button>
              </>
              :
              <>
              </>
          }
          </div>

          <div>
          {
              what==2?
              <>
                <label>Enter the Time</label>
                <input type='text' name='time' onChange={(e)=>{updatedata(e)}}></input>
                <button onClick={changeData}>Update</button>
              </>
              :
              <>
              </>
          }
          </div>

          <div>
          {
              what==3?
              <>
                <label>Add pick up point</label>
                <br/>
                <label>Pick up point</label>
                <input type='text' name='place' onChange={(e)=>{updatedata(e)}}></input>
                <label>Enter the Time</label>
                <input type='text' name='time' onChange={(e)=>{updatedata(e)}}></input>
                <button onClick={changeData}>Update</button>
              </>
              :
              <>
              </>
          }
          </div>

          <div>
          {
              what==4?
              <>
                <label>Add Drop point</label>
                <br/>
                <label>Pick up point</label>
                <input type='text' name='place' onChange={(e)=>{updatedata(e)}}></input>
                <label>Enter the Time</label>
                <input type='text' name='time' onChange={(e)=>{updatedata(e)}}></input>
                <button onClick={changeData}>Update</button>
              </>
              :
              <>
              </>
          }
          </div>

          <div>
          {
              what==5?
              <>
                <label>Remove pick up point</label>
                <br/>
                <label>Pick up point</label>
                <input type='text' name='place' onChange={(e)=>{updatedata(e)}}></input>
                <button onClick={changeData}>Update</button>
              </>
              :
              <>
              </>
          }
          </div>

          <div>
          {
              what==6?
              <>
                <label>Remove Drop point</label>
                <br/>
                <label>Pick up point</label>
                <input type='text' name='place' onChange={(e)=>{updatedata(e)}}></input>
                <button onClick={changeData}>Update</button>
              </>
              :
              <>
              </>
          }
          </div>

          </>
          :
          <></>
        }
      </div>

      <div>
        {
          condition==3?
          <div>
            <label>Date:</label>
            <input type='text' onChange={(e)=>{setRemaningDate(e.target.value)}}></input>
            <button type='submit' onClick={()=>{remaningSeats()}}>Search</button>
            <br/>
            {
              remaingbus.map((datas)=>(
                <>
                <label>{datas.BusNo}:</label>
                <label>{datas.SeatsRemaning}</label>
                <br/>
                </>
              ))
            }
          
          </div>
          :
          <></>
        }
      </div>
    </>
  )
}
