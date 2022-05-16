import React, { useState, useEffect } from 'react'
import Footer from '../component/Global/Footer'
import Header from '../component/Global/Header'
import axios from "axios"
import { Button } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import './login.css'
import { useNavigate } from 'react-router-dom'

const Loginpage = () => { 
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
    navigate('/')
  }
}
  
useEffect(() => {
  setPublickey(user.publickey)
  setPasswd(user.passwd)
}, [user])

  return (
    <div>
        <Header/>
        <div className='logincontainer'>
            <h1>Confirm Wallet Address</h1>
            <div className='wallettext'>
                <div>
                    <p>Wallet Address</p>
                </div>
                <div>
                    <TextField id="standard-basic"  color="secondary" type="text" label="Please enter your wallet address" variant="standard"  name="publickey" onChange={handleChange}  />
                </div>
            </div>
            <div className='passwordtext'>
                <div>
                    <p>PASSWORD</p>
                </div>
                <div>
                    <TextField className='headertextfield' id="standard-basic" color="secondary" label="Please enter your PIN number" variant="standard" type="password" name="passwd" onChange={handleChange} />
                </div>
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