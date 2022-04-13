import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import AdminBoxQuestion from './AdminBoxQuestion'
import AdminBoxUser from './AdminBoxUser'

function QuestionManagement(props) {
    return(
        <Box sx={{
            height:'100hv',
            display:'flex', alignItems:'center',
            justifyContent:'center',
        }}>
            <Box sx={{marginTop:12, marginBottom:12}}>
                <Grid container rowSpacing={13}>
                <Grid item xs={6} sx={{display:'flex', alignItems:'center',justifyContent:'center'}}>
                    <AdminBoxQuestion isCreateQuestion/>
                </Grid>
                {
                    props.dbQuestion['results'].map((item,i) => (
                        <Grid item xs={6} sx={{display:'flex', alignItems:'center',justifyContent:'center'}}>
                            <AdminBoxQuestion item={item} i={i}/>
                        </Grid>
                    ))
                }
                </Grid>
            </Box>
        </Box>
    )
}

function QuestionUser(props) {
    return(
        <Box sx={{
            height:'100hv',
            display:'flex', alignItems:'center',
            justifyContent:'center',
        }}>
            <Box sx={{marginTop:12, marginBottom:12}}>
                <Grid container rowSpacing={13}>
                    <Grid item xs={6} sx={{display:'flex', alignItems:'center',justifyContent:'center'}}>
                        <AdminBoxUser isCreateUser/>
                    </Grid>
                    {props.dbUser['results'].map((item,i) => (
                        <Grid item xs={6} sx={{display:'flex', alignItems:'center',justifyContent:'center'}}>
                            <AdminBoxUser item={item} i={i}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}

function AdminPageBody(props) {
  return (
      (
          props.isQuestionManagement?(
            <QuestionManagement dbQuestion={props.dbQuestion}/>
          ):(
            <QuestionUser dbUser={props.dbUser}/>
          )
      )
  )
}

export default AdminPageBody