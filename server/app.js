const express = require("express");
const fs = require("fs");
const app = express();

app.use((req, res, next) => {
// write your logging code here
        let agent = req.headers["user-agent"];
        let time =  new Date().toISOString();
        let method = req.method;
        let resource = req.path;
        let version = "HTTP/" + req.httpVersion;
        let status = res.statusCode;
        let log = agent + ',' + time + ',' + method + ',' + resource + ',' + version + ',' + status + '\n';
        console.log(log);

        fs.appendFile("log.csv", log, (err) => {
            if (err) throw err;  
        });
});

app.get("/", (req, res) => {
// write your code to respond "ok" here
    res.send("OK").status("200");
});

app.get("/logs", (req, res) => {
// write your code to return a json object containing the log data here
    res.json(logs);
});

module.exports = app;

// Exit Criteria:
// Every request to your server must be logged to the console

// Every request to your server must be logged to a file

// The log file is named log.csv and must be csv format

// Must use fs.appendFile, do not use fs.appendFileSync

// Expose an endpoint (does not require authentication) http://localhost:3000/logs that will return a json object with all the logs

// All tests must pass