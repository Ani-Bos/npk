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
const {connectToMongo}=require('./db')
const dotenv=require('dotenv')
const PORT=process.env.PORT ||5000;
dotenv.config()

const app=express();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

const mongoURI=`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.qkqwkdq.mongodb.net/npk?retryWrites=true&w=majority`
// const mongoURI="mongodb://localhost:27017/npk?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const conn = mongoose.createConnection(mongoURI);
connectToMongo();

let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
  
      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' ||file.contentType === 'image/jpg') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }
    });
  });
app.get('/',(req,res)=>{
  res.send("Hello ,Welcome to npk backend");
})
app.use(express.static(__dirname+"/public"))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/file',require('./routes/file'))


app.listen(PORT,()=>{
    console.log(`Server Started at http://localhost:${PORT}`)
})