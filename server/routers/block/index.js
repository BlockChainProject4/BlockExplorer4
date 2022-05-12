const express = require('express')
const router = express.Router()
const blockControll = require('./block.controll.js')

router.get('/list', blockControll.list)
router.get('/view', blockControll.view)
router.get('/write', blockControll.write)
router.get('/update', blockControll.update)

router.post('/write', blockControll.writeAction)
router.post('/update', blockControll.updateAction)
router.post('/delete', blockControll.deleteAction)

module.exports = router