import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import AdminBoxQuestion from '../../Components/AdminBoxQuestion'
import AdminBody from '../../Components/AdminBody'
import SurveyFoot from '../../Components/SurveyFoot'
import AdminHeader from '../../Components/AdminHeader'

function AdminPage() {
  return (
    <Box sx={{background:'#F6F7FB'}}>
      <AdminHeader/>
      <AdminBody/>
      <SurveyFoot/>
    </Box>
  )
}

export default AdminPage