
// require
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');


const app = express();
const port = 3000;
//mongoose connectiion
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
.then(()=>{console.log("connection succes")})
    .catch((err)=>{console.log(err)});

//middleware
app.set('view engine',"ejs");
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

//routes
const userRoutes= require('./routes/users')
app.use('/users',userRoutes);

//root redirect
app.get('/',(req,res)=>{
    res.redirect('/users');
})

app.listen(port,(req,res)=>{
    console.log(`server running at http://localhost:${port}`);
}
);


