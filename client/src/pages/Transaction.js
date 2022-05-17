import React, { useEffect, useState } from 'react'
import axios from "axios";
import Footer from '../component/Global/Footer'
import Header from '../component/Global/Header'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {TextField} from '@mui/material';
import { Button } from 'react-bootstrap';
import './transaction.css';




const Transaction = () => {

    const [cookies] = useCookies("");
    const identification = cookies.token;
    const [txdata, SetTxdata] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        address: "",
        amount: ""
    })

    const [address, setAddress] = useState("")
    const [amount, setAmount] = useState("")

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/blocks/trans", {user:user, id:identification})
        .then((res)=>{
            console.log(res.data)
            if (res.data.message == 2) {
                alert("주소가 틀렸습니다")
            } else if(res.data.message == 1) {
                alert("송금이 완료 되었습니다.")
                navigate(0)
            }
        })                   
    }
    const recentTransaction = async() => {
        const response = await axios.get("http://localhost:3001/blocks/recentTx");
        SetTxdata([...txdata, ...response.data])
    }  

    useEffect(() => {
        setAddress(user.address)
        setAmount(user.amount)
    }, [user])

    useEffect(() => {
        recentTransaction()
    },[])
    console.log(txdata)

  return (
    <div>
        <div className='trancontainer'>
            <div>
                <h1>Transaction Page</h1>
            </div>
            <div>
                <p>Coin address to transfer</p>
                <TextField className='trantextfield' value={address} id="standard-basic" color="secondary" label="Please enter your password" variant="standard" type="text" name="address" onChange={handleChange} />
            </div>
            <div>
                <p className='trantext'>Amount of coins to be transfer</p>
                <TextField className='trantextfield' value={amount} id="standard-basic" color="secondary" label="Please enter your password" variant="standard" type="number" name="amount" onChange={handleChange} />
            </div>
            <div className='tranbtn'>
                <Button size="lg" variant="dark" onClick={handleSubmit}>Sending Coin</Button>
            </div>
        </div>
            <table>
                <thead>
                    <tr>
                        <th>sendAccount</th>
                        <th>FromAccount</th>
                        <th>value</th>
                    </tr>
                </thead>
                <tbody>
                    {txdata.map((row) => (               
                <tr>
                    <td>{row.sendpublickey}</td>
                    <td>{row.frompublickey}</td>
                    <td>{row.rewards}</td>
                </tr>
                     ))}
                </tbody>
            </table>
        <Footer/>
    </div>
  )
}

export default Transaction