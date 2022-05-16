import React from 'react'; 
import {  Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main.js'
import Loginpage from './pages/Loginpage';
import Mypage from './pages/Mypage';
import CreateWallet from './pages/CreateWallet';

function App() {
    return (
        <div className='container'>
            <Routes>
                <Route path='/' element={<Main/>}></Route>
                <Route path='/login' element={<Loginpage/>}></Route>
                <Route path='/mypage' element={<Mypage/>}></Route>
                <Route path='/createwallet' element={<CreateWallet/>}></Route>
            </Routes>

        </div>

    );
}

export default App;