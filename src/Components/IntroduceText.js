import { Container } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function IntroduceText() {
  return (
    <Container sx={{width:'auto', height:'auto'}}>
      <Box sx={{color:'white', fontSize: 80, fontWeight:500}}>
        Survey...
      </Box>
      <Box sx={{color:'white', width:'fit-content', fontSize: 30, fontWeight:500, background:'rgba(0, 0, 0, 0.7)'}}>
        Take a survey by FSorft.
      </Box>
    </Container>
  )
}

export default IntroduceText