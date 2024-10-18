//part 1
// const fs=require ("fs");
// const os=require ("os");
// console.log(os.userInfo());
// const data = "\nThis is the new data being added lorem.";
// Append data to a file
// fs.appendFile("example.txt", data, (err) => {
//   if (err) {
//     console.error("Error appending to file:", err);
//   } else {
//     console.log("Data successfully appended!");
//   }
// });

// <---------------part2----------------->

const express = require("express");
const app = express();
const db = require("./db"); // Importing the DB connection
const Person = require("./models/person"); // Importing the Person model
const menuitem = require("./models/menu"); // Importing the Menuitem model

const localstrategy = require("passport-local").Strategy;


const passport=require('./auth');



const bodyParser = require("body-parser");
app.use(bodyParser.json()); // Parsing incoming requests as JSON

// <----------------------part3----------------MIDDLEWARE------->
const logrequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} request made to :${req.originalUrl}`
  );
  next(); //move to next phase
};
app.use(logrequest);

// app.get("/", logrequest, (req, res) => {
//   res.send("welcome to the hotel translavania");
// });

// using passport localstrategy library to authenticate user  
// to organize this server.js file we create a auth.js file where auth related work is stored you can go through it

// passport.use(
//   new localstrategy(async (username, password, done) => {
//     try {
//       const user = await Person.findOne({ username: username });
//       if (!user) return done(null, false, { message: "incorrect user name" });
//       const ispasswordmatch = user.password === password ? true : false;
//       if (ispasswordmatch) return done(null, user);
//       else return done(null, false, { message: "incorrect password" });
//     } catch (error) {
//       return done(error);
//     }
//   })
// );

app.use(passport.initialize());
const localauthmiddleware=passport.authenticate('local',{session:false});

// <---------------part3----------------------->

app.get("/", localauthmiddleware, logrequest, (req, res) => {
  res.send("welcome to the hotel translavania");
});

// importing each and every crud operation having endpoints /person
const personroutes = require("./routes/personroutes");
// use the router
app.use("/person", localauthmiddleware, personroutes);

// menu cruds
const menuroutes = require("./routes/menuroutes");
app.use("/menu", menuroutes);

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Your server is running fine, Mr.");
});

// my second commit
// my third comment for check
