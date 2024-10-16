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

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // Parsing incoming requests as JSON

// importing each and every crud operation having endpoints /person
const personroutes=require("./routes/personroutes"); 
// use the router
app.use('/person',personroutes);

// menu cruds 
const menuroutes=require("./routes/menuroutes");
app.use('/menu',menuroutes);





// Start the server on port 3000
app.listen(3000, () => {
  console.log("Your server is running fine, Mr.");
});
