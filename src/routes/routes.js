
module.exports = function (app, express, routeStart) {
    app.use(routeStart, require("./api/v1/test")(models, express));
};