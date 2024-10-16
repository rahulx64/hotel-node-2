const express = require("express");
const router = express.Router();
const menuitem = require("../models/menu"); 

router.post("", async (req, res) => {
  try {
    const data = req.body;
    const newmenu = new menuitem(data);
    const savedmenu = await newmenu.save();
    res.status(200).json(savedmenu);
  } catch (error) {
    console.error("Error saving menu:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("", async (req, res) => {
  try {
    const data = await menuitem.find();
    console.log("data fetched succesfully");
    res.status(200).json(data);
  } catch (error) {
    console.error("Error saving person:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports=router;