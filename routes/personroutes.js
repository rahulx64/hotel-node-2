const express=require('express');
const router=express.Router();
const Person = require("../models/person"); // Importing the Person model

// Route to create a new person
router.post("", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    // Save the new person using async/await
    const savedPerson = await newPerson.save();
    res.status(200).json(savedPerson);
  } catch (error) {
    console.error("Error saving person:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched succesfully");
    res.status(200).json(data);
  } catch (error) {
    console.error("Error saving person:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:worktype", async (req, res) => {
  const worktype = req.params.worktype;
  try {
    if (
      worktype === "chef" ||
      worktype === "waiter" ||
      worktype === "manager"
    ) {
      const data = await Person.find({ work: worktype });
      res.status(200).json(data);
    } else {
      res.status(400).json({ error: "work type not found" });
    }
  } catch (error) {
    console.error("Error saving person:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.put("/:id", async (req, res) => {
     try{
          const pid=req.params.id;
          const upid=req.body;
          const data=await Person.findByIdAndUpdate(pid, upid,{new:true,runValidator:true});
       if(!data)
       {
            res.status(400).json({ error: "parameter you provided not found"});
       }

          console.log('data updated');
          res.status(200).json(data);
     }
     catch (error) {}
});

module.exports=router;