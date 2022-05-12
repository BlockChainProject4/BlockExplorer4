const mysql = require('mysql2/promise'); // /promise 객체로 반환해준다는 의미이다.

const pool = mysql.createPool({ //접속가능 횟수 조절
  host:'127.0.0.1',
  user: 'root',
  password : 'dlgPdls3^^',
  database : 'blockexploere'
})

console.log(pool)

module.exports = pool;