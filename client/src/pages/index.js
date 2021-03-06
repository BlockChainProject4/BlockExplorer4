import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import './index.css'
// import { TextField } from "@material-ui/core";
import { TextField } from '@mui/material';
import { React, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const Index = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies("");
    const [recblock, setRecblock] = useState([]);
    const identification = cookies.token;
    const [mineCount, setMineCount] = useState()
    const [viewData, setViewData] = useState()
    const [data, setData] = useState({
        data: "123"
    })

    const [bringData, setBringData] = useState("")

    const onKeyPress_MINE = (e) => {
        if (e.key == 'Enter') {
            handleClick_MINE()
        }
    }

    const onKeyPress_VIEW = (e) => {
        if (e.key == 'Enter') {
            handleClick_VIEW()
        }
    }


    const handleChange_MINE = (e) => {
        let { name, value } = e.target;

        setMineCount({
            ...mineCount,
            value
        });
    };

    const handleChange_VIEW = (e) => {
        let { name, value } = e.target;

        setViewData({
            ...viewData,
            value
        });
    };

    const handleClick_MINE = async () => {
        if (identification == undefined) {
            Swal.fire({
                title: 'Error!',
                text: 'Please log in and use it!',
                icon: 'error',
                confirmButtonText: 'Back'
            })
            return false;
        }

        if(mineCount == undefined) {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter a value!',
                icon: 'error',
                confirmButtonText: 'Back'
            })
            return false;
        }

        if (mineCount.value <= 0) {
            Swal.fire({
                title: 'Error!',
                text: 'Mining is possible only after entering at least one time!',
                icon: 'error',
                confirmButtonText: 'Back'
            })
            return false;
        }
        else {
            Swal.fire({
                title: 'start!',
                text: `Mining start! Number of runs : ${mineCount.value} times`,
                icon: 'start',
                confirmButtonText: 'OK'
            })
            for (let i = 0; i < mineCount.value; i++) {

                await axios.post('http://localhost:3001/blocks/mine', { data: data, id: identification, count: mineCount })
                Swal.fire({
                    title: 'Success!',
                    text: `Mining ${i + 1} / ${mineCount.value} Completion`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            }
            navigate(0)
        }
    }


    const handleClick_VIEW = async (e) => {
        const blockData = viewData.value
        await axios.post('http://localhost:3001/blocks/view', { blockData })
            .then((res) => {
                if (res.data.message == 1) {
                    alert("?????? ?????? ?????? ???????????????.")
                    navigate(0)
                    Swal.fire({
                        title: 'Error!',
                        text: 'Block does not exist.',
                        icon: 'error',
                        confirmButtonText: 'Back'
                    })
                }
            })
        setTimeout(bringPostData, 100)

    }

    const bringPostData = async () => {
        const result = await axios.get('http://localhost:3001/blocks/view')
        setBringData(result.data[0])
    }

    const recentBlockdata = async () => {
        const response = await axios.get("http://localhost:3001/blocks/recentblock")
        setRecblock(response.data[0])
    }

    useEffect(() => {
        recentBlockdata()
    }, [])

    const BlockInfo = "?????? ?????? : " + bringData.idx + "\n" + "?????? ?????? ?????? : " + bringData.timestamps + "\n" + "?????? ?????? : " + bringData.hashs + "\n" + "?????? ?????? ?????? : " + bringData.previousHash + "\n" + "?????? ????????? : " + bringData.difficulty + "\n" + "Nonce ??? : " + bringData.nonce
    const recentBlockInfo = "?????? ?????? : " + recblock.idx + "\n" + "?????? ?????? ?????? : " + recblock.timestamps + "\n" + "?????? ?????? : " + recblock.hashs + "\n" + "?????? ?????? ?????? : " + recblock.previousHash + "\n" + "?????? ????????? : " + recblock.difficulty + "\n" + "Nonce ??? : " + recblock.nonce

    return (
        <div>
            <div>
                <div className='maintitle'>
                    <h1>Create BLOCK</h1>
                </div>
            </div>
            <div className='maincontainer'>
                <div className='coinminingcontainer'>
                    <div>
                        <TextField onKeyPress={onKeyPress_MINE} id="standard-basic" color="secondary" type="number" label="MINING NUMBER" variant="standard" onChange={handleChange_MINE} />
                        <Button size="lg" variant="dark" onClick={handleClick_MINE}>MINING</Button>
                    </div>
                    <div className='textinfo'>
                        <p> RECENT MINE BLOCK </p>
                    </div>
                    <div><textarea className='blockinfo' readOnly rows="1" name='mineBlockInfo' value={recentBlockInfo}></textarea></div>
                </div>
                <div className='blockinfocontainer'>
                    <div>
                        <TextField id="standard-basic" onKeyPress={onKeyPress_VIEW} color="secondary" type="text" name="idxNum" label="CHECK BLOCK INFO" variant="standard" onChange={handleChange_VIEW} />
                        <Button size="lg" variant="dark" onClick={handleClick_VIEW}>CHECK</Button>
                    </div>
                    <div className='textinfo' >
                        <p>Viewed block information</p>
                    </div>
                    <div> <textarea className='blockinfo' readOnly rows="1" name='viewBlockInfo' value={bringData.idx == undefined ? "" : BlockInfo}></textarea></div>
                </div>
            </div>
        </div>
    )
}

export default Index