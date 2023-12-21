import React from 'react'
import { Route , BrowserRouter as Router , Routes } from 'react-router-dom'
import Login from "./Pages/Login/Login"
import Adminportal from './Pages/AdminPortal/Adminportal'
import AddStudent from './Pages/AddStudent/AddStudent'
import AdminAttendance from "./Pages/AdminPortal/AdminAttendance"
import User from "./Pages/User/User"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
   <>
    <Router>
    <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  />
  {/* Same as */}
  <ToastContainer />
      <Routes>
        <Route  path='/'  element={<Login/>} />
        <Route  path='/admin'  element={<Adminportal/>} />
        <Route  path='/addStudent'  element={<AddStudent/>} />
        <Route  path='/attendance/:id'  element={<AdminAttendance/>} />
        <Route  path='/user'  element={<User/>} />
      </Routes>

    </Router>

   </>
  )
}

export default App
