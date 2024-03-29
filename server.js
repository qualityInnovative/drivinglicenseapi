const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv").config({
    path: path.resolve(__dirname, "./.env"),
});
const app = express();
const server = http.createServer(app);
app.use(express.json({ limit: "100mb" }));
app.use(
    express.urlencoded({
        limit: "100mb",
        extended: true,
    })
);
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type, Authorization"
    );

    // Additional security headers
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self'; object-src 'none';"
    );
    res.setHeader("Permissions-Policy", "geolocation=()");
    res.setHeader("Referrer-Policy", "no-referrer");

    next();
});
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public/")));
app.get("/", function (req, res) {
   
    res.sendFile(path.join(__dirname, "public/data.json"));
})
app.post("/", function (req, res) {
    if(req.body.dlNo != null){
        res.sendFile(path.join(__dirname, "public/data2.json"));
    }else{
        res.sendFile(path.join(__dirname, "public/data.json"));

    }
    
})
server.listen(process.env.API_PORT || 5010, function () {
    console.log("Running on port: " + process.env.API_PORT);
});