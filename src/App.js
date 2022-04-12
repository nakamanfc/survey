import {   Routes, Route,} from 'react-router-dom';
import LoginPage from './Page/LoginPage/LoginPage';
import SurveyPage from './Page/SurveyPage/SurveyPage';
import React, { useState, useEffect } from 'react'
import AdminPage from './Page/AdminPage/AdminPage';

function App() {

  


  // console.log(new Date('2022-04-06T10:28:53.373Z') -  new Date());
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
