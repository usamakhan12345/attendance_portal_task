import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { useState ,  } from "react";



export default function BasicTextFields() {
  const[email , setEmail] = useState()
  const[password , setPassword] = useState()

  const navigate = useNavigate()
  // React.useEffect(()=>{
  //   const token =   localStorage.getItem('token')
  //   console.log(token)
  //   if(token){
  //     navigate('/admin')
  //   }
  // },[])

  const Userlogin = ()=>{
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
  }).then((res)=>{
    
    console.log(res.data.user)
    if(res.data.user){
      localStorage.setItem('token',res.data.token)
      localStorage.setItem('id',res.data.id)
    navigate('/user')

    }else{
      localStorage.setItem('id',res.data.id)

      navigate('/admin')
    }
  }).catch(err => console.log(err))
  }
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // alignContent : 'center',
        alignItems: "center",
        alignSelf: "center",
        marginTop : 18
      }}
      noValidate
      autoComplete="off"
    >
      <h3 style={{ textAlign: "center", color: "blue" }}>Login</h3>
      <Box sx={{ justifyContent: "center" }}>
        <TextField
          sx={{ marginBottom: 5 }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(e)=> setEmail(e.target.value)}
          value={email}
        />

        <TextField  value={password} onChange={(e)=>setPassword(e.target.value)} id="filled-basic" label="Password" variant="outlined" />
      </Box>
      <Button onClick={Userlogin} sx={{ borderRadius: 8 }} variant="contained">
        Login
      </Button>
    </Box>
  );
}
