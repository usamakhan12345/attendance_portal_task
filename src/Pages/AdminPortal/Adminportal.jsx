import React from "react";
import styles from "./style.module.css";
import { CiUser } from "react-icons/ci";
import { LuUserSquare } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import Table from "../../Components/Table/table";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../Components/Model/Modal";
import {useGetStudentDataQuery} from "../../Components/redux/slices/apiSlice"
import {students} from "../../Components/redux/slices/studentSlice"
import { useDispatch , useSelector } from "react-redux";

const Adminportal = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [course, setCourse] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNum] = useState("");

  const redirect = useNavigate();
  const dispatch = useDispatch()
  const{ data , error  , isLoading} = useGetStudentDataQuery("allstudents")
  const allStudents = useSelector((state)=> state.studentsData.students[0])
  console.log(allStudents)
  
useEffect(()=>{
    if(data){

      dispatch(students(data.allStudents))
    }
} , [isLoading , data])

useEffect(()=>{
    if(allStudents){
      setStudentsData(allStudents)
    }
},[allStudents , data])

  const CloseModal = () => {
    setOpenModal(!openModal);
  };

  const updateStudent = (id)=>{
    console.log(id)
    
   const stdDetails = {
    firstName,
    lastName,
    email,
    phoneNumber,
    course,
    password
   }
   console.log(stdDetails)
  }

  const editStudent = (id)=>{
    console.log("edit student" , id)
    setOpenModal(true)
  }

  const watchStdAttendance = (id) => {
    console.log("hello", id)
    redirect(`/attendance/${id}`);
  };

  return (
    <>
      <div className={styles.portalContainer}>
        <Modal
          open={openModal}
          handleClose={CloseModal}
          setFirstName={setFirstName}
          setlastName={setlastName}
          setCourse={setCourse}
          setPassword={setPassword}
          setEmail={setEmail}
          setPhoneNum={setPhoneNum}
          updateStudent={updateStudent}
        />
        <div className={styles.sideBar}>
          <h2 className={styles.sidebarHeading}>SMIT</h2>
          <ul
            style={{
              display: "flex",
              flexDirection: "column ",
            }}
          >
            <div>
              <li className={styles.listItem}>
                {" "}
                <CiUser
                  style={{ color: "#3D7CF3", fontWeight: "bold", fontSize: 30 }}
                />{" "}
                <span
                  style={{ fontWeight: "bold", color: "#5C93FA", fontSize: 20 }}
                >
                  Students
                </span>
              </li>
            </div>
            <div>
              <li
                className={styles.listItem}
                onClick={() => redirect("/attendance")}
              >
                {" "}
                <LuUserSquare
                  style={{ color: "#3D7CF3", fontWeight: "bold", fontSize: 30 }}
                />{" "}
                <span
                  style={{ fontWeight: "bold", color: "#5C93FA", fontSize: 20 }}
                >
                  Attendance
                </span>
              </li>
            </div>
          </ul>
        </div>
        <div className={styles.studentsData}>
          <div className={styles.portalHead}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaUser
                className={styles.stdIcon}
                style={{ fontWeight: "bold", fontSize: 30 }}
              />
              <div>
                <h3 style={{ marginLeft: 10, fontWeight: "bold" }}>Students</h3>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => redirect("/addStudent")}
                className={styles.addStudentBtn}
              >
                {" "}
                <FaPlusCircle /> Add Student
              </button>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <Table
              setOpenModal={setOpenModal}
              id="ID"
              profileImage="Profile Img"
              Name="Name"
              courseName=" Course Name"
              password="Password"
              email="Email"
              data={studentsData}
              editStudent={editStudent}
              watchStdAttendance={watchStdAttendance}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Adminportal;
