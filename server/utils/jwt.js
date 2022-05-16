// const crypto = require('crypto-js')
import crypto from 'crypto'

//header 
const header = {
  "alg": "HS256",
  "typ": "JWT"
}
//payload
const payload = {
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}

const encoding = (value) => {
  return  Buffer.from( JSON.stringify(value))
                .toString('base64')
                .replace(/[=]/g,'')
}

//토큰을 만들어주는 함수
const createToken = (state) => {
  const salt = 'ingoo'
  const header = {"alg": "HS256","typ": "JWT"}
  const payload = {...state}

  const encodingHeader = encoding(header)
  const encodingPayload = encoding(payload)
  const encodingSigature = crypto.createHmac('sha256', salt)
                                  .update(`${encodingHeader}.${encodingPayload}`)
                                  .digest('base64')
                                  .replace(/[=]/g,'')
  return `${encodingHeader}.${encodingPayload}.${encodingSigature}`
}


createToken( { name : 'ingoo', age : 33 } )

export default createToken