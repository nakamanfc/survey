import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import AdminBoxQuestion from './AdminBoxQuestion'

function AdminPageBody() {
  return (
    <Box sx={{
        height:'100hv',
        display:'flex', alignItems:'center',
        justifyContent:'center',
    }}>
    <Box sx={{marginTop:12, marginBottom:12}}>
        <Grid container rowSpacing={13}>
        <Grid item xs={6} sx={{display:'flex', alignItems:'center',justifyContent:'center'}}>
            <AdminBoxQuestion/>
        </Grid>
        <Grid item xs={6} sx={{display:'flex', alignItems:'center',justifyContent:'center'}}>
            <AdminBoxQuestion/>
        </Grid>
        <Grid item xs={6} sx={{display:'flex', alignItems:'center',justifyContent:'center'}}>
            <AdminBoxQuestion/>
        </Grid>
        <Grid item xs={6} sx={{display:'flex', alignItems:'center',justifyContent:'center'}}>
            <AdminBoxQuestion/>
        </Grid>
        </Grid>
    </Box>
    </Box>
  )
}

export default AdminPageBody