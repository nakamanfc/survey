import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import AdminBoxQuestion from '../../Components/AdminBoxQuestion'
import AdminBody from '../../Components/AdminBody'
import SurveyFoot from '../../Components/SurveyFoot'
import AdminHeader from '../../Components/AdminHeader'
import axios from 'axios'
import LoadingPage from '../SurveyPage/LoadingPage'

function AdminPage() {
  const[isQuestionManagement,setIsQuestionManagement] = useState(true)
  const[isLoadingQ, setIsLoadingQ] = useState(true)
  const[isLoadingU, setIsLoadingU] = useState(true)
  const[dbQuestion,setDbQuestion] = useState([])
  const[dbUser,setDbUser] = useState([])
  function clickToQuestionManagement(){
    setIsQuestionManagement(true)
  }
  function clickToUserManagement(){
    setIsQuestionManagement(false)
  }

  function checkActiveTime(){
    let time = new Date(localStorage.getItem('expiresAccess')) - new Date()
    if(time < 0){
      refreshNow()
    } else {
      setTimeout(() => {  refreshNow() }, time);
    }
  }

  function refreshNow() {
    refreshTokenProcess()
    setTimeout(() => {  refreshToken() }, 180000);
  }

  function refreshToken() {
    loop()
  }

  function loop(){
    refreshTokenProcess()
    setTimeout(() => {  refreshToken() }, 180000);
  }

  async function refreshTokenProcess(){
    await axios.post(`https://fwa-ec-quiz.herokuapp.com/v1/auth/refresh-tokens`, {
      refreshToken: `${localStorage.getItem('tokenRefresh')}`
    })
    .then(function (response) {
      localStorage.setItem('tokenAccess',`${response.data.access.token}`)
      localStorage.setItem('expiresAccess',`${response.data.access.expires}`)
      localStorage.setItem('tokenRefresh',`${response.data.refresh.token}`)
      localStorage.setItem('expiresRefresh',`${response.data.refresh.expires}`)

      console.log(localStorage.getItem('expiresAccess'))
      console.log(localStorage.getItem('tokenRefresh'))
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log('done refresh token')
  }

  function loopGetDbQuestion(){
    getDbQuestion()
  }

  function loopGetDbUser(){
    getDbUser()
  }

  async function getDbQuestion(){
    await axios.get(`https://fwa-ec-quiz.herokuapp.com/v1/questions/edit`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('tokenAccess')}`
        }
    })
    .then((res) => {
        setDbQuestion(res.data)
        setIsLoadingQ(false)
      })
    .catch((err) => {
        loopGetDbQuestion()
        console.log(err)
    })
  }

  async function getDbUser(){
    await axios.get(`https://fwa-ec-quiz.herokuapp.com/v1/users/`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('tokenAccess')}`
        }
    })
    .then((res) => {
        setDbUser(res.data)
        setIsLoadingU(false)
      })
    .catch((err) => {
        loopGetDbUser()
        console.log(err)
    })
  }

  function getData(){
    setIsLoadingU(true)
    setIsLoadingQ(true)
    checkActiveTime()
    getDbQuestion()
    getDbUser()
  }

  
  
  useEffect(() => {
    getData()
  
    return () => {
      
    }
  }, [])
  
  return (
      <>
        {
            isLoadingQ&&isLoadingU?(
                <LoadingPage/>
            ):(
                <Box sx={{background:'#F6F7FB'}}>
                    <AdminHeader 
                    clickToQuestionManagement={clickToQuestionManagement} clickToUserManagement={clickToUserManagement}
                    isQuestionManagement={isQuestionManagement}
                    />
                    <AdminBody dbQuestion={dbQuestion} dbUser={dbUser} isQuestionManagement={isQuestionManagement}/>
                    <SurveyFoot/>
                </Box>
            )
        }
      </>
  )
}

export default AdminPage