let sdata = [
    {
        email: "try@gmail.com",
        password: "123"
    },
];

var dataAdd = [];

var PORT = process.env.PORT || 5000;
var express = require("express");
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
const e = require("express");

var app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

//Ye code login ka hay...!
app.post('/login', (req, res) => {

    let e = req.body.email;
    let p = req.body.password;
    let isFound = false;

    for (i = 0; i < sdata.length; i++) {
        if ((e === sdata[i].email) && (p === sdata[i].password)) {
            isFound = i;
            break;
        }
    }
    if (isFound === false) {
        res.send({
            status: 401, //Is ka matlab hay password incorrect
            message: "User Not Found! :("
        });
    }
    else {
        res.send({
            status: 200, // Is ka matlab hay email and password is correct
            message: "Login Success :)",
            alluser: sdata[isFound],
        });
    }
})

app.post("/del", (req, res) => {
    var index = req.body.i
    dataAdd.splice(index, 1);
    console.log(dataAdd);
    res.send(dataAdd);
})

app.post("/dashboard", (req, res) => {
    let newDate = new Date();
    newDate.toLocaleDateString();
    dataAdd.push({
        title: req.body.title,
        date: newDate,
        description: req.body.description
    });
    res.send({
        post: dataAdd,
        message: "Post Successfuly"
    });
})

app.get("/getPosts", (req, res) => {
    console.log(dataAdd);
    res.send(dataAdd);
})
app.listen(PORT, () => {
    console.log("Server is runing on " + PORT);
})