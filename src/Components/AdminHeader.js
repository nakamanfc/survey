import { AppBar, Box, Button, Container, LinearProgress, Toolbar } from '@mui/material'
import React from 'react'
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

function AdminHeader() {
  return (
    <AppBar position='static' color='default'>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
          <Box sx={{color:'#1976D2', fontSize:26, fontWeight:500, display:'flex', alignItems:'center'}}>
            <TextSnippetIcon fontSize='large' sx={{paddingRight:0.25}}/>
            Survey
          </Box>
          <Box sx={{width:"390px", display:'flex', flexDirection:'row', justifyContent: 'center'}}>
            <Button variant="contained">
                Question Management
            </Button>
            <Button>
                User Management
            </Button>
          </Box>
          <Button variant="contained">
            Log Out
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default AdminHeader