import React, { useEffect } from 'react'
import Footer from '../component/Global/Footer'
import Header from '../component/Global/Header'
import { useState } from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Mypage = () => {

  const [cookies, removeCookie] = useCookies("");
  const [wallet, setWallet] = useState('')
  const [transaction, SetTansaction] = useState([])

  const identification = cookies.token

  const getIdentification = async () => {
    const result = await axios.post('http://localhost:3001/blocks/mypage',{"id" : identification}).then()
  }

  const getResult = async() => {
    const retrunData = await axios.get('http://localhost:3001/blocks/mypage')
    let returnArr = retrunData.data
    let id = returnArr.idArray[0]
    let transactionInfo = returnArr.transactionArr[0]

    let walletInfo = id[0]
    setWallet(walletInfo)
    SetTansaction(transactionInfo)

    console.log(transactionInfo)

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
    <div>
        지갑주소 :  <span>{wallet.publickey}</span>
        <br />
        <br />
        보유자산 : <span>{wallet.coinamount}</span>
        <br />
        <br />
        최근 거래내역 
        <tr>
          <table>
          <tr>
            <th>보낸주소</th>
            <th>받는주소</th>
            <th>거래금액</th>
          </tr>
          {td}
          </table>
        </tr>
        <br />
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