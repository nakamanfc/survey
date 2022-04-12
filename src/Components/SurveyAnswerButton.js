import { Box, Button, Grid, Paper } from '@mui/material'
import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'

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
      border:(props.active ? '2px solid white':'2px solid #404A65'),
      marginLeft:3,
      marginRight:2,
      color:(props.active ? 'white':'black')
    }}>
      {props.children}
    </Box>
  )
}

function ContentAnswer(props){
  return(
    <Box sx={{
      fontSize:16,
      color:(props.active ? 'white':'#AAAAB3')
    }}>
      {props.children}
  </Box>
  )
}

function ButtonAnswer(props){

  function ClickButtonAnswer(){
    props.onClick(props.order)
    console.log('click to', props.order)
  }

  return(
    <Box sx={{
      flex:1,
      borderBottom:'2px solid #F2F4F9',
      alignItems:'center',
      display:'flex',
      background:(props.order == props.chooseAnswer || props.order == props.activeButton ? ('#1976D2'):('#white')),
      '&:hover': {
        backgroundColor: (props.order == props.chooseAnswer || props.order == props.activeButton ? '#1976D2':'#F7F8FB'),
        cursor:'pointer'
      }}}
      onClick={ClickButtonAnswer}
      >
      <IconAnswer active={props.order == props.chooseAnswer || props.order == props.activeButton}>{props.name}</IconAnswer><ContentAnswer active={props.order == props.chooseAnswer || props.order == props.activeButton}>{props.children}</ContentAnswer>
    </Box>
  )
}

function SurveyAnswerButton(props) {
  const [activeButton, setActiveButton] = useState('');
  function ClickButtonAnswer(order){
    // props.submitQuestion(order)
    setActiveButton(order)
    props.setOrder(order)
  }
  useEffect(() => {
    props.setOrder('')
    setActiveButton('')
  
    return () => {
      
    }
  }, [props.question])
  

  return (
    <Box sx={{width:550, height:280, border:'2px solid #F2F4F9', borderRadius:'2px', background:'white', display:'flex', marginTop:'30px', marginBottom:'30px',flexDirection:'column'}}>
      <ButtonAnswer order='answer1' name='A' activeButton={activeButton} chooseAnswer={props.question.answer} onClick={ClickButtonAnswer}>{props.question.answer1}</ButtonAnswer>
      <ButtonAnswer order='answer2' name='B' activeButton={activeButton} chooseAnswer={props.question.answer} onClick={ClickButtonAnswer}>{props.question.answer2}</ButtonAnswer>
      <ButtonAnswer order='answer3' name='C' activeButton={activeButton} chooseAnswer={props.question.answer} onClick={ClickButtonAnswer}>{props.question.answer3}</ButtonAnswer>
      <ButtonAnswer order='answer4' name='D' activeButton={activeButton} chooseAnswer={props.question.answer} onClick={ClickButtonAnswer}>{props.question.answer4}</ButtonAnswer>
    </Box>

  )
}

export default SurveyAnswerButton