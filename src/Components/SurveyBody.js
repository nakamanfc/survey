import { Box, Button, CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Paper } from '@mui/material'
import SurveyQuestion from './SurveyQuestion'
import SurveyNavigationButton from './SurveyNavigationButton'
import SurveyAnswerButton from './SurveyAnswerButton'
import SurveyFinish from './SurveyFinish'
import LoadingPage from '../Page/SurveyPage/LoadingPage'

function SurveyBody(props) {
  const [order,setOrder] = useState('')
  const [disabledSubmit, setDisabledSubmit] = useState(false)
  function submitQuestion(){
    if(order != ''){
      props.submitQuestion(order)
      setDisabledSubmit(true)
    }
  }

  function activeSubmitButton(answer){
    return (
      answer == 'answer1' ||
      answer == 'answer2' ||
      answer == 'answer3' ||
      answer == 'answer4'
    )
  }

  useEffect(() => {
    setDisabledSubmit(false)
  
    return () => {
      
    }
  }, [props.question])
  

  return (
    <Box sx={{
      width:'100%', 
      height:'auto',
      background:'#F6F7FB',
      display: 'flex',
      alignItems:'center',
      justifyContent:'center'
    }}>
        {
          props.isFinishSurvey ?
          <SurveyFinish dbQuestion={props.dbQuestion}/>
          :
          <Box sx={{
            width:'80%',
            maxWidth:'500px',
            height:'570px',
            display: 'block',
            background:'#F6F7FB',
            display: 'flex',
            alignItems:'center',
            justifyContent:'center',
          }}
          elevation={1}
          >
            <Box sx={{display: 'block'}}>
              <SurveyQuestion>
                {props.question.question}
              </SurveyQuestion>
              <Box sx={{fontWeight:500, fontSize:'12px', color:'#1976D2'}}>
                Question {props.numQuestion}
              </Box>
              <SurveyAnswerButton question={props.question} submitQuestion={props.submitQuestion} setOrder={setOrder}/>
              <SurveyNavigationButton lastQuestion={props.numQuestion == props.sizeQuestion} submitActive={activeSubmitButton(props.question.answer) || disabledSubmit} nextQuestion={props.nextQuestion} submitQuestion={submitQuestion} backQuestion={props.backQuestion}/>
            </Box>
          </Box>
        }
    </Box>
  )
}

export default SurveyBody