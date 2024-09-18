import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function logout() {
    const navigate = useNavigate(); 
    useEffect(() => {
        localStorage.setItem('isAuthenticated', 'false');
        navigate('/login');
      });
  return (
    <>
    </>
  )
}

export default logout