import { Box, Button, Grid, Paper } from '@mui/material'
import React, { useState, useEffect } from 'react'
import LoadingPage from '../Page/SurveyPage/LoadingPage'
import SurveyQuestion from './SurveyQuestion'

function IconAnswer(props){
    return(
      <Box sx={{
        width:30,
        height:30,
        display:'flex',
        fontWeight:600,
        alignItems:'center',
        borderRadius:'100%',
        justifyContent:'center',
        border:props.active?'2px solid white':'2px solid #404A65',
        marginLeft:3,
        marginRight:2,
        color: props.active?'white':'black'
      }}>
        {props.children}
      </Box>
    )
  }
  
  function ContentAnswer(props){
    return(
      <Box sx={{
        fontSize:16,
        color:props.active?'white':'#AAAAB3'
      }}>
        {props.children}
    </Box>
    )
  }

function ButtonAnswer(props){
  const [colorAnwser,setColorAnwser] = useState()
  const [answer, setAnwser] = useState()
  const active=(props.i == answer ? colorAnwser : '')
  useEffect(() => {
    setColorAnwser(props.db.result ? 'green' : props.db.result == false ? 'red' : '')
    setAnwser(props.db.answer ? props.db.answer : false)
    console.log(props.db.answer ? props.db.answer : false)
    return () => {
      
    }
  }, [])
  
    return(
      <Box sx={{
        flex:1,
        borderBottom:'2px solid #F2F4F9',
        alignItems:'center',
        display:'flex',
        background: active == 'red' ? '#D9114D':(active == 'green' ? '#66BB6A':'white'),
    }}
        >
        <IconAnswer active={active}>{props.name}</IconAnswer><ContentAnswer active={active}>{props.children}</ContentAnswer>
      </Box>
    )
  }

function SurveyFinish(props) {
  const [loadingToFinish, setLoadingToFinish] = useState(false)

  function loading(){
    setLoadingToFinish(true)
    setTimeout(() => {  setLoadingToFinish(false); }, 2000);
  }

  useEffect(() => {
    loading()
    return () => {
      
    }
  }, [])
  
  return(
    <Box sx={{
      display: 'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
    }}>
      {
        loadingToFinish?
        <LoadingPage/>:
        <>
          {props.dbQuestion.map((item,i) => (<AnwserFinishh db={item} i={i}/>))}
        </>
      }
    </Box>
  )
}


function AnwserFinishh(props) {

  return (
    <Box sx={{
        width:'80%',
        maxWidth:'500px',
        height:'350px',
        display: 'block',
        background:'#F6F7FB',
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:'110px'
      }}
      elevation={1}
      >
      <Box sx={{display: 'block'}}>
        <SurveyQuestion>
          {props.db.question}
        </SurveyQuestion>
        <Box sx={{fontWeight:500, fontSize:'12px', color:'#1976D2'}}>
          Question {props.i + 1}
        </Box>
        <Box sx={{width:550, height:280, border:'2px solid #F2F4F9', borderRadius:'2px', background:'white', display:'flex', marginTop:'30px', marginBottom:'30px',flexDirection:'column'}}>
          <ButtonAnswer db={props.db} i='answer1' name='A'>{props.db.answer1}</ButtonAnswer>
          <ButtonAnswer db={props.db} i='answer2' name='B'>{props.db.answer2}</ButtonAnswer>
          <ButtonAnswer db={props.db} i='answer3' name='C'>{props.db.answer3}</ButtonAnswer>
          <ButtonAnswer db={props.db} i='answer4' name='D'>{props.db.answer4}</ButtonAnswer>
        </Box>
      </Box>
    </Box>
  )
}

export default SurveyFinish