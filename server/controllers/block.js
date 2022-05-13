// 블록체인 관련 함수
// 블록 구조 설계
/* 
    index : 블록체인의 높이
    data : 블록에 포함된 모든 데이터 (트랜잭션 포함)
    timestamp : 블록이 생성된 시간
    hash : 블록 내부 데이터로 생성한 sha256 값 (블록의 유일성)
    previousHash : 이전 블록의 해쉬 (이전 블록을 참조)
*/

import CryptoJS from 'crypto-js';
import random from 'random';
import { getCoinbaseTransaction, getTransactionPool, getUnspentTxOuts, processTransaction, updateTransactionPool } from './transcation.js'
import { getPublicKeyFromWallet } from './wallet.js'

const BLOCK_GENERATION_INTERVAL = 10;       // SECOND(테스트할때) 블록 생성 주기 
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;  //  난이도 조절 주기, 난이도를 언제 변경할껀지 시간단위가 아닌 몇번째 블록이 형성될때마다 난이도를 체크할껀지 확인 generate block count
class Block {
    constructor(index, data, timestamp, hash, previousHash, difficulty, nonce)
    {
        this.index = index;
        this.data = data;
        this.timestamp = timestamp;
        this.hash = hash;
        this.previousHash = previousHash;
        this.difficulty = difficulty;
        this.nonce = nonce;
    }
}
// blocks 배열에 push된 것들을 return 해줌으로 모든 블록들을 불러오는 함수
const getBlocks = () => {
    return blocks;
}
// 가장 최근에 생성된 블록을 불러오는 함수
const getLatestBlock = () => {
    return blocks[blocks.length - 1];
}
// nonce : 문제  () 전부 더해서 tosring으로 만들어서 cryptos.sha256 암호화
const calculateHash = (index, data, timestamp, previousHash, difficulty, nonce) => 
    CryptoJS.SHA256((index + data + timestamp + previousHash + difficulty + nonce).toString()).toString();

// 0 두 개로 시작하는 hash값을 만드는 매개변수(nonce)를 찾는다.
// 16진수 64자리
// 16진수 1자리 -> 2진수 4자리 256개의 0과 1로 표현

const createGenesisBlock = () => {
    const genesisBlock = new Block(0, 'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks', 0, 0, 0, 1, 0);
    
    genesisBlock.hash = calculateHash(genesisBlock.index, genesisBlock.data, genesisBlock.timestamp,
                        genesisBlock.previousHash, genesisBlock.difficulty, genesisBlock.nonce);

    return genesisBlock;
}

// 다음에 만들어질 블록이 어떤형식으로 되있을 것인지에 대한 base
const createBlock = (blockData) => {
    const previousBlock = blocks[blocks.length - 1];
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = new Date().getTime() / 1000;
    const nextDifficulty = getDifficulty();
    const nextNonce = findNonce(nextIndex, blockData, nextTimestamp, previousBlock.hash,
        nextDifficulty);
    const nextHash = calculateHash(nextIndex, blockData, nextTimestamp, previousBlock.hash,
                            nextDifficulty, nextNonce);

    const newBlock = new Block(nextIndex, blockData, nextTimestamp, nextHash, previousBlock.hash,
                            nextDifficulty, nextNonce);

    return newBlock;
}
// 트랜잭션풀 : 거래라는 내용이 들어가면서 우리가 가진 블록체인이 화폐로써의 가치를 인정받게 되는데 내가 보유한 코인을 다른사람에게 보냈다. 그리고 그 받은 내용이 증명될 때
// 트랜잭션에 트랜잭션 풀이 쌓여있고 블록이 생성되면서 트랜잭션을 처리한다. 트랜잭션풀이 비어 있으면 블록을 채굴했다고 하더라도 올릴필요는 없지만 코인베이스 트랜잭션만 생성된다.
const createNextBlock = () => {
    // 1. 코인베이스 트랜잭션 생성
    const coinbaseTx = getCoinbaseTransaction(getPublicKeyFromWallet(), getLatestBlock().index + 1) //index++ 이라고 쓰면 안된다 마지막 블록의 값을 바꿔버리기 때문에
    // 2. 생성된 코인베이스 트랜잭션 뒤에 현재 보유 중인 트랜잭션 풀의 내용을 포함 (마이닝된 블록의 데이터)
    const blockData = [coinbaseTx].concat(getTransactionPool());
    return createBlock(blockData);
}
// 유효성 검사까지 해서 추가 블록을 추가 시켜줌 탈락된 블록은 넣지않는다.
const addBlock = (newBlock, previousBlock) => {
    if (isValidNewBlock(newBlock, previousBlock)) {
        blocks.push(newBlock);

        // 사용되지 않은 txOuts를 셋팅
        processTransaction(newBlock.data, getUnspentTxOuts(), newBlock.index);
        // 트랜잭션 풀 업데이트
        updateTransactionPool(unspentTxOuts); // 블록체인 자체가 바낄때마다 이 동작을 해준다.

        return true;
    }
    return false;
}

