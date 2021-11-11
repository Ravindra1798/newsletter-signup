const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https= require("https");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  // Javascript
  const data = {
    members: [{


      email_address: email,
      status: "Subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName

      }
    }]
  };

  // Turn javascript into json
  const jsonData = JSON.stringify(data);

  // post data to this url.
  const url = "https://us5.api.mailchimp.com/3.0/lists/59768e60ce";


  const options= {
    method: "POST",
    auth: "ravi1:e9b9d4d8d9a861167ca0c22a93939b40-us5"
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
  res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });


  request.write(jsonData);
  request.end();
});


app.post("/failure",function(req,res){
  res.redirect("/");
});



//API key
//e9b9d4d8d9a861167ca0c22a93939b40-us5
//list id
//59768e60ce

app.listen(3000, function() {
  console.log("started running on port 3000");
});
