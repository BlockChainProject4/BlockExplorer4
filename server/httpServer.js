// 웹에 명령어를 입력해서 내 노드를 제어하는 서버
//const express = require('express')
import cors from "cors"
import express from 'express'
import bodyParser from 'body-parser'
import blocks from './router/blocks.js'
import transactions from './router/transaction.js'

// 초기화 함수
const initHttpServer = (myHttpPort) => {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors({
        origin : true,
        credentials : true
    }))

    app.get('/', (req, res) => {
        res.send('기본페이지 입니다.')
    })

    app.use('/blocks',blocks)
    
    app.use('/transactions',transactions)

    app.listen(myHttpPort, () => {
        console.log('listening httpServer Port : ', myHttpPort);
    })
}

export { initHttpServer }