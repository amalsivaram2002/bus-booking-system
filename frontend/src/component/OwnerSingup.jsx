import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


export const OwnerSingup = () => {

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
        e.preventDefault()
        setInput((data)=>{
            return{...data,["busno"]:[]}
        })
        console.log(input)

        axios.post('http://localhost:4000/ownerSignUp',input)
        .then((data)=>{
            console.log("data entered")
        })
        .catch((err)=>{
            console.log(err)
        })
    }

  return (
    <form onSubmit={formSubmit}>
        <label>Enter phone:</label><input type="text" name='phone' onChange={addValues}></input>
        <br/>
        <label>Enter Name:</label><input type="text" name='name' onChange={addValues}></input>
        <br/>
        <label>Enter Age:</label><input type="text" name='age' onChange={addValues}></input>
        <br/>
        <label>Enter password:</label><input type="password" name='password' onChange={addValues}></input>
        <br/>
        <button type='submit'>Submit</button>
    </form>
  )
}
