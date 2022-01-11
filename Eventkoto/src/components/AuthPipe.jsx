import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { FireAuth } from '../libs/firebase/auth';

function AuthPipe({whileCheckingIfLoggedIn , beforeLoggedIn, afterLoggedIn}) {
  
  let [auth, setAuth] = useState(true)
  let [loaded, setLoaded] = useState(false)

  useEffect(() => {
    FireAuth.hookAccount((e) => {
      if (e){
        //console.log(e)
        //console.log(e.emailVerified)
      }
      setLoaded(true)
      setAuth(e)
    })
  }, [])

  return (
    <Routes>
      {
        loaded ? 
          auth ? 
            afterLoggedIn
            :
            beforeLoggedIn
          :
          whileCheckingIfLoggedIn
      }
      
    </Routes>
  )
}

AuthPipe.propTypes = {
    children: propTypes.any,
};

export default AuthPipe
