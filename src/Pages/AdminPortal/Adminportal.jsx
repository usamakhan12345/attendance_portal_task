import React from "react";
import Portal from "../../Components/Portal/Portal";
import styles from "./style.module.css";
import { CiUser } from "react-icons/ci";
import { LuUserSquare } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import Table from '../../Components/Table/table'
import { useEffect , useState } from "react";
import axios from 'axios'
import Modal from "../../Components/Model/Modal"


const Adminportal = () => {
  const[studentsData ,setStudentsData] = useState()

    const redirect = useNavigate()

    useEffect(()=>{
      axios({
      method: 'get',
      url: 'http://localhost:3000/api/students/allstudents',
    
    }).then((res)=>{
        console.log(res)
      setStudentsData(res.data.allStudents)

      
    }).catch(err => console.log(err))

    },[])
    console.log(studentsData)

  return (
    <>
      {/* <Portal/> */}
      {/* <Modal open={true} handleOpen={handleOpen} handleClose={handleClose} /> */}
      <div className={styles.portalContainer}>
        <div className={styles.sideBar}>
          <h2 className={styles.sidebarHeading}>SMIT</h2>
          <ul
            style={{
              display: "flex",
              flexDirection: "column ",
            }}
          >
            <div >
              <li className={styles.listItem}>
                {" "}
                <CiUser
                  style={{ color: "#3D7CF3", fontWeight: "bold", fontSize: 30 }}
                />{" "}
                <span style={{fontWeight :'bold' , color:'#5C93FA' ,fontSize : 20}} >Students</span>
              </li>
            </div>
            <div>
              <li className={styles.listItem} onClick={()=> redirect('/attendance')}>
                {" "}
                <LuUserSquare
                  style={{ color: "#3D7CF3", fontWeight: "bold", fontSize: 30 }}
                />{" "}
                <span style={{fontWeight :'bold' , color:'#5C93FA' ,fontSize : 20}} >Attendance</span>

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

                <h3 style={{marginLeft : 10}}>Students</h3>
                </div>
                </div>
                <div style={{display: 'flex' , alignItems : 'center' , justifyContent : 'center'}}>
                    <button onClick={()=> redirect('/addStudent')} className={styles.addStudentBtn}> <FaPlusCircle/> Add Student</button>
                </div>
            </div>
            
            <div style={{marginTop : 20}}>
              <Table id ='ID' profileImage = 'Profile Img' Name= 'Name'  courseName =" Course Name" password = "Password"  
                 data={studentsData} />

            </div>

        </div>
      </div>
    </>
  );
};

export default Adminportal;
