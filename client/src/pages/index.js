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
        let {value} = e.target;
        
        setMineCount({
            ...mineCount,
            value
        });
    };



    const handleClick = async () => {
        if(mineCount.value <= 0) {
            alert("최소 1회 이상을 입력해야 채굴이 가능합니다.")         
        } else {
            for(let i = 0; i < mineCount.value; i++ ) {
            alert(`채굴 시작! 실행횟수 : ${i + 1} / ${mineCount.value}`)
       await axios.post('http://localhost:3001/blocks/mineBlock', data)
    //    await axios.post('http://13.125.253.189:3000//blocks/mineBlock', data)
            alert(`채굴 ${i + 1} / ${mineCount.value}회 완료`)
        }
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