import React, { useEffect } from 'react'
import Footer from '../component/Global/Footer'
import Header from '../component/Global/Header'
import { useState } from 'react'
import { useCookies } from 'react-cookie';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import './mypage.css'

const Mypage = () => {

  const [cookies, removeCookie] = useCookies("");
  const [wallet, setWallet] = useState('')
  const [transaction, SetTansaction] = useState([])

  const identification = cookies.token

  const getIdentification = async () => {
    const result = await axios.post('http://localhost:3001/blocks/mypage',{"id" : identification})
  }

  const getResult = async() => {
    const retrunData = await axios.get('http://localhost:3001/blocks/mypage')
    let returnArr = retrunData.data
    let id = returnArr.idArray[0]
    let transactionInfo = returnArr.transactionArr[0]

    let walletInfo = id[0]
    setWallet(walletInfo)
    SetTansaction(transactionInfo)


  }
  useEffect(() => {
    getIdentification()
    setTimeout(getResult, 200)    
  }, [])

  // console.log(wallet.publickey)

  let td;
  td = transaction.map( (value, key) => {
    return(
      <>
        <tr key={key}>
          <td>{value.sendpublickey}</td>
          <td>{value.frompublickey}</td>
          <td>{value.rewards}</td>
        </tr>
        
      </>
    )})
    
  
  return (
    wallet != null ? 
    <div className='walletcontainer'>
        <div className='walltxt'>
        <p>Wallet Address : {wallet.publickey} </p> 
        
        <p>Retained assets : {wallet.coinamount} </p> 
        <br />
        <br />
        <h2>
          Recent Transaction
        </h2>
        </div>
        <div>
          <Table striped bordered hover variant="dark" size="sm">
            <thead>
              <tr>
                <th>Sent Address</th>
                <th>Receiving address</th>
                <th>Transaction amount</th>
              </tr>
            </thead>
            <tbody>
                {td}
            </tbody>
          </Table>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Footer/>
    </div>
    :
    <div>
      <h1>로그인 후 사용해주세요</h1>
      <Footer/>
    </div>
  )
}

export default Mypage