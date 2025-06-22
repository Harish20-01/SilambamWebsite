const express = require('express');
const router = express.Router();
const {VisitCount} = require('../models/model');

router.get('/', async (req, res) => {
    
  try {
    const data = await VisitCount.findOne();
    if (!data) {
      return res.status(200).json({ count: 0, message: "no data found" });
    }
    return res.status(200).json({ count: data.visitCount, message: "success" });
  } catch (err) {
    return res.status(400).json({ message: "count fetch failed", error: err.message });
  }
});

router.post('/increment', async (req, res) => {
  try {
    let data = await VisitCount.findOne();

    if (!data) {
      data = new VisitCount({ visitCount: 1 });
    } else {
      data.visitCount += 1;
    }

    await data.save();
    return res.status(200).json({ count: data.visitCount, message: "incremented" });
  } catch (err) {
    return res.status(400).json({ message: "count update failed", error: err.message });
  }
});

module.exports = router;
