const express = require('express');
const router= express.Router();
const path = require('path');
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const  authorModel=require('../model/authorModel');
const { authorId } = require('../model/authorModel');

router.get('/', (req,res)=>{
   

    try {
        fs.readFile(path.resolve(__dirname, '../authors.json'), function (err, data) {
        
            let json = JSON.parse(data)
            res.status(200).send(json)
            

        })
    } catch(err) {

         console.error("Error reading file",err);
    }
})

router.get('/:authorId', (req,res)=>{
    //res.send('Get specific author')
   

    try {
        fs.readFile(path.resolve(__dirname, '../authors.json'), function (err, data) {
        
            let json = JSON.parse(data)
            let index2 = json.findIndex(x=> x.authorId===req.params.bookId);

            res.status(200).send(json(index2))
        

        })
    } catch(err) {

         console.error("Error reading file",err);
    }
})


router.get('/:authorId/books', (req,res)=>{
   // res.send('Get all books by authors')
  // console.log("req",req)

    try {
        fs.readFile(path.resolve(__dirname, '../authors.json'), function (err, data) {
        
            let json = JSON.parse(data)
           // res.send(json)
           // let index2 = json.findIndex(x=> x.authorId===req.params.bookId);

            let conditionedArray= json.filter(data=> data.authorId===req.params.authorId);
             res.status(200).send(conditionedArray)
        

        })
    } catch(err) {

         console.error("Error reading file",err);
    }
})


/// Post request

router.post('/', (req,res)=>{
  
    let uidUnique=uuidv4();
    let dataToSave={}
    dataToSave.name="Book Name"
    dataToSave.rating=1
    dataToSave.books={title:"BOok title"}
    dataToSave.authorId=uidUnique
    

            try {
                fs.readFile(path.resolve(__dirname, '../authors.json'), function (err, data) {
                
                    let json = JSON.parse(data)
                
                    json.push(dataToSave)
                
                    
                    console.log("Json updated",json)
                        fs.writeFile(path.resolve(__dirname, '../authors.json'), JSON.stringify(json), 'utf-8', function(err) {
                            if (err) throw err
                            console.log('Done!')
                           
                            res.status(200).send('Updated')
                        })
                })
            } catch(err) {
                // An error occurred
                console.error("Error reading file,err");
            }
               
})

//Delete Request

router.delete('/:authorId', (req,res)=>{

    try {
        fs.readFile(path.resolve(__dirname, '../authors.json'), function (err, data) {
        
            let json = JSON.parse(data)
            let index2 = json.findIndex(x=> x.authorId===req.params.bookId);
            json.splice(index2,1)

           
            fs.writeFile(path.resolve(__dirname, '../authors.json'), JSON.stringify(json), 'utf-8', function(err) {
                if (err) throw err
                console.log('Done!')
               
                res.status(200).send('Delete an Author')
            })
        

        })
    } catch(err) {

         console.error("Error reading file",err);
    }
})

module.exports=router;