//Importing Components
const express = require('express');
const app=express();
const mongoose = require('mongoose');
const cors =require('cors');
const routes=require('./src/routes')

mongoose.connect(
    `mongodb+srv://lucifer:lucifer@cluster0.z30px.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
).then(()=>{
    console.log('Database Created');
}).catch((error)=>{
    console.log(error);
});


app.use(cors());
app.use(express.json());
app.use('/api',routes);


//Listning the port 
const server_port =process.env.PORT || 5001;
app.listen(server_port, '0.0.0.0',function() {
    console.log('Listening on port %d', server_port);
});

