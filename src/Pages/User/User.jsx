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
import moment from "moment";




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
  const[studentData, setStudentData] = useState()
  const[checkin,setCheckIn] = useState(false)
  const[lastCheckInTime,setLastCheckInTime] = useState()

  const imageInputref = useRef(0);
  const userimage = useRef(0);
  const StudentId = localStorage.getItem("id")
  React.useEffect(()=>{
      const id = localStorage.getItem('id')
      if(id){
        axios({
          method: 'get',
          url: `http://localhost:3000/api/students/getstudent/${id}`,
          
        }).then((res)=>{
          console.log(res.data.studentData)
          setStudentData(res.data.studentData)
          setFirstName(res.data.studentData.firstName)
          setlastName(res.data.studentData.lastName)
          setCourse(res.data.studentData.course)
          setEmail(res.data.studentData.email)
          setPassword(res.data.studentData.password)
          setPhoneNum(res.data.studentData.phoneNumber)
          
        }).catch(err => console.log(err.response))
      }
      const usercheckin = localStorage.getItem("usercheckin")
      console.log(usercheckin)
      if(usercheckin){
        console.log(usercheckin)
        setLastCheckInTime(usercheckin)
        setCheckIn(true)
      }

  }, [lastCheckInTime])

  const ButtonDisableHandler = ()=>{
    // if(!lastCheckInTime){
    //   return false
    // }
    const currTime = new Date().getTime()
    console.log(currTime)
    console.log(lastCheckInTime)
    const difference = currTime - lastCheckInTime
    console.log(difference)
    const hoursDiff = difference / (100 * 60 * 60)
    console.log(hoursDiff)

    if(hoursDiff < 22){
      return true
      
    }else{
      // localStorage.removeItem("usercheckin")

      return false
    }

  }

  const UserChecked = ()=>{
    axios
    .post('http://localhost:3000/api/attendance/checkedIn', {
      student: StudentId,
      location: 'SMIT',
      checktype : checkin ? "checkout" : "checkin"
    })
    .then((res)=>{
      console.log(res)
      console.log(res.data.message.includes("check in"))
      if(res.data.message.includes("check in")){
        setCheckIn(true)
        // localStorage.setItem("usercheckin" , new Date().getTime())
      }else{
        localStorage.setItem("usercheckin" , new Date().getTime())
        console.log("test21")
        setCheckIn(false)

      }
      console.log(checkin)
    }).catch((error)=>{
      console.log(error)
    })
  }
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

  console.log(ButtonDisableHandler())
  return (
    <>
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <h3 className={styles.addStdHead}>{`${firstName}  ${lastName}`}</h3>
        </div>
        <div>
        <h5 className={styles.addStdHead}>LogOut</h5>

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
            ref={userimage}
            src={studentData ? studentData.Image : UserImage}
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
        // component="form"
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
            id="outlined-size-normal"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            defaultValue={studentData?.firstName}
            disabled={true}
          />
          <TextField
            // label="Last Name"
            placeholder="LastName"
            id="outlined-size-normal"
            onChange={(e) => setlastName(e.target.value)}
            value={lastName}
            defaultValue={studentData?.lastName}
            disabled={true}

          />
        </div>
        <div>
          <TextField
           placeholder="Course"
            id="outlined-size-normal"
            onChange={(e) => setCourse(e.target.value)}
            value={course}
            defaultValue={studentData?.course}
            disabled={true}

          />
          <TextField
            placeholder="Password"
            id="outlined-size-normal"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            defaultValue={studentData?.password}
            disabled={true}

          />
        </div>
        <div>
          <TextField
            placeholder="Email"
            id="outlined-size-normal"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            defaultValue={studentData?.email}
            disabled={true}


          />
          <TextField
            placeholder="Phone Number"
            id="outlined-size-normal"
            onChange={(e) => setPhoneNum(e.target.value)}
            value={phoneNumber}
            defaultValue={studentData?.phoneNumber}
            disabled={true}

          />
        </div>
        <button disabled={ButtonDisableHandler()} onClick={UserChecked} className={styles.checkinBtn}>{ checkin ? " Checked Out" : "Checked In"}</button>
      </Box>
    </>
  );
      
      }
