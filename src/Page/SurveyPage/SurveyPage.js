import { Box, Button, Container } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import SurveyBody from '../../Components/SurveyBody'
import SurveyFoot from '../../Components/SurveyFoot'
import SurveyHeader from '../../Components/SurveyHeader'
import LoadingPage from './LoadingPage'

function SurveyPage() {
  const [dbQuestion, setDbQuestion] = useState([])
  const [numQuestion,setNumQuestion] = useState(1);
  const [sizeQuestion, setSizeQuestion] = useState(10);
  const [question, setQuestion] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [isFinishSurvey,setIsFinishSurvey] = useState(false);

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

  function nextQuestion(){
    if(numQuestion < sizeQuestion){
      setNumQuestion(numQuestion + 1)
      setQuestion(dbQuestion[numQuestion])
    } else {
      setIsFinishSurvey(true)
    }
  }
  function backQuestion(){
    if(numQuestion > 1){
      setNumQuestion(numQuestion - 1)
      setQuestion(dbQuestion[numQuestion - 2])
    }
  }
  function submitQuestion(chooseAnswer){
    let newQuestion = dbQuestion
    newQuestion[numQuestion - 1].answer = chooseAnswer
    setDbQuestion(newQuestion)
    
    axios.post('https://fwa-ec-quiz.herokuapp.com/v1/questions/submit',
    [{
      id: `${question.id}`,
      correctanswer: `${question[`${chooseAnswer}`]}`
    }],
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('tokenAccess')}`
      }
    })
    .then((res) => {
      // console.log(res.data[0].result)
      newQuestion[numQuestion - 1].result = res.data[0].result
      setDbQuestion(newQuestion)
      console.log(newQuestion[numQuestion - 1])
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  function loopQuestion(){
    getQuestion()
  }

  async function getQuestion(){
    console.log('getQuestion')
    await axios.get('https://fwa-ec-quiz.herokuapp.com/v1/questions/',{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('tokenAccess')}`
      }
    })
    .then((res) => {
      setDbQuestion(res.data.results)
      setSizeQuestion(res.data.results.length)
      setQuestion(res.data.results[0])
      setLoadingPage(false)
    })
    .catch((err) => {
      loopQuestion()
      console.log(err)
    })
  }

  function getData(){
    setLoadingPage(true)
    checkActiveTime()
    getQuestion()
  }

  useEffect(() => {
    getData()
  
    return () => {
    }
  }, [])
  

  return (
    <>
    {
      loadingPage ?
      <LoadingPage/>
      :
      <>
        <SurveyHeader numQuestion={numQuestion} sizeQuestion={sizeQuestion} dbQuestion={dbQuestion}/>
        <SurveyBody
          dbQuestion={dbQuestion} sizeQuestion={sizeQuestion}
          question={question} numQuestion={numQuestion}
          nextQuestion={nextQuestion} backQuestion={backQuestion}
          submitQuestion={submitQuestion} isFinishSurvey={isFinishSurvey}
        />
        <SurveyFoot/>
      </>
    }
    </>
  )
}

export default SurveyPage
