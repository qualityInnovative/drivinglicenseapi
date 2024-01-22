var express = require("express");
var router = express.Router();
module.exports = function (models, express) {
    router.get("/test", function (req, res) {
        res.json({ message: "API is working" });
    });
    return router;
};