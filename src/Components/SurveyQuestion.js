import { Typography } from '@mui/material'
import React from 'react'

function SurveyQuestion(props) {
  return (
    <Typography sx={{fontSize:30, color:'#737684', fontWeight:500}}>
      {props.children}
    </Typography>
  )
}

export default SurveyQuestion