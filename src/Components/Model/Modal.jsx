import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import styles from "../../Pages/AddStudent/style.module.css";
import ModalStyles from "./style.module.css";
import TextField from "@mui/material/TextField";
import { FaUser } from "react-icons/fa";
import {  useMediaQuery } from '@mui/material';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderColor: "white",
  // overflowY: "scroll",
  border : '10px solid #3498db ', 
  height: 550,
};

export default function BasicModal({
  open,
  handleClose,
    updateStudent,
  studentData
}) {
  console.log(studentData)
  const[stdFirsttName,setStdFirstName] = React.useState()
  const[stdLastName, setStdLastName] = React.useState()
  const[stdEmail, setStdEmail] = React.useState()
  const[stdCourse, setStdCourse] = React.useState()
  const[stdPassword, setStdPassword] = React.useState()
  const[stdPhoneNumber, setStdPhoneNumber] = React.useState()

    React.useEffect(()=>{
      setStdFirstName(studentData?.firstName)
      setStdLastName(studentData?.lastName)
      setStdEmail(studentData?.email)
      setStdCourse(studentData?.course)
      setStdPassword(studentData?.password)
      setStdPhoneNumber(studentData?.phoneNumber)

    },[studentData , open ])
    console.log(stdFirsttName)

    const studentDetails ={
      firstName : stdFirsttName,
       lastName : stdLastName ,
       email : stdEmail, 
       phoneNumber : stdPhoneNumber ,
       course : stdCourse,
       password : stdPassword
    }
const handleUpdateStudent = ()=>{
  updateStudent(studentData._id, studentDetails)

}
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={ModalStyles.headContainer}>
            <div>
              <FaUser
                className={styles.stdIcon}
                style={{ fontWeight: "bold", fontSize: 40 , color : "#3498db" }}
              />
            </div>
            <div>
              <h3 className={ModalStyles.updateHead}>Update Student</h3>
            </div>
          </div>
          <Box
            component="form"
            sx={{
              style,
              width: "100%",
              "& .MuiTextField-root": { m: 1, width: "30ch" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            noValidate
            autoComplete="off"
          >
            <div className={styles.inputContainer}>
              <TextField
                label="First Name"
                id="outlined-size-normal"
                onChange={(e) => setStdFirstName(e.target.value)}
                defaultValue={studentData?.firstName || ""}
                // className={styles.textfield}
                value={stdFirsttName}
              />
              <TextField
                label="Last Name"
                id="outlined-size-normal"
                onChange={(e) => setStdLastName(e.target.value)}
                value={stdLastName}
                md={12}
              />
            </div>
            <div className={styles.inputContainer}>
              <TextField
                label="Course"
                id="outlined-size-normal"
                onChange={(e) => setStdCourse(e.target.value)}
                value={stdCourse}

              />
              <TextField
                label="Password"
                id="outlined-size-normal"
                type="password"
                onChange={(e) => setStdPassword(e.target.value)}
                value={stdPassword}

              />
            </div>
            <div className={styles.inputContainer}>
              <TextField
                label="Email"
                id="outlined-size-normal"
                onChange={(e) => setStdEmail(e.target.value)}
                value={stdEmail}

              />
              <TextField
                label="Phone Number"
                id="outlined-size-normal"
                onChange={(e) => setStdPhoneNumber(e.target.value)}
                value={stdPhoneNumber}

                

              />
            </div>
            <Button
              onClick={handleUpdateStudent}
              className={ModalStyles.updateBtn}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
