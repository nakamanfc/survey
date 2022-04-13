import {   Routes, Route,} from 'react-router-dom';
import LoginPage from './Page/LoginPage/LoginPage';
import SurveyPage from './Page/SurveyPage/SurveyPage';
import React, { useState, useEffect } from 'react'
import AdminPage from './Page/AdminPage/AdminPage';
import { useNavigate } from 'react-router-dom';

function App() {
  let navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem('role') == 'user'){
      navigate('/survey')
    } else if(localStorage.getItem('role') == 'admin'){
      navigate('/admin')
    }
  
    return () => {
      
    }
  }, [])
  
  return (
    <>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/survey' element={<SurveyPage/>}/>
      <Route path='/admin' element={<AdminPage/>}/>
    </Routes>
    </>
  );
}

export default App;
