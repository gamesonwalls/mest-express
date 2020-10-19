
const express = require('express');
const app = express();
var cors = require('cors');
var fs = require('fs');
const path = require('path');

const bodyParser=require('body-parser')
const { v4: uuidv4 } = require('uuid');

//Init middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
const PORT= process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));

app.get('/',function (req, res) {
    res.send('API RUNINNING');

})
app.post('/api/savePost',function (req, res) {

    //res.send(req.body)
    let uidUnique=uuidv4();
    let modelObject={
        "id":uidUnique,
        "post_title":req.body.post_title,
        "content":req.body.content,
        "comments":[],
        "likes":[],
        "dislikes":[]
    }

     try {
            fs.readFile(path.resolve(__dirname, 'posts.json'), function (err, data) {
              
                let json = JSON.parse(data)
              
                json.data.push(modelObject)
             
                    // try {
                    // fs.writeFile("posts.json", JSON.stringify(json))
                    // } catch(err) {
                
                    //     console.error("Error writing to filde  ",err);
                    // }
                console.log("Json updated",json)
                    fs.writeFile(path.resolve(__dirname, 'posts.json'), JSON.stringify(json), 'utf-8', function(err) {
                        if (err) throw err
                        console.log('Done!')
                        res.send('Updated')
                    })
            })
    } catch(err) {
        // An error occurred
        console.error("Error reading file,err");
    }

})

app.post('/api/saveComment',function (req, res) {

    //res.send(req.body)
   
     try {
            fs.readFile(path.resolve(__dirname, 'posts.json'), function (err, data) {
              
                let json = JSON.parse(data)
              
                
             
                //console.log("Json updated",json)
                let index = json.data.findIndex(x => x.id===req.body.id);
                json.data[index].comments.push(req.body.comment);
                console.log("index of search",index)

                    fs.writeFile(path.resolve(__dirname, 'posts.json'), JSON.stringify(json), 'utf-8', function(err) {
                        if (err) throw err
                        console.log('Done!')
                        res.send('saved')
                    })
            })
    } catch(err) {
        // An error occurred
        console.error("Error reading file,err");
    }

})

app.get('/api/getComment',function (req, res) {

   // console.log("req body",req.query.id)
   
     try {
            fs.readFile(path.resolve(__dirname, 'posts.json'), function (err, data) {
              
                let json = JSON.parse(data)
              
                
             
                //console.log("Json updated",json)
                let index = json.data.findIndex(x => x.id===req.query.id);
                res.send(json.data[index].comments);
                //console.log("index of search",index)

            })
    } catch(err) {
        // An error occurred
        console.error("Error reading file,err");
    }

})

app.get('/api/getAllPosts',function (req, res) {

   
     try {
            fs.readFile(path.resolve(__dirname, 'posts.json'), function (err, data) {
              
                let json = JSON.parse(data)
              
                // json.data.push(modelObject)
                res.send(json.data);
             
                  
            })
    } catch(err) {
        // An error occurred
        console.error("Error reading file,err");
    }

})

