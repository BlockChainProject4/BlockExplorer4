const express = require('express')
const router = express.Router()
const blockRouter = require('./block')

router.get('/', (req, res) => {
  res.send('blockinfo')
})

router.use('/block', blockRouter)

module.exports = router