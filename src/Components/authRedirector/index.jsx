import React, { useEffect, useState } from 'react'
import { useNavigate , useLocation } from 'react-router-dom'

const AuthRedirector = ({children}) => {
    const [userToken, setUserToken] = useState()
    const [adminToken, setAdminToken] = useState()
    const redirect = useNavigate()
    const location = useLocation()
    useEffect(()=>{
     const userToken = localStorage.getItem('usertoken')
     const adminToken = localStorage.getItem('admintoken')
     console.log(adminToken)
     setUserToken(userToken)
     setAdminToken(adminToken)
    console.log("locationm----->",location.pathname)

    },[])
    const isAttendancePage = /^\/attendance\/\d+$/; 

    if (isAttendancePage.test(location.pathname)) {
        if (adminToken) {
            // Redirect to the admin attendance page
            redirect('/attendance' + location.pathname);
        } else {
            // Redirect to the home page if not an admin
            redirect('/');
        }
    }
     else if (location.pathname.includes('/user') && userToken) {
        redirect('/user');
    } else if (location.pathname === '/' && adminToken) {
        redirect('/admin');
    } else if (location.pathname === '/' && userToken) {
        redirect('/user');
    } else {
        redirect('/');
    }

    return children;
};
 


export default AuthRedirector