import { Typography,Paper, Box, Avatar, IconButton, TextField, Checkbox, Button, CircularProgress } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react'
import styled from "@emotion/styled"
import CheckIcon from '@mui/icons-material/Check';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

const MyInput = styled('input')({
    width: 400,
    height: 40,
    border: 'none',
    outline: 'none',
    paddingInline: '10px',
    borderRadius: '4px',
    background:'pink',
  })

function CreateUser() {
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [role,setRole] = useState('user')
    const [isLoading, setIsLoading] = useState(false)
    const [isDone, setIsDone] = useState(false)

    async function CreateUser(){
        console.log(userName,password,email,role)
        setIsLoading(true)
        await axios.post(`https://fwa-ec-quiz.herokuapp.com/v1/users/`,{
            username: `${userName}`,
            password: `${password}`,
            email: `${email}`,
            role: `${role}`,
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokenAccess')}`
            }
        })
        .then((res) => {
            console.log(res)
            setIsLoading(false)
            setUserName('')
            setPassword('')
            setEmail('')
            setRole('')
            setIsDone(true)
            setTimeout(() => setIsDone(false),1000)

        })
        .catch((err) => {
            alert(err)
            console.log(err)
            setIsLoading(false)
        })
        
    }

    return(
        <Paper sx={{
            height:'400px',
            width:'500px', display:'flex',
            flexDirection:'column', alignItems:'center', justifyContent:"space-around"
          }}>
            <Typography>Create User</Typography>
            <Box sx={{height:'300px', width:'400px', display:"flex", flexDirection:'column', justifyContent:'space-between'}}>
                <TextField label="Username" value={userName} onChange={e => setUserName(e.target.value)}/>
                <TextField type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                <FormControlLabel value={'admin'} onChange={e => setRole(e.target.value)} control={<Checkbox/>} label="Admin" />
                {
                    isLoading?(
                        <Box sx={{display:'flex',alignItems:'center', justifyContent:"center"}}>
                            <CircularProgress/>
                        </Box>
                    ):(
                        <>
                            {
                                isDone?(
                                    <Box sx={{display:'flex',alignItems:'center', justifyContent:"center"}}>
                                        <CheckCircleIcon fontSize='large' color='success'/>
                                    </Box>
                                ):(
                                    <Button variant="contained" onClick={CreateUser}>Create</Button>
                                )
                            }
                        </>
                    )
                }
            </Box>
        </Paper>
    )
}

function User(props) {
  const [isEdit, setIsEdit] = useState(false)
  const [avatar,setAvatar] = useState(props.db.avatar)
  const [isLoading,setLoading] = useState(false)
  function clickEdit(){
    setIsEdit(true)
  }
  function clickDone(){
    setIsEdit(false)
    setLoading(true)
    submitAvatar()
  }
  function clickClose(){
    setIsEdit(false)
    setAvatar(props.db.avatar)
  }
  async function submitAvatar(){
      await axios.patch(`https://fwa-ec-quiz.herokuapp.com/v1/users/${props.db.id}`,{
          avatar: `${avatar}`
      },{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('tokenAccess')}`
          }
      })
      .then((res) => {
        console.log(res)
        setLoading(false)
      })
      .catch((err) => {
          console.log(err)
      })
  }

  return (
    <Paper sx={{
        height:'400px',
        width:'500px', display:'flex',
        flexDirection:'column', alignItems:'center', justifyContent:"center"
      }}>
        <Avatar src={avatar} sx={{ width: 80, height: 80 }}/>
        <Box sx={{height:'auto', width:'400px', alignItems:'center'}}>
            <Typography>
                score: {props.db.score}
            </Typography>
            <Typography>
                role: {props.db.role}
            </Typography>
            <Typography>
                isEmailVerified: {`${props.db.isEmailVerified}`}
            </Typography>
            <Box sx={{display:'flex',alignItems:'center', justifyItems:'space-between'}}>
                {
                    isEdit?(
                        <>
                            <Typography>
                                avatar:
                            </Typography>
                            <MyInput value={avatar} onChange={e => setAvatar(e.target.value)}/>
                            <IconButton onClick={clickDone}>
                                <CheckIcon/>
                            </IconButton>
                            <IconButton onClick={clickClose}>
                                <CloseIcon/>
                            </IconButton>
                        </>
                    ):(
                        <>
                            <Typography>
                                avatar: {avatar.length > 35 ? avatar.slice(0,34) + '...' : avatar}
                            </Typography>
                            {
                                isLoading?
                                (
                                    <Box sx={{
                                        display:'flex', 
                                        alignItems:'center', justifyContent:'center',
                                    }}>
                                        <CircularProgress/>
                                    </Box>
                                ):(
                                    <IconButton onClick={clickEdit}>
                                        <EditIcon/>
                                    </IconButton>
                                )
                            }
                        </>
                    )
                }
            </Box>
            <Typography>
                username: {props.db.username}
            </Typography>
            <Typography>
                email: {props.db.email}
            </Typography>
            <Typography>
                id: {props.db.id}
            </Typography>
        </Box>
    </Paper>
  )
}

function AdminBoxUser(props){
    return(
    (
        props.isCreateUser?(
            <CreateUser/>
        ):(            
            <User db={props.item}/>
        )
    )
    )
}

export default AdminBoxUser