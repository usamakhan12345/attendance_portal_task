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
import { useGetStudentDataQuery, useGetSingleStudentQuery, useUpdateStudentDataMutation } from "../../Components/redux/slices/apiSlice"
import { students } from "../../Components/redux/slices/studentSlice"
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify'

const Adminportal = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [studentUpdatedData, setStudentUpdatedData] = useState()

  const redirect = useNavigate();
  const dispatch = useDispatch()
  const { data, error, isLoading } = useGetStudentDataQuery("allstudents")
  const allStudents = useSelector((state) => state.studentsData.students[0])
    console.log("data---> direct query",data)
  console.log(data)
  const [updateStudentData] = useUpdateStudentDataMutation()

  const updateStudent = async (id , studentDetails) => {
    console.log(id)
    console.log(studentDetails)
     const { data, error, isLoading } = await updateStudentData( {id , ...studentDetails })
    console.log(data.message)
    if(data){
      setOpenModal(!openModal)
      toast.success(data.message)
    }
    console.log(error)
    toast.error(error.message)

  }


  const CloseModal = () => {
    setOpenModal(!openModal);
    console.log("modal change")

  };
  useEffect(() => {
    if (data) {

      dispatch(students(data.allStudents))
    }
  }, [isLoading, data , openModal , updateStudent  , CloseModal])

  useEffect(() => {
    if (allStudents) {
      setStudentsData(allStudents)
    }
  }, [allStudents, data , openModal ])





  const editStudent = (item) => {
    console.log("edit student", item)
    setStudentUpdatedData(item)
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
          updateStudent={updateStudent}
          studentData={studentUpdatedData}
        />
        {/* <div className={styles.sideBar}>
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
        </div> */}
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
