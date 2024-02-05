const express = require('express')
const app = express()
const port = 4000
const {connectDB} = require('./db')
const cors = require('cors')
connectDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})

//use for cross-origin requests
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Hello World!")
})

app.use(express.json())
app.use('/api',require("./Routes/createUser"))
app.use('/api',require("./Routes/displayData"))
app.use('/api',require("./Routes/OrderData"))

app.listen(port,()=>{
    console.log(`App is listening on ${port}`)
})