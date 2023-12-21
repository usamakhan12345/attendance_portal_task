import React, { useState , useEffect } from "react";
// import Portal from "../../Components/Portal/Portal";
import styles from "./style.module.css";
import { CiUser } from "react-icons/ci";
import { LuUserSquare } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import DataTable from "../../Components/MTable/Table";
import axios from "axios";
import Table from "../../Components/Table/table";
import { useParams } from 'react-router-dom';



const Adminportal = () => {
  const[stdAttendance,setStdAttendance] = useState()
  const redirect = useNavigate();
  const { id } = useParams();
  console.log(id)

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3000/api/attendance/studentattendance/${id}`,
    })
      .then((res) => {
        console.log(res.data.student);
        setStdAttendance(res.data.student);
      })
      .catch((err) => console.log(err));
  }, [id]);



  const watchStdAttendance = () => {
    console.log("hello")
    redirect("/attendance");
  };
  return (
    <>
      {/* <Portal/> */}
      <div className={styles.portalContainer}>
        <div className={styles.sideBar}>
          <h2 className={styles.sidebarHeading}>SMIT</h2>
          <ul
            style={{
              display: "flex",
              flexDirection: "column ",
            }}
          >
            <div>
              <li
                className={styles.listItem}
                onClick={() => redirect("/admin")}
              >
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
              <li className={styles.listItem}>
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
            <div style={{ display: "flex" }}>
              <FaUser
                className={styles.stdIcon}
                style={{ fontWeight: "bold", fontSize: 30 }}
              />
              <div>
                <h3 style={{ marginLeft: 10 }}>Attendance</h3>
              </div>
            </div>
            <div>
              <h3 className={styles.adminPortalHead}>Admin Portal</h3>
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
              id="ID"
              profileImage="Profile Img"
              Name="Name"
              checkinTime="Checked In Time"
              checkoutTime="Checked out Time"
              watchStdAttendance={watchStdAttendance}
              data={stdAttendance}
            />  
            {/* <DataTable /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Adminportal;
