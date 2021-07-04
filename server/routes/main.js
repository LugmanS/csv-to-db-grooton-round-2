const router = require('express').Router();
const csvtojson = require('csvtojson');
const bcrypt = require('bcrypt');
const Main = require('../models/Main');

let data;
let counter = 0;

router.post('/upload', async (req, res) => {

  if (!req.files) {
    return res.json({ error: "File not uploaded" });
  }

  const file = req.files.files;
  const filename = file.name;
  const parts = filename.split(".")
  const ext = parts[parts.length - 1];
  if (ext != "csv")
    return res.json({ error: "This file format is not supported" });

  file.mv("./uploads/" + filename, (err) => {
    if (err) {
      console.log(err);
      res.json({ error: "Error Occured" });
    }
  });

  const csvFilePath = `./uploads/${filename}`;

  data = await csvtojson().fromFile(csvFilePath);
  counter = 0;
  //From  the array of data objects 

  if (data.length == 0) {
    res.joson({ error: "The file has no rows" });
  }

  res.json({ msg: data.length });
});

router.get('/save', (req, res) => {

  data.forEach(async user => {

    let { password } = user;

    if (password) {
      // Encrypt Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    //creating new object
    const newInstance = new Main(user);

    try {
      await newInstance.save();
      counter++;
      console.log(`${user.username} saved and counter = ${counter}`);
    } catch (err) {
      console.log(err);
    }

  });

});

router.get('/info', (req, res) => {
  res.json({ current_completed: counter, total: data.length });
})

module.exports = router;