// import { getBlocks, createBlock } from '../block.js'
// import { connectionToPeer, getPeers, mineBlock } from '../p2pServer.js'
// import { getPublicKeyFromWallet } from '../controller/blocks/wallet.js'
import { getBlocks, createBlock, blocks } from '../controller/blocks/block.js'
import { connectionToPeer, getPeers, mineBlock } from '../controller/blocks/p2pServer.js'
import { getPublicKeyFromWallet } from '../controller/blocks/wallet.js'

import express from "express"
import pool from '../db.js'

const router = express.Router();


router.get('/', (req, res) => {
  res.send('Hello, World!');
})

//현재 생성된 블록 조회
router.get('/blocks', (req, res) => {
  res.send(getBlocks());
})

//블록 채굴
router.post('/mineBlock', async (req, res) => {
  res.send(mineBlock(req.body.data));
  let blockContent = blocks[blocks.length-1];
    
  try {
    await pool.query(`INSERT INTO blockdata(idx, datas, timestamps, hashs, previousHash, difficulty, nonce) VALUES(${blockContent.index}, "${blockContent.data}", "${blockContent.timestamp}", "${blockContent.hash}", "${blockContent.previousHash}", ${blockContent.difficulty}, ${blockContent.nonce})`)
  }
  catch (e) {
    console.log('New Block 저장 실패!!')
  }
})

//참여 노드 조회
router.get('/peers', (req, res) => {
  res.send(getPeers());
})

// 참여 노드 추가
router.post('/addPeer', (req, res) => {
  console.log('/addPeer : ',req.body.message);
  res.send(connectionToPeer(req.body.data));
})


// 지갑주소
router.get('/address', (req, res) => {
  const address = getPublicKeyFromWallet();
  res.send( {'address' : address });
  // res.send( `address : ${ address }`);
})

// ==================== 일단 보관 ==================
router.post('/createBlock', (req, res) => {
  res.send(createBlock(req.body.data));        
})


export default router;