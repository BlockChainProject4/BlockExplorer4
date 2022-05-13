/*
    암호화 

    탈중앙화
    분산원장관리

    기밀성 : 정보는 일반적으로는 수정이 가능한데, 이는 권한이 있는 사용자에게만 허가
    무결성 : 정보를 저장하고 전송하면서 부적절한 노출을 방지, 정보 보안의 주된 목적 
    가용성 : 활용되어야할 정보에 접근할 수 없다면, 기밀성과 무결성이 훼손된 것만큼이나 무의미하다.

    지갑 : 키를 생성하거나 관리해주는 역할
    private Key
    public Key

    타원 곡선 디지털 서명 알고리즘 (ECDSA)

    영지식증명 (Zero Knowledge Proof)

    증명하는 사람(A), 증명을 원하는 사람(B)
    A와 B는 증명된 내용에 합의'
    그 외의 사람들은 동의하지 않습니다.
    증명하는 과정에서 A는 B에게 아무런 정보도 주지 않는다.
*/

import ecdsa from 'elliptic';
import fs from 'fs'; // FileSystem

const ec = new ecdsa.ec('secp256k1'); // 암호화 알고리즘중 하나
const privateKeyLocation = 'wallet/' + (process.env.PRIVATE_KEY || 'default'); // privatekey가 환경변수에 설정되어 있으면 가져오고 없으면 
const privateKeyFile = privateKeyLocation + '/private_key';

const createPrivateKey = () => {
    const keyPair = ec.genKeyPair();
    const privateKey = keyPair.getPrivate();
    // console.log(privateKey);
    // console.log(privateKey.toString(16)); // 16진수로 바꾸기

    return privateKey.toString(16);
}

// 지갑 초기화 과정
const initWallet = () => {
    // 이미 만들어져 있을 때
    if (fs.existsSync(privateKeyFile)) 
    {
        console.log('지갑에 비밀키가 만들어져 있음');
        return;
    }

    // if (fs.existsSync('wallet/') === false) 아래와 같음
    if (!fs.existsSync('wallet/')) { fs.mkdirSync('wallet/'); }
    if (!fs.existsSync(privateKeyLocation)) { fs.mkdirSync(privateKeyLocation); }

    const privateKey = createPrivateKey();
    fs.writeFileSync(privateKeyFile, privateKey);
}

const getPrivateKeyFromWallet = () => {
    const buffer = fs.readFileSync(privateKeyFile, 'utf-8');
    return buffer.toString();
    // console.log(buffer);
}

const getPublicKeyFromWallet = () => {
    const privateKey = getPrivateKeyFromWallet();
    const publicKey = ec.keyFromPrivate(privateKey, 'hex');

    // TODO : 131자리 확인 public키는 전부 04로 시작한다.
    // 041bbee29557bc3da4a4296558f2837bde59ebc8e50fb7d34d77250573f6b2b0295f6bcf5b381a25f465e8f12c8391b251ce5f87a7228537f5c758ad66144bd390
    return publicKey.getPublic().encode('hex');
}

export { getPublicKeyFromWallet , initWallet, getPrivateKeyFromWallet }