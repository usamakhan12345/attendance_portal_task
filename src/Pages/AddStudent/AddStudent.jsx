import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "./style.module.css";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";
import { useRef } from "react";
import UserImage from "../../assets/userimage.jpg";
import axios from 'axios'
import {toast} from 'react-toastify'

export default function TextFieldSizes() {
  const [firstName, setFirstName] = useState();
  const [lastName, setlastName] = useState();
  const [course, setCourse] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNum] = useState();
  const [Image, setImage] = useState();
  const [userImageFile, setUserImageFile] = useState();
  const[imageCloudUrl, setImageCloudUrl] = useState()

  const imageInputref = useRef(0);
  const userImage = useRef(0);

  const AddStudent = () => {
    const studentsDetails = {
      firstName,
      lastName,
      course,
      password,
      email,
      phoneNumber,
      Image : imageCloudUrl,
    };
    console.log(studentsDetails);
    const formData = new FormData();
    formData.append('file', userImageFile);

    axios({
      method: 'post',
    url: 'http://localhost:3000/api/upload',
    data: formData
    
  }).then((res)=>{
    console.log(res)
    console.log(res.data.url)
    setImageCloudUrl(res.data.url)
 
    toast.success("image upload succes")

    axios({
      method: 'post',
    url: 'http://localhost:3000/api/students/signup',
    data: {
      ...studentsDetails
    }
  }).then((res)=>{
    
    console.log(res)
    setFirstName("")
    setlastName("")
    setCourse("")
    setEmail("")
    setPassword("")
    setPhoneNum("")
    setImage("")
  }).catch(err => console.log(err))

  }).catch(err => console.log(err))
  

    
  
  };

  const uploadImage = () => {
    imageInputref.current.click();
  };

  const handleImageSet = (e) => {
    const file = e.target.files[0];
    setUserImageFile(file)
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <h3 className={styles.addStdHead}>Add Student</h3>
        </div>
        <div>
          <button onClick={AddStudent} className={styles.addBtn}>
            Add
          </button>
        </div>
      </Box>
      <Box
        sx={{
          height: 100,
          marginTop: 7,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: 7,
          position: "relative",
        }}
      >
        <div className={styles.imageBox}>
          <img
            className={styles.userImage}
            ref={userImage}
            src={Image ? Image : UserImage}
            alt=""
            width="100%"
            height="100%"
          />

          <div>
            <input
              ref={imageInputref}
              onChange={handleImageSet}
              type="file"
              className={`${styles.imageInput}`}
            />
            <FaCamera
              onClick={uploadImage}
              className={` ${styles.cameraIcon}`}
            />
          </div>
          {/* <FaCamera className={styles.cameraIcon} /> */}
        </div>
      </Box>

      <Box
        component="form"
        sx={{
          width: "100%", 
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            label="First Name"
            id="outlined-size-normal"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <TextField
            label="Last Name"
            id="outlined-size-normal"
            onChange={(e) => setlastName(e.target.value)}
            value={lastName}
          />
        </div>
        <div>
          <TextField
            label="Course"
            id="outlined-size-normal"
            onChange={(e) => setCourse(e.target.value)}
            value={course}
          />
          <TextField
            label="Password"
            id="outlined-size-normal"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <TextField
            label="Email"
            id="outlined-size-normal"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            label="Phone Number"
            id="outlined-size-normal"
            onChange={(e) => setPhoneNum(e.target.value)}
            value={phoneNumber}
          />
        </div>
      </Box>
    </>
  );
      
      }
