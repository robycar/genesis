const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// serve static files built by React
app.use(express.static(path.join(__dirname, "./build")));
 
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});
 
app.listen(port, () => {
  console.log('Server started on: ' + port);
});