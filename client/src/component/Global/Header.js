import React from 'react'
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = () => {
    return (
        <div className='Wrapper'>
            <header>
            <Navbar bg="primary" variant="dark">
                <Container>
                <Navbar.Brand Link="/">Block Explore</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/login">LoginPage</Nav.Link>
                    <Nav.Link href="/mypage">MyPage</Nav.Link>
                </Nav>
                </Container>
        </Navbar>
            </header>
        </div>
    )
}

export default Header