let express = require('express');
let app = express();
let path = require("path");
let socket = require('socket.io');
let server = require('http').Server(app);
let port = 8080;
let io = require("socket.io")(server);
let pollObj = {
    question: "Select Your Favourite Component",
    options: [
      { text: "Angular", value: 0, count: 0 },
      { text: "MongoDB", value: 1, count: 0 },
      { text: "Express.js", value: 2, count: 0 },
      { text: "Golang", value: 3, count: 0 },
      { text: "Python", value: 4, count: 0 },
      { text: "C#", value: 5, count: 0 },
      { text: "PhP", value: 6, count: 0 },
      { text: "C++", value: 7, count: 0 },
    ],
};
app.use("/", express.static(path.join(__dirname, "dist/chart")));
io.on("connection", socket => {
    console.log("new connection made from client with ID="+socket.id);
    //emit the pollObj to the new client 
    io.sockets.emit('newClinet',pollObj);
    socket.on("newVote", data => {
      io.sockets.emit("vote", addVote(data.vote));
    });

});

server.listen(port, () => {
    console.log("Listening on port " + port);
  });

function addVote(vote){
let newPoll = pollObj;
for(let i in newPoll.options){
    if(vote == newPoll.options[i].value ){
        newPoll.options[i].count++
      }
    }
return newPoll;
    
  }
  