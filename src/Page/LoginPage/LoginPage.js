import React, { useState } from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import Input from '../../Components/Input';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IntroduceText from '../../Components/IntroduceText';
import RememberMe from '../../Components/RememberMe';
import { useFormik } from 'formik';
import axios from 'axios';
import storeDataAuth from '../../LocalStorage/LocalStorage.js'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const BgCss = {
  display: 'flex',
  flexDirection: 'row',
  width: '100vw',
  height: '100vh',
  backgroundImage: 'url("https://wallpaperaccess.com/full/2628129.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  alignItems: 'center',
  justifyContent: 'center'
}

const IntroduceCss = {
  width: '600px',
  height: '460px',
  borderRadius: '3%',
}

const BoxLoginCss = {
  marginLeft: -10,
  display: 'flex',
  flexDirection: 'column',
  width: '350px',
  height: '460px',
  background: 'rgba(0.1, 0.1, 0.1, 0.67)',
  alignItems: 'center',
  borderRadius: '3%',
}

const ContainerLoginCss = {
  display: 'flex',
  flexDirection: 'column',
  height: '340px',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 8,
}

function LoginPage() {
  const [loginStatus, setLoginStatus] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  let navigate = useNavigate();

  const dataLogin = useFormik({
    initialValues: {
      userName:'',
      password:''
    }
  })

  const dataRegister = useFormik({
    initialValues: {
      email:'',
      password:'',
      userName:''
    }
  })

  const changeLoginStatus = () =>{
      setLoginStatus(!loginStatus)
      console.log('change login status')
  }

  async function clickLoginButton(){
    console.log(dataLogin.values)
    setLoginLoading(true)
    if(dataLogin.values.userName != '' && dataLogin.values.password != ''){
      await axios.post(`https://fwa-ec-quiz.herokuapp.com/v1/auth/login`, {
        username: `${dataLogin.values.userName}`,
        password: `${dataLogin.values.password}`
      })
      .then(function (response) {
        storeDataAuth.storeDataAuth(response.data);
        console.log(response.data);
        navigate('/survey');
        setLoginLoading(false)
      })
      .catch(function (error) {
        console.log(error);
        setLoginLoading(false)
      });
      console.log('done click login')
    } else {
      console.log('click login err')
      setLoginLoading(false)
    }
  }

  async function clickRegisterButton(){
    setRegisterLoading(true)
    console.log(dataRegister.values)
    if(dataRegister.values.userName != '' && dataRegister.values.password != '' && dataRegister.values.email != ''){
      await axios.post(`https://fwa-ec-quiz.herokuapp.com/v1/auth/register`, {
        username: `${dataRegister.values.userName}`,
        email: `${dataRegister.values.email}`,
        password: `${dataRegister.values.password}`
      })
      .then(function (response) {
        console.log(response.data);
        setRegisterLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log('done click register')
    } else {
      console.log('click register err')
      setRegisterLoading(false)
    }
  }
  
  return (
    <Box sx={BgCss}>
      <Box sx={IntroduceCss}>
        <IntroduceText/>
      </Box>
      <Box sx={BoxLoginCss}>
        <Container sx={ContainerLoginCss}>
        {loginStatus?(
          <>
            <div>
              <Button variant="contained">Log in</Button>
              <Button variant="text" onClick={changeLoginStatus} >Register</Button>
            </div>
            <Input type="text" placeholder="User Name" name="userName" value={dataLogin.values.userName} onChange={dataLogin.handleChange} icon={<AccountCircleIcon color='primary'/>}/>
            <Input type="password" placeholder="Password" name="password" value={dataLogin.values.password} onChange={dataLogin.handleChange} icon={<VpnKeyIcon color='primary'/>}/>
            <RememberMe/>
            {loginLoading?<CircularProgress/>:<Button variant="contained" onClick={clickLoginButton}>Log in</Button>}
            
          </>
        ):(
          <>
            <div>
              <Button variant="text" onClick={changeLoginStatus} color='primary'>Log in</Button>
              <Button variant="contained" color='primary'>Register</Button>
            </div>
            <Input type="text" placeholder="User Name" name="userName" value={dataRegister.values.userName} onChange={dataRegister.handleChange} icon={<AccountCircleIcon color='primary'/>}/>
            <Input type="text" placeholder="Email" name="email" value={dataRegister.values.email} onChange={dataRegister.handleChange} icon={<EmailIcon color='primary'/>}/>
            <Input type="password" placeholder="Password" name="password" value={dataRegister.values.password} onChange={dataRegister.handleChange} icon={<KeyIcon color='primary'/>}/>
            {registerLoading?<CircularProgress/>:<Button variant="contained" onClick={clickRegisterButton}>Register</Button>}
          </>
        )}
        </Container>
      </Box>
    </Box>
  )
}

export default LoginPage