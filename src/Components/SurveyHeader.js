import { AppBar, Box, Button, Container, LinearProgress, Toolbar } from '@mui/material'
import React from 'react'
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useNavigate } from 'react-router-dom';
import LocalStorage from '../LocalStorage/LocalStorage';
import axios from 'axios';

function SurveyHeader(props) {
  let navigate = useNavigate()
  function logOut(){
    LocalStorage.RemoveDataAuth()
    navigate('/')
  }

  async function clickLogOut(){
    await axios.post('https://fwa-ec-quiz.herokuapp.com/v1/auth/logout',{
      refreshToken:`${localStorage.getItem('tokenRefresh')}`
    }).then(
      function (response) {
        console.log(response)
        logOut()
      }
    )
  }

  return (
    <AppBar position='static' color='default'>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
          <Box sx={{color:'#1976D2', fontSize:26, fontWeight:500, display:'flex', alignItems:'center'}}>
            <TextSnippetIcon fontSize='large' sx={{paddingRight:0.25}}/>
            Survey
          </Box>
          <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Box>
              {props.numQuestion}/{props.sizeQuestion}
            </Box>
            <Box>
              Question Survey
            </Box>
          </Box>
          <Button variant="contained" onClick={clickLogOut}>
            Log Out
          </Button>
        </Toolbar>
      </Container>
      <Box sx={{width: '100%'}}>
        <LinearProgress variant="determinate" value={props.numQuestion*parseFloat(100/props.sizeQuestion)}/>
      </Box>
    </AppBar>
  )
}

export default SurveyHeader