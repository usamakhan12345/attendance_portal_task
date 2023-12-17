import React from 'react';
import styles from './style.module.css'
import { FaEdit } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";


const DynamicTable = ({  data ,  id , profileImage , Name ,courseName , password , checkinTime , checkoutTime}) => {
    console.log(data)
    const EditUser = ()=>{
      const id = localStorage.getItem('id')
      
    }
  return (
    <table style={{width : '100%' }}>
      <thead className={styles.tableHead}>
        <tr className={styles.tableHead}>
          <th>{id}</th>
          <th>{profileImage}</th>
          <th>{Name}</th>
          <th>{courseName ?? checkinTime}</th>
          <th>{password ?? checkoutTime}</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((item ,index) => (
          <tr key={index}>
            <td>{index+1}</td>
            <td>
              <img src={item?.Image} alt="Profile" style={{ width: '50px', height: '40px'  , borderRadius : '50%'}} />
            </td>
            <td>{item?.firstName}</td>
            <td>{item?.course}</td>
            <td><input type='password' value={item?.password}  className={styles.passInp} style={{background : 'none' , border : 'none'}} /></td>
            <td><FaEdit onClick={EditUser} style={{cursor: 'pointer'}} /></td>
            <td><IoEyeSharp/></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
