import React from 'react'
import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../component/Global/Header';
import Footer from '../component/Global/Footer';
// import UserTradList from '../component/CoinList/UserTradList';
import Index from './index';

const Main = ({ isLogin, setIsLogin }) => {
  return (
    <div >
        <div className='main_container'>
          {/* <UserTradList/> */}
          <Index />
          <Footer/>
        </div>
    </div>
  )
}

export default Main