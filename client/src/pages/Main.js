import React from 'react'
import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../component/Global/Header';
import Footer from '../component/Global/Footer';
import UserTradList from '../component/CoinList/UserTradList';
import Index from './index';

const Main = () => {
  return (
    <div >
      <Header/>
        <div className='main_container'>
          <UserTradList/>
          <Index />
        </div>
      <Footer/>
    </div>
  )
}

export default Main