// 블록의 무결성 검증
/*
    블록의 인덱스가 이전 블록인덱스보다 1 크다.
    블록의 previousHash가 이전 블록의 hash이다.
    블록의 구조가 일치해야 한다.
*/
const isValidBlockStructure = (newBlock) => {
    if (typeof (newBlock.index) === 'number'
        && typeof (newBlock.data) === 'string'
        && typeof (newBlock.timestamp) === 'number'
        && typeof (newBlock.hash) === 'string'
        && typeof (newBlock.previousHash) === 'string'
        && typeof (newBlock.difficulty) === 'number'
        && typeof (newBlock.nonce) === 'number') {
        return true;
    }

    return false;
}

// 유효성 검사
const isValidNewBlock = (newBlock, previousBlock) => {
    if (newBlock.index !== previousBlock.index + 1) {
        console.log('invalid index');
        return false;
    }
    else if (newBlock.previousHash !== previousBlock.hash) {
        console.log('invalid previous hash');
        return false;
    }
    else if (isValidBlockStructure(newBlock) == false) {
        console.log('invalid block structure');
        return false;
    }

    return true;
}

// 문제 해결을 검사하는 함수
const hashMatchDifficulty = (hash, difficulty) => {
    const binaryHash = hexToBinary(hash);
    const requiredPrefix = '0'.repeat(difficulty);

    return binaryHash.startsWith(requiredPrefix);
}

const hexToBinary = (hex) => {
    const lookupTable = {
        '0' : '0000', '1' : '0001', '2' : '0010', '3' : '0011',
        '4' : '0100', '5' : '0101', '6' : '0110', '7' : '0111',
        '8' : '1000', '9' : '1001', 'a' : '1010', 'b' : '1011',
        'c' : '1100', 'd' : '1101', 'e' : '1110', 'f' : '1111'
    }

    // '03cf' 
    // 0000001111001111
    let binary = '';
    for(let i = 0; i < hex.length; i++)
    {
        if (lookupTable[hex[i]]) {
            binary += lookupTable[hex[i]];
        }
        else {
            console.log('invalid hex : ', hex);
            return null;
        }
    }

    return binary;
}

// 
const findNonce = (index, data, timestamp, previousHash, difficulty) => {
    let nonce = 0;

    while(true)
    {
        let hash = calculateHash(index, data, timestamp, previousHash, difficulty, nonce);

        if (hashMatchDifficulty(hash, difficulty)) {
            return nonce;
        }
        nonce++;
    }
}

