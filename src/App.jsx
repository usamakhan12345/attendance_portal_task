import React from 'react'
import { Route , BrowserRouter as Router , Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from "./Pages/Login/Login"
import LoginUser from "./Pages/LoginUser"
import Adminportal from './Pages/AdminPortal/Adminportal'
import AddStudent from './Pages/AddStudent/AddStudent'
import Dashboard from './Pages/Dashboard/Dashboard'
import AdminAttendance from './Pages/AdminPortal/AdminportalAttendance/AdminAttendance'
import User from "./Pages/User/User"

const App = () => {
  return (
   <>
    <Router>
      <Routes>
        <Route  path='/'  element={<Login/>} />
        <Route  path='/admin'  element={<Adminportal/>} />
        <Route  path='/addStudent'  element={<AddStudent/>} />
        <Route  path='/attendance'  element={<AdminAttendance/>} />
        <Route  path='/user'  element={<User/>} />
      </Routes>

    </Router>

   </>
  )
}

export default App
