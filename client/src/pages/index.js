import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import {React, useState} from 'react';

const Index = () => {

    const [data, setData] = useState({
        data:"123"
    })
    const [mineCount, setMineCount] = useState()
    const handleChange = (e) => {
        let {name, value} = e.target;
        
        setMineCount({
            ...mineCount,
            value
        });
    };



    const handleClick = async () => {

        for(let i = 0; i < mineCount.value; i++ ) {
 
       await axios.post('http://localhost:3001/blocks/mineBlock', data)
    }
}
    

    return(
        <div>
        <input placeholder='채굴 횟수를 입력 해 주세요..' type="number" onChange={handleChange}/>
        <Button variant="danger" onClick={handleClick}>채굴버튼</Button>
        </div>
        // <button onClick={handleClick}>채굴</button>
        
    )
}

export default Index