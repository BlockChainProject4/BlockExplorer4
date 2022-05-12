const pool = require('../../db')

const list = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM board")
    res.render('board/list', {
      items : result
    })
  } catch (e) {
    console.log('글 목록 로딩 실패')
  }
}

const view = async (req, res) => {
  try {
    const [[result]] = await pool.query(`SELECT * FROM board WHERE idx = ${req.query.idx}`)
    res.render('board/view', {
      item : result
    })
  } catch (e) {
    console.log('글 페이지 로딩 실패!!')
  }
}


const update = (req, res) => {
  res.render('board/update' ,{
    idx : req.query.idx
  })
}

const write = (req, res) => {
  res.render('board/write')
}

const writeAction = async (req, res) => {
  const {subject, name, content } = req.body;
  try {
    await pool.query(`INSERT INTO board(subject, content, name) VALUES("${subject}", "${content}", "${name}")`)
    res.redirect('/board/list')
  } catch (e) {
    console.log('새 글 등록 실패')
  }
}

const updateAction = async (req, res) => {
  const { subject, name, content } = req.body;
  const { idx } = req.query;
  try {
    await pool.query(`UPDATE board SET subject="${subject}", content="${content}", name="${name}" WHERE idx=${idx}`)
    res.redirect(`/board/list`)
  } catch (e) {
    console.log('글 수정 실패')
  }
}

const deleteAction = async (req, res) => {
  const { idx } = req.query;
  try {
    await pool.query(`DELETE FROM board WHERE idx=${idx}`)
    res.redirect(`/board/list`)
  } catch (e) {
    console.log('삭제 실패')
  }
}

module.exports = {
  list,
  update,
  write,
  view,
  writeAction,
  updateAction,
  deleteAction
}