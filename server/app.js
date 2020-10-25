
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
app.use('/api/auth',require('./routes/auth'));
app.use('/api/authors',require('./routes/authors'));
app.use('/api/books',require('./routes/books'));

