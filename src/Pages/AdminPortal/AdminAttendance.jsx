import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import { useGetStudentAttendanceQuery } from "../../Components/redux/slices/apiSlice";
import AuthRedirector from "../../Components/authRedirector";


const Adminportal = () => {
  const [stdAttendance, setStdAttendance] = useState();
  const [stdImage, setStdImage] = useState();
  const [stdName, setStdName] = useState();
  const redirect = useNavigate();
  const { id } = useParams();

  const { data, error, isLoading } = useGetStudentAttendanceQuery(id);

  useEffect(() => {
    if (data) {
      setStdAttendance(data?.stdAttendance);

    }
    console.log(error);
  }, [id, data]);

  const watchStdAttendance = () => {
    console.log("hello");
    redirect("/attendance");
  };
  return (
    <>
        <div className={styles.portalContainer}>
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
                <h3 className={styles.adminPortalHead}>ADMIN PORTAL</h3>
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
            </div>
          </div>
        </div>
    </>
  );
};

export default Adminportal;
