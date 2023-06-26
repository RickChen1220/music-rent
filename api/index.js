const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
//file system ,rename file on server
const fs = require("fs");
const Booking = require("./models/Booking.js");
require("dotenv").config();
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const tokenSecret = "a1vsdfew321"; //create by myself
//Mongo Atlas username:musirent, password: WcvuGi1J1XE1S3sH

app.use(express.json());
//Need to install cookie parser to read cookie.
app.use(cookieParser());

//Define everything in uploads should display, resources from public folder
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Need connection strings from Atlas
// Install dotnev
mongoose.connect(process.env.MONGO_URL);

function getUserDataFromRequest(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, tokenSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.get("/test", (req, res) => {
  res.json("test success");
});

app.post("/register", async (req, res) => {
  const { name, email, password, isSupplier } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      isSupplier,
    });

    res.json(user);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    //check if the password is correspond to the user
    //then resend a cookie (token)
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      //sign is a jsonWebToken function
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        tokenSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass No Ok");
    }
  } else {
    res.json("Failed");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    //Verify is a jsonWebToken function
    jwt.verify(token, tokenSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, id, isSupplier } = await User.findById(userData.id);
      res.json({ name, email, id, isSupplier });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  //set the cookie name "token" to ""
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 10), (req, res) => {
  const uploadedFiles = [];
  //grab the path and originalname(ext) from each files and rename it to + ext
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    //split the name into parts(array) divided dot
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    //rename path with newPath
    fs.renameSync(path, newPath);
    //replace the duplicate uploads/ name in the path with empty string
    uploadedFiles.push(newPath.replace("uploads", ""));
  }
  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    city,
    addedPhotos,
    description,
    facilities,
    openTime,
    closeTime,
    maxGuests,
    extraInfo,
    price,
  } = req.body;
  jwt.verify(token, tokenSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      city,
      photos: addedPhotos,
      description,
      facilities,
      openTime,
      closeTime,
      maxGuests,
      extraInfo,
      price,
    });
    res.json(placeDoc);
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, tokenSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    city,
    addedPhotos,
    description,
    facilities,
    openTime,
    closeTime,
    maxGuests,
    extraInfo,
    price,
  } = req.body;

  jwt.verify(token, tokenSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        city,
        photos: addedPhotos,
        description,
        facilities,
        openTime,
        closeTime,
        maxGuests,
        extraInfo,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  const { place, date, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  Booking.create({
    place,
    date,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.listen(4000);
