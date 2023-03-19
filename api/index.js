const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const webtoken = require('jsonwebtoken');
const User = require("./models/User.js");
const cookieParser = require('cookie-parser');
require("dotenv").config();
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const tokenSecret = 'a1vsdfew321'

app.use(express.json());
//Need to install cookie parser to read cookie. 
app.use(cookieParser());

//Mongo Atlas username:musirent, password: WcvuGi1J1XE1S3sH

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Need connection strings from Atlas
// Install dotnev
mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test success");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(user);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async(req,res) => {
    const {email,password}= req.body;
    const userDoc = await User.findOne({email})
    if(userDoc) {
        //check if the password is correspond to the user
        //then resend a cookie (token) 
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
        //sign is a jsonWebToken function
          webtoken.sign({email:userDoc.email, id: userDoc._id}, tokenSecret, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json(userDoc)
          })
         
        }else{
          res.status(422).json('pass No Ok')
        }
    }else{
        res.json('Failed')
    }
});

app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  if(token){
    //Verify is a jsonWebToken function
    webtoken.verify(token, tokenSecret,{}, (err,user) => {
      if (err) throw err;
      res.json(user);
    } )
  }else{
    res.json(null);
  }
})


app.listen(4000);
