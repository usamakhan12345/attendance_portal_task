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
    
    if(location.pathname == '/' &&  adminToken){
        redirect('/admin')
        return  children

    
    }else if( location.pathname == '/' && userToken){ 
        redirect('/user')

        return children
    }else if (location.pathname.includes('/attendance/')  && adminToken){
        return children
    }
    else{
        // console.log("Admin login successfukly") 
        if(location.pathname !== '/' && (!adminToken && !userToken) || (location.pathname == '/user' && !userToken) ){
            redirect('/')
        }
        return children
        
    }
 
}

export default AuthRedirector