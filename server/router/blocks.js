// import { getBlocks, createBlock } from '../block.js'
// import { connectionToPeer, getPeers, mineBlock } from '../p2pServer.js'
// import { getPublicKeyFromWallet } from '../controller/blocks/wallet.js'
import { getBlocks, createBlock, blocks } from '../controller/blocks/block.js'
import { connectionToPeer, getPeers, mineBlock } from '../controller/blocks/p2pServer.js'
import { getPublicKeyFromWallet, createPrivateKey } from '../controller/blocks/wallet.js'

import express from "express"
import pool from '../db.js'
import ecdsa from 'elliptic';




const router = express.Router();
const ec = new ecdsa.ec('secp256k1');

router.use(express.json())
router.get('/', (req, res) => {
  res.send('Hello, World!');
})

//현재 생성된 블록 조회
router.get('/blocks', (req, res) => {
  res.send(getBlocks());
})

let postResult = [];

//블록 채굴
router.post('/view', async (req, res) => {
  const { blockData } = req.body
  try {
    let [[result]] = await pool.query(`SELECT * FROM blockdata WHERE idx=${blockData} OR datas=${blockData} OR timestamps=${blockData} OR hashs=${blockData} OR previousHash=${blockData} OR difficulty=${blockData} OR nonce=${blockData}`)
    postResult.push(result)
    if(postResult[0] == undefined) {
      res.json({
        message:1
      })
      return
    } else {res.send(postResult)}
  } catch (e) {

  }
})

router.get('/view', (req, res) => {
    res.send(postResult)
    postResult = [];
  
})



//블록 채굴

router.post('/mine', async (req, res) => {
  const {data, id} = req.body;
  res.send(mineBlock(req.body.data.data));
  let blockContent = blocks[blocks.length-1];
    
  try {
    await pool.query(`INSERT INTO blockdata(idx, datas, timestamps, hashs, previousHash, difficulty, nonce, reward) VALUES(${blockContent.index}, "${blockContent.data}", "${blockContent.timestamp}", "${blockContent.hash}", "${blockContent.previousHash}", ${blockContent.difficulty}, ${blockContent.nonce}, ${blockContent.reward})`); 
    await pool.query(`INSERT INTO transaction(sendpublickey, frompublickey, rewards) VALUES("OWNER", "${id}", "50")`);
    await pool.query(`UPDATE wallet SET coinamount = (coinamount + 50) where publickey='${id}'`);
    console.log('New Block 저장 성공!!')
  }
  catch (e) {
    console.log('New Block 저장 실패!!')
  }
})

// 최신 블록 가져오기

router.get("/recentblock", async(req, res) => {
  const [result] = await pool.query(`SELECT * FROM blockdata ORDER BY idx DESC LIMIT 1`)
  res.send(result)
})

// 금액 전송하기
router.post('/trans', async(req, res) => {
  const {user, id} = req.body;
  const [result] = await pool.query(`SELECT publickey FROM wallet`)
  for(let i = 0; i < result.length; i++) {
  if(result[i].publickey == user.address) {
    await pool.query(`UPDATE wallet SET coinamount = (coinamount + ${user.amount} ) where publickey="${user.address}"`);
    await pool.query(`UPDATE wallet SET coinamount = (coinamount - ${user.amount} ) where publickey="${id}"`);
    await pool.query(`INSERT INTO transaction(sendpublickey, frompublickey, rewards) VALUES("${id}", "${user.address}", "${user.amount}")`);
    res.json({message:1})
    return;
  }    
}
  res.json({message:2})
})

// 최근 트랜잭션
router.get("/recentTx", async(req, res) => {
  const [result] = await pool.query(`SELECT sendpublickey, frompublickey, rewards FROM transaction ORDER BY idx DESC LIMIT 10`)
  res.send(result)
})


// 참여 노드 추가
router.post('/addPeer', (req, res) => {
  console.log('/addPeer : ', req.body.message);
  res.send(connectionToPeer(req.body.data));
})


// 지갑생성
router.post('/createwallet', async (req, res) => {
  const { passwd } = req.body;
  const privateKey = createPrivateKey();
  const publicKey = ec.keyFromPrivate(privateKey, 'hex');
  const wallet = publicKey.getPublic().encode('hex').substring(0, 63);
  try {
    await pool.query(`INSERT INTO wallet(publickey, privatekey, passwd) VALUES("${wallet}", "${privateKey}", "${passwd}")`)
  } catch (e) {
    console.log("지갑 생성 실패")
  }
})

router.get("/signinfo", async (req, res) => {
  const [result] = await pool.query(`SELECT * FROM wallet ORDER BY idx DESC LIMIT 1`);
  res.send(result);
})

// 로그인 

router.use("/login", async (req, res) => {
  const AllKey = [];
  const { publickey, passwd } = req.body;
  const [idResult] = await pool.query(`SELECT publickey, passwd FROM wallet`);
  for (let i = 0; i < idResult.length; i++) {
    AllKey.push(idResult[i].publickey, idResult[i].passwd)
  }
  const ValidLogin = () => {
    for (let j = 0; j < AllKey.length; j++) {
      if (publickey == AllKey[j] && passwd == AllKey[j + 1]) {
        return true;
      }
    }
  }

  if(ValidLogin()) {
    console.log('validlogin')
    const token = publickey
    res.cookie("token", token).status(200).send({message: "로그인 성공"})
    // res.json({})
    // res.send({heidi:publickey})
  } else {
    res.status(200).send({
      message: "로그인 실패"
    })
  }
})

// ==================== 일단 보관 ==================
router.post('/createBlock', (req, res) => {
  res.send(createBlock(req.body.data));
})


export default router;