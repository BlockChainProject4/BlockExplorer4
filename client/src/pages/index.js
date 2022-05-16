import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import {React, useState} from 'react';

const Index = () => {

    const [mineCount, setMineCount] = useState()
    const [viewData, setViewData] = useState()
    const [data, setData] = useState({
        data:"123"
    })

    const [bringData, setBringData] = useState("")


    const handleChange_MINE = (e) => {
        let {name, value} = e.target;
        
        setMineCount({
            ...mineCount,
            value
        });
    };

    const handleChange_VIEW = (e) => {
        let {name, value} = e.target;
        
        setViewData({
            ...viewData,
            value
        });
    };

    const handleClick_MINE = async () => {
            if(mineCount.value <= 0) {
                alert("최소 1회 이상을 입력해야 채굴이 가능합니다.")         
            } else {
                for(let i = 0; i < mineCount.value; i++ ) {
                alert(`채굴 시작! 실행횟수 : ${i + 1} / ${mineCount.value}`)
            await axios.post('http://localhost:3001/blocks/mine', data)
        //    await axios.post('http://13.125.253.189:3000//blocks/mineBlock', data)
                alert(`채굴 ${i + 1} / ${mineCount.value}회 완료`)
            }
        }
    }

    const handleClick_VIEW = async () => {
        const blockData = viewData.value
        const result = await axios.post('http://localhost:3001/blocks/view', { blockData })
        // console.log(result.data)

        setTimeout(bringPostData, 100)
    }

    const bringPostData = async () => {
        const result = await axios.get('http://localhost:3001/blocks/view')
        console.log("result DATA : " + result[1])
    }
    
    return(
        <>
            <span>
            <input placeholder='채굴 횟수를 입력 해 주세요' type="number" onChange={handleChange_MINE}/>
            <Button variant="danger" onClick={handleClick_MINE}>채굴버튼</Button>
            </span>
            <span>채굴 한 블록 정보 : <textarea readOnly rows="1" name='mineBlockInfo' value="{}"></textarea></span>

            <br />

            <span>
            <input placeholder='조회 할 BLOCK 정보를 입력하세요' type="text" name="idxNum" onChange={handleChange_VIEW}/>
            <Button variant="danger" onClick={handleClick_VIEW}>조회버튼</Button>
            </span>
            {/* <a onClick={handleClick_VIEW} href='http://localhost:3000/blockslist' > 목록으로 이동 </a> */}
            <span>조회 한 블록 정보 : <textarea readOnly rows="1" name='viewBlockInfo'  value=""></textarea></span>

        </>
            // <button onClick={handleClick}>채굴</button>
        
    )
}

export default Index