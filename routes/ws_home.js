const express = require('express');
const router = express.Router();

router.post('/', (req,res) => {
//Create Method
});

router.get('/', (req,res) => {
//Read Method
res.send('HOME PAGE');
});

router.put('/', (req,res) => {
//Update Method
});

router.delete('/', (req,res) => {
//Delete Method
});

module.exports = router;