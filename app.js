const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static(__dirname + "public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/Client/signup.html");
});

app.get("/public/css/styles.css", function (req, res) {
    res.sendFile(__dirname + "/public/css/styles.css");
});

app.post("/", function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var emailAdress = req.body.email;
   // console.log(firstName + " " + lastName + " " + emailAdress);
    var data = {
        members: [{
            email_address: emailAdress,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    var jsonData = JSON.stringify(data);
    console.log(jsonData);
    var options = {

        url: "https://us4.api.mailchimp.com/3.0/lists/5fe47faa0e",
        method: "POST",
        headers: {
            "Authorization": "Khushbu Enter your API key"
        },
       // body: jsonData
    };


    request(options, function (error, response, body) {
        if (error) {

            res.sendFile(__dirname + "/Client/failure.html");
        }
        else {

            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/Client/success.html");
            }
            else {
                res.sendFile(__dirname + "/Client/failure.html");
            }
        }
    })
});

//failed to sign up
app.post("/Client/failure.html", function (req, res) {
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("server is starting at 3000 port");

});