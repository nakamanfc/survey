import { Typography, Box, Radio, TextField, RadioGroup, Button, IconButton, Paper } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import styled from "@emotion/styled"
import React, { useState } from 'react';

const MyInput = styled('input')({
  width: 'auto',
  height: 40,
  border: 'none',
  outline: 'none',
  paddingInline: '10px',
  borderRadius: '4px',
})

function Anwser(props){
  const [editAnwser,setEditAnwser] = useState(false)
  function handleEdit(){
    setEditAnwser(true)
  }
  function handleSubmit(){
    setEditAnwser(false)
  }
  return (
    <Box sx={{
      display:'flex', alignItems:'center',
      width:'400px',
    }}>
      <Box sx={{flex:'2', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Radio/>
      </Box>
      <Box sx={{flex:'4'}}>
        {
          editAnwser ?
          <MyInput value={'Hello'}/>
          :
          <Typography>Hello</Typography>
        }
      </Box>
      <Box sx={{flex:'2', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <IconButton onClick={handleEdit}>
          <EditIcon/>
        </IconButton>
      </Box>
    </Box>
  )
}

function AdminBoxQuestion() {
  return (
    <Paper sx={{
        height:'400px',
        width:'500px', display:'flex',
        flexDirection:'column', alignItems:'center',
        justifyContent:'space-around',
        // background:'red',
      }}>
        <Typography>Question 1</Typography>
        <Box sx={{height:'80px', width:'auto', display:'flex', alignItems:'center'}}>
          {/* <TextField/> */}
          <Typography>1 + 1 = ?</Typography>
        </Box>
        <Box>
        <Anwser>Name</Anwser>
        <Anwser>Name</Anwser>
        <Anwser>Name</Anwser>
        <Anwser>Name</Anwser>
        </Box>
        <Box>
          <Button>Save</Button>
          <Button>Delete</Button>
        </Box>
    </Paper>
  )
}

export default AdminBoxQuestion