import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import {React, useState} from 'react';

const Index = () => {

    const [test, setTest] = useState("");

    const handleClick = async () => {
        const result = await axios.get('http://localhost:3001')
        setTest(result.data);
        // alert(result.data)
    }

    return(
        <div>
        <Button variant="danger" onClick={handleClick}>채굴버튼</Button>
        <p>{test}</p>
        </div>
        // <button onClick={handleClick}>채굴</button>
        
    )
}

export default Index