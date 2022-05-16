import React, { useEffect, useState } from 'react'
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { AiOutlineReload } from 'react-icons/ai';


const Header = ({ isLogin, setIsLogin }) => {
    
    const navigate = useNavigate()
    const [cookies, _, removeCookie] = useCookies('');
    
    

    const onClick = () => {
        setIsLogin(!isLogin)
        removeCookie('heidi')
        window.location.reload()
    }


    return (
        <div className='Wrapper'>
            <header>
            <Navbar  variant="dark">
                <Container>
                < SiHiveBlockchain className='headericon' color='white' size={30} />
                <Navbar.Brand className='navtext' href="/">Block Explore</Navbar.Brand>
                <Nav className="me-auto">
                    {isLogin
                    ?
                    <>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/createwallet">CreateWallet</Nav.Link>
                        <Nav.Link href="/login">LoginPage</Nav.Link>
                    </>
                    :
                    <>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/mypage">MyPage</Nav.Link>
                        <button onClick={onClick}>LOGOUT</button>
                    </>
                    }

                </Nav>
                </Container>
        </Navbar>
            </header>
        </div>
    )
}

export default Header