import React, { useEffect, useState } from 'react'
import axios from "axios";
import Footer from '../component/Global/Footer'
import Header from '../component/Global/Header'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import './createwallet.css'




const CreateWallet = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        passwd: ""
    })

    const [passwd, setPasswd] = useState("")

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(passwd == "") {
            alert("비밀번호를 입력 해 주세요")
            return false;
        }
        axios.post("http://localhost:3001/blocks/createwallet", user) 
        setTimeout(acceptData, 100)                   
    }

    const acceptData = async() => {
        const response = await axios.get("http://localhost:3001/blocks/signinfo")
        alert(`지갑주소 : ${response.data[0].publickey} \n privatekey (페이지 이동시 확인 불가능) : ${response.data[0].privatekey}`)
        navigate("/login")
    }


    useEffect(() => {
        setPasswd(user.passwd)
    }, [user])

  return (
    <div>
        <Header/>
        <div className='walletcontainer'>
            <div className='wallettitle'>
                <h1>Create Wallet</h1>
            </div>
            <div className='wallettext'>
                <p>Password to use</p>
            </div>
            <div>
                <TextField className='headertextfield' id="standard-basic" color="secondary" value={passwd} label="Please enter your PIN number" variant="standard" type="password" name="passwd" onChange={handleChange} />
            </div>
            <div className='walletbtn'>
                <Button size="lg" variant="dark" onClick={handleSubmit}>Create Wallet</Button>
            </div>
            <div className='warninfotext'>
                <p>This Password encrypts your private key. This dose not act as a seed to generate your keys.</p>
                <strong>You will need this password + your private key to unlock your wallet</strong>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default CreateWallet