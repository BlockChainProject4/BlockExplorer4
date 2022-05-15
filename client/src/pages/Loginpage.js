import React, { useState, useEffect } from 'react'
import Footer from '../component/Global/Footer'
import Header from '../component/Global/Header'
import axios from "axios"

const Loginpage = () => { 
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

const handleSubmit = (e) => {
  e.preventDefault();
  if(publickey == "" || passwd == "") {
      alert("모든 정보를 입력 해 주세요")
      return false;
  }
  axios.post("http://localhost:3001/blocks/login", user)
}
  
useEffect(() => {
  setPublickey(user.publickey)
  setPasswd(user.passwd)
}, [user])

  return (
    <div>
        <Header/>
        <div>
            <h1>Login Page 입니다.</h1>
            <br />
            <label>지갑 주소</label>
            <br />
            <input type="text" placeholder='지갑주소를 입력해 주세요...' name="publickey" onChange={handleChange}/>
            <br />
            <label>비밀 번호</label>
            <br />
            <input type="password" placeholder='비밀번호를 입력해 주세요...' name="passwd" onChange={handleChange} />
            <br />
            <button onClick={handleSubmit}>Login</button>
        </div>
        <Footer/>
    </div>
  )
}

export default Loginpage