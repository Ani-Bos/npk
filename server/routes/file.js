const router=require('express').Router();
const fillter=require('../middleware/fillter')
const path = require('path');
const crypto = require('crypto');
// const {mongoURI}=require('../db')
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

// const methodOverride = require('method-override');

const { mongo } = require('mongoose');

const Disease = require('../model/Diseasepred');
const mongoURI=`mongodb+srv://[user]:[pass]@cluster0.qkqwkdq.mongodb.net/npk?retryWrites=true&w=majority`
// const mongoURI="mongodb://localhost:27017/npk?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });
router.post('/getdata',fillter,async(req,res)=>{
    try {
      const getall=await Disease.find({user:req.user.id});
      res.json(getall);
    } catch (error) {
      console.log(error)
      res.status(500).send("internal server error");
    }
  })
  router.get('/getall', fillter,(req, res) => {
    gfs.files.find({user:req.user.id}).toArray((err, files) => {
      if(err)
      return res.send(err)
  
        res.json({files: files });
      
    });
  });
  router.post('/upload',upload.array('file'),fillter, async(req, res) => {
    try {

// let sumweight=parseFloat(req.body.weight);

const arr=req.files

        const disease=await Disease.create({
            user:req.user.id,
            category:req.body.category,
           probability:req.body.probability,
            filename:arr[0].filename,
            fileid:arr[0].id
        })

        res.json({disease})
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error");
    }

});

// @route GET /files
// @desc  Display all files in JSON
router.get('/files',fillter, (req, res) => {
  gfs.files.find({user:req.user.id}).toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route GET /files/:filename
// @desc  Display single file object
router.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file);
  });
});

// @route GET /image/:filename
// @desc Display Image


// @route DELETE /files/:id
// @desc  Delete file
router.post('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.redirect('/');
  });
});

router.get('/download/:id', async (req, res) => {
  var id = req.params.id;
 

  gfs.files.findOne({ _id: mongo.ObjectId(id) }, (err, file) => {
      if (err) {
          // report the error
          console.log(err);
      } else {
          // detect the content type and set the appropriate response headers.
          let mimeType = file.contentType;
          if (!mimeType) {
              mimeType = mime.lookup(file.filename);
          }
          res.set({
              'Content-Type': mimeType,
              'Content-Disposition': 'attachment; filename=' + file.filename
          });

          const readStream = gfs.createReadStream({
              _id: id
          });
          readStream.on('error', err => {
              // report stream error
              console.log(err);
          });
          // the response will be the file itself.
          readStream.pipe(res);
          // res.send(file)
      }
  });
})
router.get('/view/:id', async (req, res) => {
  var id = req.params.id;
 

  gfs.files.findOne({ _id: mongo.ObjectId(id) }, (err, file) => {
      if (err) {
          // report the error
          console.log(err);
      } else {
          // detect the content type and set the appropriate response headers.
          let mimeType = file.contentType;
         
          if (!mimeType) {
              mimeType = mime.lookup(file.filename);
          }
          res.set({
              'Content-Type': mimeType,
              // 'Content-Disposition': 'attachment; filename=' + file.filename
          });

          const readStream = gfs.createReadStream({
              _id: id
          });
          readStream.on('error', err => {
              // report stream error
              console.log(err);
          });
          // the response will be the file itself.
          readStream.pipe(res);
          // res.send(file)
      }
  });
})
module.exports=router