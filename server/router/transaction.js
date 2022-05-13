import express from "express"
const router = express.Router();

// 거래??
router.post('/sendTransaction', (req,res) => {
  // transaction out에 필요한 데이터
  const address = req.body.address;
  const amount = req.body.amount;

  res.send(sendTransaction(address, amount)); 
})

export default router;