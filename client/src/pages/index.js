import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import {React, useState} from 'react';
import './index.css'
// import { TextField } from "@material-ui/core";
import TextField from '@mui/material/TextField';

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
        <div>
            <div>
                <div className='maintitle'>
                    <h1>Create BLOCK</h1>
                </div>
            </div>
            <div className='maincontainer'>
                <div className='coinminingcontainer'>
                    <div>
                        <TextField id="standard-basic"  color="secondary" type="number" label="MINING NUMBER" variant="standard" onChange={handleChange_MINE}  />
                        <Button size="lg" variant="dark" onClick={handleClick_MINE}>MINING</Button>
                    </div>
                    <div className='textinfo'>
                        <p> About Mined Blocks </p> 
                    </div>
                    <div><textarea className='blockinfo' readOnly rows="1" name='mineBlockInfo' value="{}"></textarea></div>
                </div>
                <div className='blockinfocontainer'>
                    <div>
                        <TextField id="standard-basic"  color="secondary" type="text"  name="idxNum" label="CHECK BLOCK INFO" variant="standard" onChange={handleChange_VIEW}  />
                        <Button size="lg" variant="dark" onClick={handleClick_VIEW}>CHECK</Button>
                    </div>
                    <div className='textinfo' > 
                        <p>Viewed block information</p>
                    </div>
                    <div> <textarea className='blockinfo' readOnly rows="1" name='viewBlockInfo' value={bringData.idx == undefined ? "1" : BlockInfo}></textarea></div>
                </div>
            </div>    
        </div>   
    )
}

export default Index