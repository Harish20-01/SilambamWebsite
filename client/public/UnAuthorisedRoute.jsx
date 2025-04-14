import React from 'react'
import Login from '../src/Pages/Login'
const UnAuthorisedRoute = ({setIsLoggedIn}) => {
  return (
    <div>
      <h3>You Should have Access to Edit ...Login to Continue</h3>
      <Login setIsLoggedIn={setIsLoggedIn}></Login>
    </div>
  )
}

export default UnAuthorisedRoute
