const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use("/", (req, res) => {
  res.send({
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MjYzNTcyMzYsImlhdCI6MTYyNjM1MzYzNiwidXNlcm5hbWUiOiJ0ZXN0In0.OXqSaEKHs8o_wHY2jxr5qQ-UbncfF-4kB2B-ZNkjdPBy4ozB1bJzi3cz8MQ84dMJ4tfYdFWICNn-pBW3bwl5IA",
  });
});

app.listen(8080, () =>
  console.log("API is running on http://localhost:8080/login")
);
