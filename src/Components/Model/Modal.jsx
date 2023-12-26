import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import styles from "../../Pages/AddStudent/style.module.css";
import ModalStyles from "./style.module.css";
import TextField from "@mui/material/TextField";
import { FaUser } from "react-icons/fa";


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
  setFirstName,
  setlastName,
  setCourse,
  setPassword,
  setEmail,
  setPhoneNum,
  updateStudent,
}) {
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
                onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
                // className={styles.textfield}
              />
              <TextField
                label="Last Name"
                id="outlined-size-normal"
                onChange={(e) => setlastName(e.target.value)}
                // value={lastName}
                md={12}
              />
            </div>
            <div className={styles.inputContainer}>
              <TextField
                label="Course"
                id="outlined-size-normal"
                onChange={(e) => setCourse(e.target.value)}
                // value={course}
              />
              <TextField
                label="Password"
                id="outlined-size-normal"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                // value={password}
              />
            </div>
            <div className={styles.inputContainer}>
              <TextField
                label="Email"
                id="outlined-size-normal"
                onChange={(e) => setEmail(e.target.value)}
                // value={email}
              />
              <TextField
                label="Phone Number"
                id="outlined-size-normal"
                onChange={(e) => setPhoneNum(e.target.value)}
                // value={phoneNumber}
              />
            </div>
            <Button
              onClick={() => updateStudent(4)}
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
