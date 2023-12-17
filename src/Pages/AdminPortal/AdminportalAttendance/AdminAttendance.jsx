import React from "react";
// import Portal from "../../Components/Portal/Portal";
import styles from "../style.module.css";
import { CiUser } from "react-icons/ci";
import { LuUserSquare } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import Table from '../../../Components/Table/table'


const Adminportal = () => {
    const redirect = useNavigate()
    const dynamicData = [
        { id: 1, profileImage: 'path/to/image1.jpg', name: 'John Doe', courseName: 'React', password: '*********' },
        { id: 2, profileImage: 'path/to/image2.jpg', name: 'Jane Doe', courseName: 'Node.js', password: '*********' },
        // Add more data as needed
      ];
  return (
    <>
      {/* <Portal/> */}
      <div className={styles.portalContainer}>
        <div className={styles.sideBar}>
          <h3 className={styles.sidebarHeading}>Saylani</h3>
          <ul
            style={{
              display: "flex",
              flexDirection: "column ",
            }}
          >
            <div>
              <li className={styles.listItem} onClick={()=> redirect('/admin')}>
                {" "}
                <CiUser
                  style={{ color: "#3D7CF3", fontWeight: "bold", fontSize: 30 }}
                />{" "}
                Students
              </li>
            </div>
            <div>
              <li className={styles.listItem} >
                {" "}
                <LuUserSquare
                  style={{ color: "#3D7CF3", fontWeight: "bold", fontSize: 30 }}
                />{" "}
                Attendance
              </li>
            </div>
          </ul>
        </div>
        <div className={styles.studentsData}>
            
            <div className={styles.portalHead}>
                <div  style={{display : "flex" , }}>
                <FaUser
              className={styles.stdIcon}
                  style={{  fontWeight: "bold", fontSize: 30 }}
                />
                <div>

                <h3 style={{marginLeft : 10}}>Attendance</h3>
                </div>
                </div>
                <div style={{display: 'flex' , alignItems : 'center' , justifyContent : 'center'}}>
                    <button onClick={()=> redirect('/addStudent')} className={styles.addStudentBtn}> <FaPlusCircle/> Add Student</button>
                </div>
            </div>
            
            <div style={{marginTop : 20}}>
                <Table id ='ID' profileImage = 'Profile Img' Name= 'Name'  checkinTime = "Checked In Time"  checkoutTime = "Checked out Time"  data ={dynamicData} />

            </div>
 
        </div>
      </div>
    </>
  );
};

export default Adminportal;