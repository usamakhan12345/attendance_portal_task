import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./style.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import AuthRedirector from "../../Components/authRedirector";
import attendancebackground from "../../assets/attendancebackground.jpg"
import { useMediaQuery } from "@mui/material";
import breakpoints from "../../Helpers/Breakppoints";

export default function BasicTextFields() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(()=>{
    const adminToken = localStorage.getItem('admintoken')
    const userToken = localStorage.getItem('usertoken')
    if(adminToken){
      navigate('/admin')
    }
    if(userToken){
      navigate('/user')
    }
  },[location.pathname])

  const isXs = useMediaQuery(breakpoints.xs);
 

  const Userlogin = () => {
    const userDetails = {
      email,
      password,
    };
    console.log(userDetails);
    axios({
      method: "post",
      url: "http://localhost:3000/api/students/login",
      data: {
        ...userDetails,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.user.includes("admin")) {
          localStorage.setItem("admintoken", res.data.token);
          localStorage.setItem("id", res.data.id);
          toast.success("Admin Login Successfuly");
          navigate("/admin");
        } else {
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("usertoken", res.data.token);

          toast.success("User Login Successfuly");

          navigate("/user");
        }
      })
      .catch((err) => toast.error("Enter Valid Email Or Password"));
  };
  return (
    <AuthRedirector>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "45ch" },
          display: "flex",
          // flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: " 100vh",
          backgroundImage: `url(${attendancebackground})`,
          backgroundSize : "cover",
          backgroundRepeat : 'no-repeat'
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            height:  400,
            width: isXs ? '100%' :  400,
            backgroundColor: "whitesmoke",
            textAlign: "center",
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            borderRadius : 10,
          }}
        >
          <h3 style={{ color: "#1976d2", marginTop: 30, marginBottom: 30 }}>
            WELCOME BACK TO SMIT
          </h3>
          <TextField
            sx={{ marginBottom: 5, width: "350px" }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            git
            init
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <TextField
            sx={{ marginBottom: 5, width: "350px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="filled-basic"
            label="Password"
            variant="outlined"
          />
          <Button
            className={styles.loginBtn}
            onClick={Userlogin}
            variant="contained"
          >
            Login
          </Button>
        </Box>
      </Box>
    </AuthRedirector>
  );
}
