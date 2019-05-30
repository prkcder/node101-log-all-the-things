const express = require("express");
const fs = require("fs");
const app = express();

app.use((req, res, next) => {
// write your logging code here
        let agent = req.headers["user-agent"].replace(',', '');
        let time =  new Date().toISOString();
        let method = req.method;
        let resource = req.path;
        let version = "HTTP/" + req.httpVersion;
        let status = res.statusCode;
        let log = `${agent},${time},${method},${resource},${version},${status }\n` ;
        console.log(log);
        fs.appendFile("log.csv", log, (err) => {
            if (err) throw err;  
        });
            next();
});

app.get("/", (req, res) => {
// write your code to respond "ok" here
    res.send("OK").status(200);
});

app.get("/logs", (req, res) => {
// write your code to return a json object containing the log data here
    fs.readFile("log.csv", "utf8", (err, data) => {
        if (err) throw err;
        let logArr =[];
        var lines = data.split("\n");
        for (var i=1; i < lines.length - 1; i++){
            let words = lines[i].split(",");
            let obj = {
                "Agent": words[0],
                "Time": words[1],
                "Method": words[2],
                "Resource": words[3],
                "Version": words[4],
                "Status": words[5]
            };
            logArr.push(obj);
        };
        res.json(logArr);
        res.end();
    });
});

module.exports = app;