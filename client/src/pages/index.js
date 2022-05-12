import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import {React, useState} from 'react';

const Index = () => {

    const [test, setTest] = useState("");

    const handleClick = async () => {

        const result = await axios.get('http://localhost:3001/mine')
        console.log(result.data)
        setTest(result.data);
    }
    //     const result = await axios.post('http://localhost:3001/mine', {
    //         Block : "info blabla"
    //     }, {
    //         withCredentials : true }
    //         ).then ( (res) => {console.log(res)}
    //         ).catch( (error) => {console.log(error)}
    //         )
    //         setTest(result);
    // }

    return(
        <div>
        <Button variant="danger" onClick={handleClick}>채굴</Button>
        <p>{test}</p>
        </div>
        // <button onClick={handleClick}>채굴</button>
        
    )
}

export default Index