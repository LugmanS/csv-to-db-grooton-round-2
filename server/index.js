const express = require('express');
const mongoose = require('mongoose');
const upload = require('express-fileupload');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
//Database Config
mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log("Connect to Database")
);

//Middlewares
app.use(cors());
app.use(upload());

//Import Routes
const mainRoute = require('./routes/main');

//Route Middlewares
app.use('/', mainRoute);

if (process.env.NODE_ENV == "production") {
  app.use(express.static('client'))
  const path = require(path)
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', index.html))
  })
}


app.listen(PORT, () => console.log(`Server started at ${PORT}`));