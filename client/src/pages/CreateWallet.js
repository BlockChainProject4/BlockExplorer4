import React, { useEffect, useState } from 'react'
import axios from "axios";
import Footer from '../component/Global/Footer'
import Header from '../component/Global/Header'
import { useNavigate } from 'react-router-dom';





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
        <div>
            <h1>Create Wallet!</h1>
            <br />
            <label>사용할 비밀번호를 입력 해 주세요</label>
            <br />
            <input type="password" name='passwd' value={passwd} onChange={handleChange}/>
            <button onClick={handleSubmit} >지갑 생성</button>
        </div>
        <Footer/>
    </div>
  )
}

export default CreateWallet