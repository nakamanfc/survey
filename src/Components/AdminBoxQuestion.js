import { Typography, Box, Radio, TextField, RadioGroup, Button, IconButton, Paper, CircularProgress } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import styled from "@emotion/styled"
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const listAnswer = [
  'answer1',
  'answer2',
  'answer3',
  'answer4'
]

const MyInput = styled('input')({
  width: 'auto',
  height: 40,
  border: 'none',
  outline: 'none',
  paddingInline: '10px',
  borderRadius: '4px',
})

function Answer(props){
  const [editAnswer,setEditAnswer] = useState(false)
  const [contentAnswer, setContentAnswer] = useState(props.children)
  function handleEdit(){
    setEditAnswer(true)
  }
  function handleSubmit(){
    let clonListContentAnswer = props.listContentAnswer
    clonListContentAnswer[props.name] = contentAnswer
    props.setListContentAnswer(clonListContentAnswer)
    setEditAnswer(false)
  }
  function clickToRadio(){
    props.setTrueAnswer(props.i)
  }
  return (
    <Box sx={{
      display:'flex', alignItems:'center',
      width:'400px',
    }}>
      <Box sx={{flex:'2', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Radio checked={props.i == props.trueAnswer} onChange={clickToRadio}/>
      </Box>
      {
          editAnswer ?
          <>
            <Box sx={{flex:'4'}}>
              <MyInput value={contentAnswer} onChange={e => setContentAnswer(e.target.value)}/>
            </Box>
            <Box sx={{flex:'2', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <IconButton onClick={handleSubmit}>
                <CheckIcon/>
              </IconButton>
            </Box>
          </>
          :
          <>
          <Box sx={{flex:'4'}}>
            <Typography>{contentAnswer}</Typography>
          </Box>
          <Box sx={{flex:'2', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <IconButton onClick={handleEdit}>
              <EditIcon/>
            </IconButton>
          </Box>
        </>
      }
    </Box>
  )
}

function CreateQuestion(props) {
  const [isLoading,setIsLoading] = useState(false)
  const [isDone,setIsDone] = useState(false)
  const [trueAnswer,setTrueAnswer]=useState(null)
  const [contentQuestion,setContentQuestion]=useState('')
  const [listContentAnswer,setListContentAnswer]=useState({
    answer1:'answer1',
    answer2:'answer2',
    answer3:'answer3',
    answer4:'answer4',
  })

  async function createQuestion(){
    setIsLoading(true)
    let db = {
      question: `${contentQuestion}`,
      answer1: `${listContentAnswer['answer1']}`,
      answer2: `${listContentAnswer['answer2']}`,
      answer3: `${listContentAnswer['answer3']}`,
      answer4: `${listContentAnswer['answer4']}`,
      correctanswer: `${listContentAnswer[`answer${trueAnswer + 1}`]}`
    }
    console.log(db)
    await axios.post(`https://fwa-ec-quiz.herokuapp.com/v1/questions/edit`, db,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('tokenAccess')}`
      }
    })
    .then((res) => {
      console.log(res)
      setIsLoading(false)
      setIsDone(true)
      setTimeout(()=>setIsDone(),1000)
      window.location.reload()

    })
    .catch((err) => {
      alert(err)
      setIsLoading(false)
      setListContentAnswer({
        answer1:'answer1',
        answer2:'answer2',
        answer3:'answer3',
        answer4:'answer4',
      })
    })
  }

  return(
    <Paper sx={{
      height:'400px',
      width:'500px', display:'flex',
      flexDirection:'column', alignItems:'center',
      justifyContent:'space-around',
      // background:'red',
    }}>
      <Typography>New Question</Typography>
      <Box sx={{height:'80px', width:'auto', display:'flex', alignItems:'center'}}>
        <TextField label="Question" value={contentQuestion} onChange={e => setContentQuestion(e.target.value)}/>
      </Box>
      <Box>
      {
        listAnswer.map((item,i) => (
          <Answer 
            name={item} i={i}
            trueAnswer={trueAnswer} setTrueAnswer={setTrueAnswer}
            listContentAnswer={listContentAnswer} setListContentAnswer={setListContentAnswer}
          >
            {listContentAnswer[item]}
          </Answer>
        ))
      }
      </Box>
      {
        isLoading?(
          <Box sx={{display:'flex',alignItems:'center', justifyContent:"center"}}>
            <CircularProgress/>
          </Box>
        ):(
          <>
          {isDone?(
            <Box sx={{display:'flex',alignItems:'center', justifyContent:"center"}}>
              <CheckCircleIcon fontSize='large' color='success'/>
            </Box>
          ):(
            <Box>
              <Button variant='contained' onClick={createQuestion}>Create</Button>
            </Box>
          )}
          </>
        )
      }
  </Paper>
  )
}

function Question(props) {
  const [isLoading,setIsLoading] = useState(false)
  const [isEditQuestion,setIsEditQuestion]=useState(false)
  const [trueAnswer,setTrueAnswer]=useState(null)
  const [contentQuestion,setContentQuestion]=useState('')
  const [listContentAnswer,setListContentAnswer]=useState({
    answer1:'answer1',
    answer2:'answer2',
    answer3:'answer3',
    answer4:'answer4',
  })

  function getIndexOfAnswer(){
    let data = props.dbQuestion
    console.log(data.correctanswer)
    if(data.correctanswer == data.answer1) {
      setTrueAnswer(0)
    } else if(data.correctanswer == data.answer2){
      setTrueAnswer(1)
    } else if(data.correctanswer == data.answer3){
      setTrueAnswer(2)
    } else if(data.correctanswer == data.answer4){
      setTrueAnswer(3)
    }
  }

  function getData(){
    getIndexOfAnswer()
    setListContentAnswer({
      answer1:`${props.dbQuestion.answer1}`,
      answer2:`${props.dbQuestion.answer2}`,
      answer3:`${props.dbQuestion.answer3}`,
      answer4:`${props.dbQuestion.answer4}`,
    })
    setContentQuestion(`${props.dbQuestion.question}`)
  }

  async function saveQuestion(){
    setIsLoading(true)
    let db = {
      question: `${contentQuestion}`,
      answer1: `${listContentAnswer['answer1']}`,
      answer2: `${listContentAnswer['answer2']}`,
      answer3: `${listContentAnswer['answer3']}`,
      answer4: `${listContentAnswer['answer4']}`,
      correctanswer: `${listContentAnswer[`answer${trueAnswer + 1}`]}`
    }
    await axios.patch(`https://fwa-ec-quiz.herokuapp.com/v1/questions/edit/${props.dbQuestion.id}`,db,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('tokenAccess')}`
      }
    })
    .then((res) => {
      console.log(res)
      setIsLoading(false)
    })
    .catch((err) => {
      alert.log(err)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    getData()
    return () => {
      
    }
  }, [])
  

  async function deleteQuestion(){
    setIsLoading(true)
    console.log(props.dbQuestion.id)
    await axios.delete(`https://fwa-ec-quiz.herokuapp.com/v1/questions/edit/${props.dbQuestion.id}`,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('tokenAccess')}`
      }
    })
    .then((res) => {
      setIsLoading(false)
      console.log(res)
      window.location.reload()
    })
    .catch((err) => {
      alert(err)
      setIsLoading(false)
    })
  }


  function clickToEditQuestion(){
    setIsEditQuestion(true)
  }
  function clickToDoneEditQuestion(){
    setIsEditQuestion(false)
  }
  return (
    <Paper sx={{
        height:'400px',
        width:'500px', display:'flex',
        flexDirection:'column', alignItems:'center',
        justifyContent:'space-around',
        // background:'red',
      }}>
        <Typography>Question {props.i+1}</Typography>
        <Box sx={{height:'80px', width:'auto', display:'flex', alignItems:'center'}}>
          {
            isEditQuestion?(
              <>
              <TextField value={contentQuestion} onChange={e => setContentQuestion(e.target.value)}/>
              <IconButton onClick={clickToDoneEditQuestion}>
                <CheckIcon/>
              </IconButton>
              </>
            ):(
              <>
              <Typography>{contentQuestion}</Typography>
              <IconButton onClick={clickToEditQuestion}>
                <EditIcon/>
              </IconButton>
              </>
            )
          }
        </Box>
        <Box>
        {
          listAnswer.map((item,i) => (
            <Answer 
              name={item} i={i}
              trueAnswer={trueAnswer} setTrueAnswer={setTrueAnswer}
              setListContentAnswer={setListContentAnswer} listContentAnswer={listContentAnswer}
            >
              {props.dbQuestion[item]}
            </Answer>
          ))
        }
        </Box>
        {
          isLoading?(
            <Box sx={{display:'flex',alignItems:'center', justifyContent:"center"}}>
              <CircularProgress/>
            </Box>
          ):(
            <Box>
              <Button onClick={saveQuestion}>Save</Button>
              <Button onClick={deleteQuestion}>Delete</Button>
            </Box>
          )
        }
    </Paper>
  )
}

function AdminBoxQuestion(props) {
  return(
    (
      props.isCreateQuestion?(
        <CreateQuestion/>
      ):(
        <Question dbQuestion={props.item} i={props.i}/>
      )
    )
  )
}

export default AdminBoxQuestion