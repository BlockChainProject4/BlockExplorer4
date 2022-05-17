import React, { useEffect, useState } from 'react'
import axios from "axios";
import Footer from '../component/Global/Footer'
import Header from '../component/Global/Header'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import './createwallet.css'
import Swal from 'sweetalert2'


const CreateWallet = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        passwd: "",
        confirmpasswd:""
    })

    const [passwd, setPasswd] = useState("")
    const [confirmpasswd, setConfirmpasswd] = useState("")

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
            alert("비밀번호란을 입력 해 주세요")
            return false;
        } else if(confirmpasswd != passwd) {
            alert("두 비밀번호가 다릅니다.")
            Swal.fire({
                title: 'Error!',
                text: 'Please enter your password.',
                icon: 'error',
                confirmButtonText: 'Back'
            })
            return false;
        }
        axios.post("http://localhost:3001/blocks/createwallet", user) 
        setTimeout(acceptData, 100)                   
    }

    const acceptData = async() => {
        const response = await axios.get("http://localhost:3001/blocks/signinfo")
        Swal.fire({
            title: 'success',
            text: `Wallet Address : ${response.data[0].publickey} privatekey (Unable to check when moving page) : ${response.data[0].privatekey}`,
            icon: 'success',
            confirmButtonText: 'OK'
        })
        navigate("/login")
    }


    useEffect(() => {
        setPasswd(user.passwd)
        setConfirmpasswd(user.confirmpasswd)
    }, [user])

  return (
    <div>
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
            <div>
                <TextField className='headertextfield' id="standard-basic" color="secondary" value={confirmpasswd} label="Please enter your PIN number" variant="standard" type="password" name="confirmpasswd" onChange={handleChange} />
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