const isValidBlockchain = (receiveBlockchain) => {
    // 같은 제네시스 블록인가
    if (JSON.stringify(receiveBlockchain[0]) !== JSON.stringify(getBlocks()[0])){
        console.log('같은 제네시스 블록이 아님');
        console.log(receiveBlockchain[0]);
        console.log('-------------------------')
        console.log(getBlocks()[0]);
        return false;
    }

    // 체인 내의 모든 블록을 확인
    for (let i = 1; i < receiveBlockchain.length; i++)
    {
        if (isValidNewBlock(receiveBlockchain[i], receiveBlockchain[i - 1]) == false)
        {
            console.log(i - 1, '번 블록과 ', i, '번 블록이 문제');
            console.log(receiveBlockchain[i - 1]);
            console.log(receiveBlockchain[i]);
            return false;
        }
    }

    console.log('블록체인 확인 완료')
    return true;
}
// 통째로 교환할 필요가 있을 때
const replaceBlockchain = (receiveBlockchain) => {
    console.log(receiveBlockchain);
    if (isValidBlockchain(receiveBlockchain))
    {
        //let blocks = getBlocks();
        if ((receiveBlockchain.length > blocks.length) || receiveBlockchain.length == blocks.length && random.boolean())
        {
            console.log('받은 블록체인 길이가 길다'); 
            blocks = receiveBlockchain;

            // 사용되지 않은 txOuts를 셋팅
            const latestBlock = getLatestBlock();
            processTransaction(latestBlock.data, getUnspentTxOuts(), latestBlock.index);

            // 트랜잭션 풀 업데이트
            updateTransactionPool(unspentTxOuts); // 블록체인 자체가 바낄때마다 이 동작을 해준다.
        }
        else
        {
            console.log('받은 블록체인 길이가 같다');
            blocks = receiveBlockchain;

            // 사용되지 않은 txOuts를 셋팅

            // 트랜잭션 풀 업데이트
            updateTransactionPool(unspentTxOuts); // 블록체인 자체가 바낄때마다 이 동작을 해준다.
        }
    }
    else 
    {
        console.log('받은 블록체인에 문제가 있음');
    }
}
// 마지막 만들어낸 블록과 지금 만들어낸 블록의 시간차이를 계산한다.
const getAdjustmentDifficulty = () => {
    // 현재 만들 블록의 시간, 마지막으로 난이도 조정된 시간 을 확인해서 우리가 예상한 시간보다(interval) 크면 난이도를 줄이고 그시간보다 크면 난이도를 늘린다.
    const prevAdjustedBlock = blocks[blocks.length - DIFFICULTY_ADJUSTMENT_INTERVAL - 1]; //[마지막으로 조정된 블록] -1 을 해야 정확하게 10개씩 차이가 난다.
    const latestBlock = getLatestBlock(); // 경과시간
    const elaspedTime = (latestBlock.timestamp - prevAdjustedBlock.timestamp) / 1000;
    const expectedTime = DIFFICULTY_ADJUSTMENT_INTERVAL * BLOCK_GENERATION_INTERVAL;

    if  (elaspedTime > expectedTime * 2)  
    {
        return prevAdjustedBlock.difficulty - 1 ;

        // 난이도를 낮춘다. 
    }
    else if (elaspedTime > expectedTime / 2)
    {
        return prevAdjustedBlock.difficulty + 1; 
        // 난이도를 높인다.
    }
    else
    {
        return prevAdjustedBlock.difficulty; // 시간이 동일시 하면 이전의 난이도를 똑같이쓴다.
    }
}

const getDifficulty = () => { // 현재의 난이도를 알아오는 함수, 현재 난이도의 정보는 블록에 들어있고, 가장 최신화된 닌이도 정보는 마지막 블록에 있다.
    const latestBlock = getLatestBlock();

    // 난이도 조정 주기 확인
    if  (latestBlock.index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && // 인덱스의 나머지 값을 확인해서 난이도를 조절한다.
        latestBlock.index !==0) {
            return getAdjustmentDifficulty();
        }
    return latestBlock.difficulty; // 가장 최근에 생성된 블록의 난이도
    // DIFFICULTY_ADJUSTMENT_INTERVAL
}

const genesisBlock = createGenesisBlock();
genesisBlock.data = getCoinbaseTransaction(getPublicKeyFromWallet(), getLatestBlock().index + 1) // coinbasetransaction

let blocks = [genesisBlock];

export { getBlocks, getLatestBlock, createBlock, addBlock, isValidNewBlock, replaceBlockchain }