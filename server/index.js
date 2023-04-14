const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors');
const connectToMongo=require('./db')
const PORT=process.env.PORT ||5000;


const app=express();

app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

connectToMongo();
app.use(express.static(__dirname+"/public"))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/file',require('./routes/file'))


app.listen(PORT,()=>{
    console.log(`Server Started at http://localhost:${PORT}`)
})