const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const websocketServer = require("websocket").server;
const http = require("http");
const cors = require("cors");
const LocationMoadal = require("./Modal/locationModal");
var NodeGeocoder = require('node-geocoder')
// Local Variables...
const app = express();
const PORT = 5000;

//for cookie
app.use(cookieParser());

// Router's Connectivity...
// const router = require("./routes/routes");

// Front-end to Back-end Communication...
app.use(cors());

//Allow Body | Otherwise body return undefined...
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Database Connectivity...
// mongoose.connect(
//   "mongodb+srv://location:location@cluster0.mkgrihn.mongodb.net/test"
// );
// mongoose.connection.on("connected", () => console.log("Database is Connected"));
// mongoose.connection.on("error", (err) => console.log(err));

// All Routes | API's...

app.get("/get-location", (req, res) => {
  LocationMoadal.find({}, (error, location) => {
    if (error) {
      res.json({ error });
    } else {
      res.json(location);
    }
  });
});

app.post("/location", (req, res) => {
  console.log(req.body);
  LocationMoadal.create(req.body, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});

// const server =http.createServer()
// server.listen(5000)
// const wsServer = new websocketServer({
//   httpServer:server
// })

// wsServer.on("request", (request)=>{
//   const connection = request.accept(null, request.origin)

// })
// Server Listening
// const wss = new websocket.Server({ port: 5000 });
// wss.on("connection", (ws) => {
//   console.log("Client conneced");
//   wss.on("message",(message)=>{
//     console.log(message)

//   })
// });
// const server = app.listen(PORT, () => console.log(`Server is running on localhost : ${PORT}`));
// io = require("socket.io")(server,{
//   cors: {
//     origin: "http://localhost:3001",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["my-custom-header"],
//     credentials: true
//   }
// })

// io.on("connection", (socket)=>{
//   console.log("connetct",socket.id)
// })
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    
  },
});
io.on("connection", (socket) => {
  var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyDj8QiKUowTVNp29whHKnhZK0noNI53JnA', // for Mapquest, OpenCage, Google Premier
  formatter: 'json' // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);


  socket.on("create-delivery", localtion=>{
    
    // {lat:28.5967439, lon:77.3285038}
    // geocoder.reverse({lat:localtion.lat , lon:localtion.lng}, function(err, res) {
    //   console.log(res[0].city);
    //   console.log(err);
    // });
    socket.broadcast.emit("delivery-send", localtion)

  })
  socket.on("driverLocation",driver=>{
    
    socket.broadcast.emit("rcvLoaction",driver)

  })
});
server.listen(5000, () => {
  console.log("server is run ");
});
