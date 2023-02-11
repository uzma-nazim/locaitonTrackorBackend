const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const LocationMoadal = require("./Modal/locationModal");

// Local Variables...
const app = express();
const PORT = process.env.PORT || 5000;

//for cookie
app.use(cookieParser());

// Router's Connectivity...
// const router = require("./routes/routes");

// Front-end to Back-end Communication...
app.use(cors());

//Allow Body | Otherwise body return undefined...
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connectivity...
mongoose.connect(
  "mongodb+srv://location:location@cluster0.mkgrihn.mongodb.net/test"
);
mongoose.connection.on("connected", () => console.log("Database is Connected"));
mongoose.connection.on("error", (err) => console.log(err));

// All Routes | API's...

app.get("/get-location", (req, res) => {
    
    LocationMoadal.find({}, (error, location) => {
    if (error) {
      res.json({ error });
    } else {

        

      res.json(location  );
    }
  });
  
});

app.post("/location", (req, res) => {
  console.log(req.body);
  LocationMoadal.create(req.body, (err, data) => {
    if (err) {
      res.send(err);
    } else {

      res.json( data );
    }
  });
});
// Server Listening
app.listen(PORT, () => console.log(`Server is running on localhost : ${PORT}`));
