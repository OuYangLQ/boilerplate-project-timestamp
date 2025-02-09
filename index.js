// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const days = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];

function resJson(unix , date , res){
  utc = days[date.getDay()] + ", " 
    + date.getUTCDay() + " "
    + date.getUTCMonth() + " "
    + date.getUTCFullYear() + " "
    + date.getUTCHours() + " "
    + date.getUTCMinutes() + " "
    + date.getUTCSeconds() + " GMT";
  res.json({unix: unix,utc: utc}); 
}

app.get("/api/:date?",function(req, res){
  let dateString = req.params.date;
  let unix;
  let date;

  // undefined 2015-12-25 1451001600000 非法
  dateUTC = new Date(dateString);
  dateUnix = new Date(Number(dateString));

  if(dateString === undefined){
    unix = Date.now();
    date = new Date();
    resJson(unix, date, res);
  }else if(!isNaN(dateUTC)){
    unix = dateUTC.getTime();
    resJson(unix, dateUTC, res);
  }else if(!isNaN(dateUnix)){
    unix = dateUnix.getTime();
    resJson(unix, dateUnix, res); 
  }else{
      res.json({ error : "Invalid Date" });
  }

 });



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
