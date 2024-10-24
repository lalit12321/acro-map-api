 const express = require("express");
 require('dotenv').config();
 const app = express();
 const PORT = 3000;
 const path = require("path");
 const http = require('http');

 const socketio = require('socket.io');

 const server = http.createServer(app);
 const io = socketio(server);
 app.set('view engine', 'ejs');
 app.use(express.static(path.join(__dirname, "public")));

 io.on("connection", function(socket){
    socket.on("send-location", function(data){
         io.emit("recive-location", {id: socket.id, ...data})
     });
     socket.on("disconnect", function(){
         io.emit("user-disconnect", socket.id)
     })
   // console.log("connected");
 })
 app.get('/', function(req, resp){
     resp.render('index');
 });

server.listen(process.env.PORT);
// const express = require('express');
// const { createServer } = require('node:http');
// const { join } = require('node:path');
// const { Server } = require('socket.io');
// const path = require('path');
// const app = express();
// const server = createServer(app);
// const io = new Server(server);

// app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, "index.ejs")));
// app.get('/', (req, res) => {
//   //res.send("File(join(__dirname, 'index.js'))");
//   res.sendFile(express.static(path.join(__dirname, "index.ejs")));

// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// server.listen(3000, () => {
//   console.log('server running at http://localhost:3000');
// });