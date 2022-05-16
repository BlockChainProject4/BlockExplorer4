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
        await axios.post('http://localhost:3001/blocks/view', { blockData })
        setTimeout(bringPostData, 100)
    }

    const bringPostData = async () => {
        const result = await axios.get('http://localhost:3001/blocks/view')
        setBringData(result.data[0])
    }

    const BlockInfo = "블록 번호 : " + bringData.idx + "\n" + "블록 생성 시간 : " + bringData.timestamps + "\n" + "블록 해시 : " + bringData.hashs + "\n" + "이전 블록 해시 : " + bringData.previousHash + "\n"+ "채굴 난이도 : " + bringData.difficulty + "\n" + "Nonce 값 : " + bringData.nonce

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
            <span>조회 한 블록 정보 : <textarea readOnly rows="1" name='viewBlockInfo' value={bringData.idx == undefined ? "1" : BlockInfo}></textarea></span>

        </>       
    )
}

export default Index