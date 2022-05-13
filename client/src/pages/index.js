import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import {React, useState} from 'react';

const Index = () => {

    const [data, setData] = useState({
        data:"123"
    })

    const handleClick = async () => {
        await axios.post('http://localhost:3001/blocks/mineBlock', data)
        // alert(result.data)
    }

    return(
        <div>
        <Button variant="danger" onClick={handleClick}>채굴버튼</Button>

        </div>
        // <button onClick={handleClick}>채굴</button>
        
    )
}

export default Index