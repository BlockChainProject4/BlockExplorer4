import React, { useState, useEffect } from 'react'
import Footer from '../component/Global/Footer'
import axios from "axios"
import { Button } from 'react-bootstrap';
import {TextField} from '@mui/material';
import './login.css'
import { useNavigate } from 'react-router-dom'

const Loginpage = ({ isLogin, setIsLogin }) => { 
  const navigate = useNavigate()
  const [user, setUser] = useState({
    publickey: "",
    passwd: ""
})
const [publickey, setPublickey] = useState("");
const [passwd, setPasswd] = useState("");

const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({
        ...user,
        [name]: value
    })
}

const handleSubmit = async (e) => {
  e.preventDefault();
  if(publickey == "" || passwd == "") {
      alert("모든 정보를 입력 해 주세요")
      return false;
  }

  const result = await axios.post("http://localhost:3001/blocks/login", user, {
    withCredentials : true
  })

  const reqMSG = result.data.message;
  if(reqMSG == "로그인 성공"){
    console.log('asdfasdf')
    setIsLogin(false)
    navigate('/')
  }
}
  
useEffect(() => {
  setPublickey(user.publickey)
  setPasswd(user.passwd)
}, [user])

  return (
    <div>
        <div className='logincontainer'>
          <div className='wallettitle'>
            <h1>Wallet Address Login</h1>
          </div>
          <div>
            <p className='logintext'>Wallet Address</p>
            <TextField className='logintextfield' id="standard-basic" color="secondary" label="Please enter your Wallet address" variant="standard" type="text" name="publickey" onChange={handleChange} />
          </div>
          <div>
            <p className='logintext'>Password</p>
            <TextField className='logintextfield' id="standard-basic" color="secondary" label="Please enter your password" variant="standard" type="password" name="passwd" onChange={handleChange} />
          </div>
          <div className='loginbtn'>
            <Button size="lg" variant="dark" onClick={handleSubmit}>Login</Button>
          </div>  
        </div>
        <Footer/>
    </div>
  )
}

export default Loginpage