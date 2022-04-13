import { Box, Button, ButtonGroup, IconButton, Typography } from '@mui/material'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function SurveyFoot() {
  function clickToFB(){
    window.open('https://www.facebook.com/profile.php?id=100010730803036')
  }
  function clickToTW(){
    window.open('https://twitter.com/hoangpham119')
  }
  function clickToIG(){
    window.open('https://www.instagram.com/hoagpham.mew/')
  }
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{background:'#F6F7FB'}}>
        <path fill="#1976D2" fill-opacity="1" d="M0,64L48,80C96,96,192,128,288,122.7C384,117,480,75,576,53.3C672,32,768,32,864,48C960,64,1056,96,1152,112C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
      <Box sx={{background:'#1976D2',width:'100%', height:'140px', display:'flex', flexDirection:'column',justifyItems:'center', alignItems:'center', marginTop:'-100px'}}>
        <Box>
        <IconButton sx={{color:'white'}} onClick={clickToFB}>
            <FacebookIcon fontSize='large'/>
        </IconButton>
        <IconButton sx={{color:'white'}} onClick={clickToTW}>
            <TwitterIcon fontSize='large'/>
        </IconButton>
        <IconButton sx={{color:'white'}} onClick={clickToIG}>
            <InstagramIcon fontSize='large'/>
        </IconButton>
          </Box>
          <Typography sx={{marginTop:'30px', color:'white'}}>
            ©Mew Project From 2022 To The Moon.
          </Typography>
      </Box>
    </>
  )
}

export default SurveyFoot