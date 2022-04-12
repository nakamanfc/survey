import { Box, CircularProgress } from '@mui/material'
import React from 'react'

function LoadingPage() {
  return (
    <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:'100vh', background:'#F7F8FB'}}>
      <CircularProgress/>
    </Box>
  )
}

export default LoadingPage