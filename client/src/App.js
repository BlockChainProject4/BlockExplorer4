import React,{ useState,useEffect } from 'react'; 
import {  Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main.js'
import Loginpage from './pages/Loginpage';
import Mypage from './pages/Mypage';
import CreateWallet from './pages/CreateWallet';
import Header from './component/Global/Header';
import { useCookies } from 'react-cookie';
import Transaction from './pages/Transaction';


function App() {
    const [isLogin, setIsLogin] = useState(true)
    const [cookies, _, removeCookie] = useCookies('');

    useEffect(()=>{
        console.log('hello world')
        const result = Object.keys(cookies)
        if ( result.length > 0){
            setIsLogin(false)
        }
    },[isLogin])

    return (
        <div className='container'>
            <Header isLogin={isLogin} setIsLogin={setIsLogin} />
            <Routes>
                <Route path='/' element={<Main />}></Route>
                <Route path='/login' element={<Loginpage isLogin={isLogin} setIsLogin={setIsLogin} />}></Route>
                <Route path='/mypage' element={<Mypage />}></Route>
                <Route path='/transaction' element={<Transaction />}></Route>
                <Route path='/createwallet' element={<CreateWallet />}></Route>
            </Routes>

        </div>

    );
}

export default App;