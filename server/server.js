const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors({
    origin : true,
    credentials : true,
}))

app.get('/', (req, res) => {
    res.send('GET 메인페이지')
})

app.get('/mine', (req, res) => {
    res.send("Block Info")
})

app.post('/mine', (req, res) => {
    // console.log(req.body)
    res.send('POST 채굴페이지')
})


app.listen(3001, () => {
    console.log('3001 port running')
})