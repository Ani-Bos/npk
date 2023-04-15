const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
// const methodOverride = require('method-override');
const filter=require('./middleware/fillter')
const { mongo } = require('mongoose');

const Disease = require('./model/Diseasepred');
const cors=require('cors')

const axios=require('axios')
const connectToMongo=require('./db')
const PORT=process.env.PORT ||5000;


const app=express();

app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))


const mongoURI="mongodb://localhost:27017/npk?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const conn = mongoose.createConnection(mongoURI);
connectToMongo();

let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine


app.use(express.static(__dirname+"/public"))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/file',require('./routes/file'))


app.listen(PORT,()=>{
    console.log(`Server Started at http://localhost:${PORT}`)
})