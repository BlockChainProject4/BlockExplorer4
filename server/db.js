const mysql = require('mysql2/promise'); // /promise 객체로 반환해준다는 의미이다.

const pool = mysql.createPool({ //접속가능 횟수 조절
  host:'127.0.0.1',
  user: 'root',
  password : 'dlgPdls3^^',
  database : 'blockexplorer'
})

console.log(pool)

//쿼리 함수 제작

// async function select(){
//   try{
//     const sql = "SELECT * FROM board"
//     const [ result ] = await pool.query(sql)  //Pool.query는 쿼리도 쓰고 반환(풀릴리즈)도 한번에 해줌
//     console.log(result)
//   } catch(e) {
//     console.log('에러발생!!!!')
//   }
// }

// select();

module.exports = pool;