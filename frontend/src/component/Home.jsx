import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Link to='/customerlogin'>Customer Login</Link>
        <Link to='/busownerlogin'>Owner Login</Link>
    </div>
  )
}

export default Home