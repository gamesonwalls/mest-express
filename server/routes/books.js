const express = require('express');
const router= express.Router();
const path = require('path');
var fs = require('fs');

const { v4: uuidv4 } = require('uuid');

router.get('/', (req,res)=>{
    try {
        fs.readFile(path.resolve(__dirname, '../books.json'), function (err, data) {
        
            let json = JSON.parse(data)
            console.log("json",json)
            
        

        })
    } catch(err) {

         console.error("Error reading file",err);
    }
})

router.get('/:bookId', (req,res)=>{
   console.log("req body",req.params.bookId)

            try {
                fs.readFile(path.resolve(__dirname, '../books.json'), function (err, data) {
                
                    let json = JSON.parse(data)
                   let foundOut= json.find(({id})=> {
                       
                       return id==parseInt(req.params.bookId)
                    })

                    res.status(200).send(foundOut)
                    
                
  
                })
            } catch(err) {
        
                 console.error("Error reading file",err);
            }
})

///Post Request

router.post('/', (req,res)=>{
    //res.send('Post Books')

    // if(req.body.username==='stepetu@gmail.com' && req.password)
            let uidUnique=uuidv4();
            let dataToSave={}
            dataToSave.name=req.body.name
            dataToSave.rating=req.body.rating
            dataToSave.books={title:rq.body.title}
            dataToSave.authorId=uidUnique,
            dataToSave.id=uidUnique

    

            try {
                fs.readFile(path.resolve(__dirname, '../books.json'), function (err, data) {
                
                    let json = JSON.parse(data)
                
                    json.push(dataToSave)
                
                    
                   
                        fs.writeFile(path.resolve(__dirname, '../books.json'), JSON.stringify(json), 'utf-8', function(err) {
                            if (err) throw err
                            console.log('Done!')
                           
                            res.status(200).send('Book Saved')
                        })
                })
            } catch(err) {
                // An error occurred
                console.error("Error reading file,err");
            }
})

//Delete Request

router.delete('/:bookId', (req,res)=>{
    res.send('Delete book by id')
})
module.exports=router;