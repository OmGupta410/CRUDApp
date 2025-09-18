const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { get } = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    // FIX: Render the index page, passing the users data to it
    res.render("users/index", { users });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});


// router.get('/login',(req,res)=>{
//     res.render('./views/users/login.ejs');
// })

//NEW SHOW FORM
// router.get("/new", (req, res) => {
//   res.render("users/new");
// });

//add user

router.post("/", async (req, res) => {
  try {
    const { name, email, role,password } = req.body;
    const user = new User({ name, email, role, password });
    await user.save();
    res.redirect("/users");
  } catch (err) {
    console.log(err);
    res.status(400).send("error createing user error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, email, role, password} = req.body;
    // FIX: Pass the ID, the update object, and then the options
    await User.findByIdAndUpdate(req.body.id,
      { name, email, role },
      { new: true, runValidators: true }
    );
    res.redirect(`/users`); // Redirecting to all users is common here
  } catch (err) {
    console.log(err.message );
    res.status(400).send("Error updating user");
  }
});

// bring data to edit in form


router.get("/:id/edit", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("not found");
    } else {
      res.render("users/edit", { user });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("error editing user error");
  }
});


//update from click

router.put("/:id", async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByIdAndUpdate({ name, email, role, password }, {new:true,runValidators:true});

    res.redirect("/users");
  } catch (err) {
    console.log(err);
    res.status(400).send("error createing user error");
  }
   
});

router.delete('/:id',async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/users')
    }catch (err) {
    console.log(err);
    res.status(400).send("error createing user error");
  }
})

module.exports = router;