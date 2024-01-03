import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { FaEdit } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const DynamicTable = ({
  data,
  id,
  profileImage,
  Name,
  courseName,
  password,
  checkinTime,
  checkoutTime,
  email,
  editStudent,
  watchStdAttendance,
}) => {
  const [stdData, setStdData] = useState();
  const [stdCheckIn, setStdCheckIn] = useState([]);
  const [stdImage, setStdImage] = useState([]);
  const [stdName, setName] = useState([]);
  useEffect(() => {
    setStdData(data);
  }, [data]);
  useEffect(() => {
    if (data) {
      setStdCheckIn(data?.checkInTime);
      setName(`${data?.student?.firstName}` + " " + `${data?.student?.lastName}`);
      setStdImage(data?.student?.Image);
    }
  }, [data]);
  return (
    <table style={{ width: "100%"  , tableLayout : 'auto', borderCollapse : 'collapse'}}>
      <thead className={styles.tableHead}>
        <tr className={styles.tableHead}>
          <th>{id}</th>
          <th>{profileImage}</th>
          <th>{Name}</th>
          <th>{courseName ?? checkinTime}</th>
          <th>{password ?? checkoutTime}</th>
          {email && <th>{email ?? null}</th>}
          {email && <th> Edit </th>}
          {email && <th> Watch </th>}
       

        </tr>
      </thead>
      <tbody>
        {data?.checkInTime
          ? data?.checkInTime.map((item, index) => (
              <tr key={index}>
                {console.log(item)}
                <td>{index + 1}</td>
                <td style={{ textAlign: "center" }}>
                  <img
                    src={stdImage}
                    alt="Profile"
                    style={{
                      width: "50px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </td>
                <td>{stdName}</td>
                <td>{item}</td>
                <td>{data?.checkOutTime[index]}</td>  
                <td>{item?.email ?? ""}</td>
              </tr>
            ))
          : data &&
            data.length > 0 &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td style={{ textAlign: "center" }}>
                  <img
                    src={item?.Image}
                    alt="Profile"
                    style={{
                      width: "50px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </td>
                <td>{item?.firstName}</td>
                <td>{item?.course}</td>
                <td>
                  <input
                    type="password"
                    value={item?.password}
                    className={styles.passInp}
                    style={{ background: "none", border: "none" }}
                  />
                </td>
                <td>{item?.email ?? ""}</td>
                <td style={{ textAlign: "center" }}>
                  <FaEdit
                    onClick={() => editStudent(item)}
                    className={styles.editIcon}
                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  <FaEye
                    onClick={() => watchStdAttendance(item._id )}
                    className={styles.eyeIcon}
                  />
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
