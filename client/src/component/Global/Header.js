import React from 'react'
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { SiHiveBlockchain } from "react-icons/si";
import { Spinner} from 'react-bootstrap';

const Header = () => {
    return (
        <div className='Wrapper'>
            <header>
            <Navbar  variant="dark">
                <Container>
                < SiHiveBlockchain className='headericon' color='white' size={30} />
                <Navbar.Brand className='navtext' href="/">Block Explore</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/login">Search</Nav.Link>
                    <Nav.Link href="/createwallet">Createwallet</Nav.Link>
                    <Nav.Link href="/mypage">SearchResult</Nav.Link>
                    <Spinner className='navspinner' animation="border" variant="light" />
                </Nav>
                </Container>
        </Navbar>
            </header>
        </div>
    )
}

export default Header