const test = (app) => {
    app.get("/test", () => {   
        console.log("test");
    });
    return app;
}

module.exports = { test };


