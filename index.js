// Import libraries
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const bodyParser = require('body-parser');
const fs = require('fs');

// Initiate variables
const port = 1995;
var message = "";

// Including plugin
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routing
// - liver listener message -
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// - post message -
app.post("/api/message/", function(req, res) {
  // build variables needs
  message = req.body.message;

  fs.appendFile('./message.txt', `${message}\n`, (err) => {
    if (err) {
      res.send({ status: 'failed', message: err });
    }
    io.emit('chat_message', req.body);
    // sending response
    res.send({
      status: 'success',
      message: 'Message sent success!'
    });
  })

})

// - retrieve message -
app.get("/api/retrieve/message/", function(req, res) {
  // retrieve message from file
  var message = [];
  var content = fs.readFileSync('./message.txt', 'utf8');
  var ctx = content.split('\n');
  ctx.forEach(ct => { message.push(ct) });
  
  // sending message to response
  res.send({
    status: 'success',
    messages: message
  })

})

// IO tools
io.on("connection", function(socket) {
  socket.on("chat_message", function(data) {
      socket.broadcast.emit("chat_message", data);
  });

  socket.on("disconnect", function(data) {
    var writeStream = fs.createWriteStream('./message.txt');
    writeStream.write('');
  })
});

// listener
http.listen(port, function() {
  console.log("Listening on *:" + port);
});