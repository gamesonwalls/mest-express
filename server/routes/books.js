const express = require('express');
const router= express.Router();
const path = require('path');
var fs = require('fs');

router.get('/', (req,res)=>{
    res.send('Ger books')
})

router.get('/:bookId', (req,res)=>{
   console.log("req body",req.params.bookId)

            try {
                fs.readFile(path.resolve(__dirname, '../books.json'), function (err, data) {
                
                    let json = JSON.parse(data)
                    console.log("json",json)
                
  
                })
            } catch(err) {
        
                 console.error("Error reading file",err);
            }
})

///Post Request

router.post('/', (req,res)=>{
    res.send('Post Books')
})

//Delete Request

router.delete('/:bookId', (req,res)=>{
    res.send('Delete book by id')
})
module.exports=router;