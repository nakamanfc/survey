import { Box, Button } from '@mui/material'
import React, { useState } from 'react'

function SurveyNavigationButton(props) {
  return (
    <Box sx={{
      width:'100%',
      display:'flex',
      justifyContent: 'space-between'
    }}>
      <Button variant="outlined" onClick={props.backQuestion}>
        Back
      </Button>
      <Button variant="outlined" onClick={props.submitQuestion} disabled={props.submitActive}>
        Submit
      </Button>
      <Button variant="contained" onClick={props.nextQuestion}>
          {(props.lastQuestion?(<>Finish</>):(<>Next</>))}
      </Button>
    </Box>
  )
}

export default SurveyNavigationButton