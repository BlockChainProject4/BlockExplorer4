const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
    res.send('채굴')
})

app.listen(3001, () => {
    console.log('3001 port running')
})