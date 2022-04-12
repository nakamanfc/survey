import { Box, Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'

function RememberMe(props) {
  return (
    <Box>
      <FormControlLabel control={<Checkbox defaultChecked/>} color='primary' label="Remember Me" sx={{color:'#1976D2'}}/>
    </Box>
  )
}

export default RememberMe