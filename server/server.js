const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const router = require('./routers')

import { getBlocks, createBlock } from './controllers/block'
import { connectionToPeer, getPeers, mineBlock } from './controllers/p2pServer.js'
import { getPublicKeyFromWallet } from './controllers/wallet.js'

app.use(express.urlencoded({extended : true}))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json())
app.use(cors({
    origin : true,
    credentials : true,
}))

app.get('/', (req, res) => {
    res.send('Hello, World!');
})
//blocks//select
app.get('/blocks', (req, res) => {
    res.send("getBlocks()");
})

//blocks//write
app.post('/createBlock', (req, res) => {
    res.send("createBlock(req.body.data)");        
})

//blocks//write
app.post('/mineBlock', (req, res) => {
    res.send("mineBlock(req.body.data)");
})

//peers
app.get('/peers', (req, res) => {
    res.send("getPeers()");
})

//peers//write
app.post('/addPeer', (req, res) => {
    console.log('/addPeer : ',req.body.message);
    res.send("connectionToPeer(req.body.data)");
})

//transaction//write
app.post('/sendTransaction', (req,res) => {
    // transaction out에 필요한 데이터
    const address = req.body.address;
    const amount = req.body.amount;

    res.send("sendTransaction(address, amount)");
})

//wallet
app.get('/address', (req, res) => {
    const address = getPublicKeyFromWallet();
    res.send(" {'address' : address } ");
    // res.send( `address : ${ address }`);
})

app.listen(3001, () => {
    console.log('3001 port running')
})