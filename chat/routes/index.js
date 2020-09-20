const { strict } = require('assert');
var express = require('express');
const fs = require("fs");
var router = express.Router();
var bodyParser = require('body-parser').json();



/* GET home page. */
router.get('/chat/api/messages', function(req, res, next) {
  res.send(msg);
});

router.get('/chat/api/messages/:id', function(req, res, next){
  var rta = "No se encontró"
  var rawdata = fs.readFileSync('./data.json');
  var msg = JSON.parse(rawdata);
  for(let i=0; i<msg.length;i++)
  {
        if(parseInt(msg[i]["ts"])===parseInt(req.params.id)){
          rta=msg[i]["message"];
          console.log(msg[i]["ts"]);
    } 
  }
  res.send(rta);

});

router.post('/chat/api/messages',bodyParser, function(request, response){
  console.log(request.body);      // your JSON
  response.send(request.body);    // echo the result back
});


router.put('/chat/api/messages',function(request, response){
  var rawdata = fs.readFileSync('./data.json');
  var msg = JSON.parse(rawdata);
  var req2 = request.body.json;
  var id = req2[1]["ts"];
  for(let i=1; i<msg.length;i++)
  {
        if(parseInt(msg[i]["ts"])===parseInt(id)){
          msg[i]["message"] = req2[1]["message"]
          msg[i]["author"] = req2[1]["author"]
    } 
  }

  fs.writeFileSync("./data.json", JSON.stringify(msg),function(err){
    if(err) throw err;
  });



  
  response.send(request.body);    // echo the result back
});
module.exports = router;
