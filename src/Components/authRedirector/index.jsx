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
     setUserToken(userToken)
     setAdminToken(adminToken)
    }, [location.pathname])
    if(location.pathname === '/admin' && adminToken){
        return children
    }
    if(location.pathname === '/user' && userToken){ 
        return children
    }else{
        redirect('/')
    }
 
}

export default AuthRedirector