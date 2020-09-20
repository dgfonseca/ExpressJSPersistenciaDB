const WebSocket = require("ws");
const fs = require("fs");
let clients = []
let messages = []
const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      let rawdata = fs.readFileSync('data.json');
      let data = JSON.parse(rawdata);
      for(let i=0; i<data.length;i++)
      {
        let x = data[i];
        for(key in x)
        {
          if(key==="message")
          {
            messages.push(x[key]);
          }
        }
      }
      data.push({message: message, author:"David", ts: Math.floor(Math.random() * 11)})
      fs.writeFileSync('data.json',JSON.stringify(data),function(err){
        if(err) throw err;
      });



      messages.push(message);
      sendMessages();
    });
  });

  const sendMessages = () => {
    clients.forEach((client) => client.send(JSON.stringify(messages)));
  
    
  };
};

exports.wsConnection = wsConnection;