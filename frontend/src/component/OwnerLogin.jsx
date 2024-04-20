import React from 'react'
import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


export const OwnerLogin = () => {

  const [phone,setPhone]=useState()
  const [password,setPassword]=useState()

  const navigate=useNavigate()

  async function submitForm(e)
  {
    e.preventDefault()
    try
    {
      const response=await axios.post('http://localhost:4000/busownerlogin',{phone,password});
      if (response.data==1)
      {
        navigate('/ownerpage',{state:{phone:phone}})
      }
      else if(response.data==2)
      {
        console.log("enter valid phone number")
      }
      else
      {
        navigate('/busownerlogin')
      }
    }
    catch(e)
    {
      console.log(e)
    }
  }

  function changeForm(e)
  {
    if(e.target.name=="phones")
    {
      setPhone(e.target.value)
    }
    else
    {
      setPassword(e.target.value)
    }
  }

  return (
    <>
    <form onSubmit={submitForm}>
    <input type='text' id='phone' name="phones" onChange={changeForm}></input>
    <br/>
    <input type='password' id='password' name="passwords" onChange={changeForm}></input>
    <br/>
    <button type='submit' >Submit</button>
  </form>
  <Link to='/ownersignup'>New Owner</Link>
  </>
  )
}

