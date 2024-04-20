import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import './CustomerSignup.css'


export const CustomerSignup = () => {

    const [input,setInput]=useState({})
    const navigate=useNavigate()

    function addValues(e)
    {
        const name=e.target.name;
        setInput((data)=>{
          if (name=="phone" || name=="age")
          {
            return{...data,[name]:Number(e.target.value)}
          }
          else
          {
            return{...data,[name]:e.target.value}
          }
          
        })
    }

    function formSubmit(e)
    {
      console.log("entered submit")
      e.preventDefault()
      axios.post('http://localhost:4000/CustomerSignUp',input)
      .then((data)=>{
        if (data.data.value==1)
        {
          console.log("form Submited sucessfully")
          navigate('/customerlogin')
        }
      })
      .catch((err)=>{console.log(err)})
    }


  return (
    <form onSubmit={formSubmit}>
        <label>Enter phone:</label><input type="text" name='phone' onChange={addValues}></input>
        <br/>
        <label>Enter Name:</label><input type="text" name='name' onChange={addValues}></input>
        <br/>
        <label>Enter Age:</label><input type="text" name='age' onChange={addValues}></input>
        <br/>
        <label>Choose Gender:</label>
        <input type='radio' name='gender' value="Male" onChange={addValues}></input>
        <label>Male</label>
        <input type='radio' name='gender' value='FeMale' onChange={addValues}></input>
        <label>Female</label>
        <br/>
        <label>Enter password:</label><input type="password" name='password' onChange={addValues}></input>
        <br/>
        <button type='submit'>Submit</button>
    </form>
  )
}
