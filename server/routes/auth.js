const express = require('express');
const router= express.Router();



router.post('/login', (req,res)=>{
    res.send('Login as admin')
})

router.post('/logout', (req,res)=>{
    res.send('Logout')
})


module.exports=router;