import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from './style.module.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useState, } from "react";
import { toast } from "react-toastify";



export default function BasicTextFields() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()


  const Userlogin = () => {
    const userDetails = {
      email,
      password
    }
    console.log(userDetails)
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/students/login',
      data: {
        ...userDetails
      }
    }).then((res) => {

      console.log(res)
      if (res.data.user.includes("admin")) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('id', res.data.id)
        toast.success("Admin Login Successfuly")
        navigate('/admin')

      } else {
        localStorage.setItem('id', res.data.id)
        toast.success("User Login Successfuly")

        navigate('/user')
      }
    }).catch(err => toast.error("Enter Valid Email Or Password"))
  }
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "45ch" },
        display: "flex",
        // flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height :' 100vh'
      }}
      noValidate
      autoComplete="off"
    >
      <Box sx={{  height : 400 , width : 400 , backgroundColor : "whitesmoke", textAlign : 'center' }} >
      <h3 style={{ color: "#1976d2" , marginTop : 30  , marginBottom : 30 }}>WELCOME BACK TO SMIT</h3>
        <TextField
          sx={{ marginBottom: 5  , width : '350px' }}
          id="outlined-basic"
          label="Email"
          variant="outlined" git init
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <TextField 
          sx={{ marginBottom: 5  , width : '350px'}}

        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        id="filled-basic" 
        label="Password" 
        variant="outlined" />
      <Button className={styles.loginBtn} onClick={Userlogin}  variant="contained">
        Login
      </Button>
      </Box>
    </Box>
  );
}
