const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Driver Home Page');
});

module.exports = router;