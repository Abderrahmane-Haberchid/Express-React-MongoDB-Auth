import React from 'react'
import Home from './Home'
import Login from './Login'

function PrivateRoute() {


  const localS = localStorage.getItem("status")

  return (
    <div>
      {localS === "logged in" ? <Home /> : <Login />}
    </div>
  )
}

export default PrivateRoute