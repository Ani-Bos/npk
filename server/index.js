const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors');
const connectToMongo=require('./db')
const PORT=5000;


const app=express();

app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

connectToMongo();
app.use('/api/auth',require('./routes/auth'))

app.listen(PORT,()=>{
    console.log(`Server Started at http://localhost:${PORT}`)
})