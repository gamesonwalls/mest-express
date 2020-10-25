const express = require('express');
const router= express.Router();



router.get('/', (req,res)=>{
    res.send('Get all authors')
})

router.get('/:authorId', (req,res)=>{
    res.send('Get specific author')
})


router.get('/:authorId/books', (req,res)=>{
    res.send('Get all books by authors')
})


/// Post request

router.post('/', (req,res)=>{
    res.send('Get all authors')
})

//Delete Request

router.delete('/authors/:authorId', (req,res)=>{
    res.send('Delete an author')
})

module.exports=router;