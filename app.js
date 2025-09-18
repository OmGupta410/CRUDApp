
// require
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const auth = require('./middleware/auth');

//jwt 

const jwt = require("jsonwebtoken");
const SECRET_KEY = "mysecretkey";




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
app.use(express.static(path.join(__dirname,'views'))); 
//routes
const userRoutes= require('./routes/users')
app.use('/users',userRoutes);

//root redirect
app.get('/',(req,res)=>{
    res.redirect('/users');
})

//root redirect
app.get('/login',(req,res)=>{
    res.render('users/login');
})



app.post('/login', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // find user
    const user = await Users.findOne({
      $or: [{ name: name }, { email: email }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password!' });
    }

    // generate JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" } 
    );

    res.json({ message: 'Login successful.', token });
  } catch (err) {
    console.log("An error occurred:- " + err);
    res.status(500).json({ error: err.message });
  }
});


app.listen(port,(req,res)=>{
    console.log(`server running at http://localhost:${port}`);
}
);


