import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Navigate, Route } from 'react-router-dom'

function App() {

  const session=true


  return (
    <div className="">
      {session ? <Navigate to="/home"></Navigate> : <Navigate to="/account"></Navigate>}
    </div>
  )
}

export default App
