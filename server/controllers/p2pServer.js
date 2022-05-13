// 다른 노드와 통신을 위한 서버
import WebSocket from 'ws'
import { WebSocketServer } from 'ws'
import { getBlocks, getLatestBlock, createBlock, addBlock, replaceBlockchain } from './block.js'
import { getTransactionPool, addToTransactionPool } from './transcation.js'

const MessageType = {
    // RESPONSE_MESSAGE : 0,
    // SENT_MESSAGE : 1

    // 최신 블록 요청
    QUERY_LATEST : 0,
    // 모든 블록 요청
    QUERY_ALL : 1,
    // 블록 전달
    RESPONSE_BLOCKCHAIN : 2,
    QUERY_TRANSACTION_POOL : 3,
    RESPONSE_TRANSACTION_POOL : 4
}

const sockets = [];

const getPeers = () => {
    return sockets;
}

const initP2PServer = (p2pPort) => {
    const server = new WebSocketServer({port:p2pPort});
    server.on('connection', (ws) => {
        initConnection(ws);
    })

    console.log('listening P2PServer Port : ', p2pPort);
}

const initConnection = (ws) => {
    sockets.push(ws);
    initMessageHandler(ws);

    write(ws, queryAllMessage());
}

const connectionToPeer = (newPeer) => {
    console.log(newPeer);
    const ws = new WebSocket(newPeer);
    ws.on('open', () => { initConnection(ws); console.log('Connect peer : ', newPeer); })
    ws.on('error', () => { console.log('Fail to Connection peer : ', newPeer); })
}

const initMessageHandler = (ws) => {
    ws.on('message', (data) => {
        const message = JSON.parse(data);

        switch(message.type)
        {
            // case MessageType.SENT_MESSAGE:      // 메시지 받았을 때
            //     console.log(ws._socket.remoteAddress, ' : ', message.message);
            //     break;
            case MessageType.QUERY_LATEST:
                break;
            case MessageType.QUERY_ALL:
                write(ws, responseAllMessage());
                break;
            case MessageType.RESPONSE_BLOCKCHAIN:
                console.log(ws._socket.remoteAddress, ' : ', message.data);
                // replaceBlockchain(message.data);
                handleBlockchainResponse(message.data);
                break;
            case MessageType.QUERY_TRANSACTION_POOL:
                write(ws, responseTransactionPoolMessage());
                break;
            case MessageType.RESPONSE_TRANSACTION_POOL:
                handleTransactionPoolResponse(message.data);
                break;
        }
    })
}

// const isValidBlockchain = (receiveBlockchain) => {
//     // 같은 제네시스 블록인가
//     if (JSON.stringify(receiveBlockchain[0]) !== JSON.stringify(getBlocks()[0])){
//         console.log('같은 제네시스 블록이 아님');
//         console.log(receiveBlockchain[0]);
//         console.log('-------------------------')
//         console.log(getBlocks()[0]);
//         return false;
//     }

//     // 체인 내의 모든 블록을 확인
//     for (let i = 1; i < receiveBlockchain.length; i++)
//     {
//         if (isValidNewBlock(receiveBlockchain[i], receiveBlockchain[i - 1]) == false)
//         {
//             console.log(i - 1, '번 블록과 ', i, '번 블록이 문제');
//             console.log(receiveBlockchain[i - 1]);
//             console.log(receiveBlockchain[i]);
//             return false;
//         }
//     }

//     console.log('블록체인 확인 완료')
//     return true;
// }

// const replaceBlockchain = (receiveBlockchain) => {
//     const newBlocks = JSON.parse(receiveBlockchain);
//     console.log(newBlocks);
//     if (isValidBlockchain(newBlocks))
//     {
//         //let blocks = getBlocks();
//         if (newBlocks.length > blocks.length)
//         {
//             console.log('받은 블록체인 길이가 길다');
//             blocks = newBlocks;
//         }
//         else if (newBlocks.length == blocks.length && random.boolean())
//         {
//             console.log('받은 블록체인 길이가 같다');
//             blocks = newBlocks;
//         }
//     }
//     else {
//         console.log('받은 블록체인에 문제가 있음');
//     }
// }

const handleBlockchainResponse = (receiveBlockchain) => {
    const newBlocks = JSON.parse(receiveBlockchain);
    // 받아온 블록의 마지막 인덱스가 내 마지막 블록의 인덱스보다 크다.
    const latestNewBlock = newBlocks[newBlocks.length - 1];
    console.log('받아온 마지막 블록', latestNewBlock);
    const latesMyBlock = getLatestBlock();
    console.log('내 마지막 블록', latesMyBlock);

    if (latestNewBlock.index > latesMyBlock.index)
    {
        // 받아온 마지막 블록의 previousHash와 내 마지막 블록의 hash를 확인한다.
        if(latestNewBlock.previousHash === latesMyBlock.hash)
        {
            if(addBlock(latestNewBlock, latesMyBlock))
            {
                // 제한된 플러딩을 사용한다. flooding
                broadcasting(responseLatestMessage()); // addBlock이 성공하면 broadcasting
            }
        }
        // 받아온 블록의 전체 크기가 1인 경우 -> 재요청
        else if (newBlocks.length === 1)
        {
            broadcasting(queryAllMessage());
        }

        // 그외 
        // 받은 블록체인보다 현재 블록체인이 더 길거나 (안 바꿈)
        // 같으면. (바꾸거나 안 바꿈)
        // 받은 블록체인이 현재 블록체인보다 길면 바꾼다.
        else 
        {
            replaceBlockchain(newBlocks);
        }
    }
}
// transactionPool에 새로운애들이 들어올때 걸러주는 역할을 처리 해준다.
const handleTransactionPoolResponse = (receiveTransactionPool) => {
    console.log('receiveTransactionPool : ', receiveTransactionPool);
    
    receiveTransactionPool.forEach((transaction) => {
        addToTransactionPool(transaction);
        // 중복검사

        // 트랜잭션 풀에 추가 

        // 다시 전파
    })

}

const queryLatestMessage = () => {
    return ({ 
            "type":MessageType.QUERY_LATEST,
            "data":null  })
}

const queryAllMessage = () => {
    return ({ 
            "type":MessageType.QUERY_ALL,
            "data":null  })
}

const responseLatestMessage = () => {
    return ({ 
        "type":MessageType.RESPONSE_BLOCKCHAIN,
        "data":JSON.stringify([getLatestBlock()])  }) // 형태가 다르기 때문에 받는 입장에서 다르게 해석해야한다. 하나만 넘겨줄때도 배열 형태도 넘겨주기위해 []을 사용
}

const responseAllMessage = () => {
    return ({ 
        "type":MessageType.RESPONSE_BLOCKCHAIN,
        "data":JSON.stringify(getBlocks())  })
}

const responseTransactionPoolMessage = () => {
    return ({
        "type":MessageType.RESPONSE_TRANSACTION_POOL,
        "data":JSON.stringify(getTransactionPool())
    })
}

const write = (ws, message) => {
    console.log('write() ', ws._socket.remoteAddress, ' : ', message);
    ws.send(JSON.stringify(message));
}

const broadcasting = (message) => {
    sockets.forEach( (socket) => {
        write(socket, message);
    });
}

const mineBlock = (blockData) => {
    const newBlock = createBlock(blockData);
    if (addBlock(newBlock, getLatestBlock()))
    {
        broadcasting(responseLatestMessage());
    }
}

// 내가 새로운 블록을 채굴했을 때 연결된 노드들에게 전파


export { initP2PServer, connectionToPeer, getPeers, broadcasting, mineBlock }