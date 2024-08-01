import express from "express";
import bodyParser from "body-parser";
import nanobuffer from "nanobuffer";
import morgan from "morgan";

// set up a limited array
const msg = new nanobuffer(50);
const getMsgs = () => Array.from(msg);



// get express ready to run
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static("frontend"));

app.get("/poll", function (req, res) {
  // use getMsgs to get messages to send back
  // write code here
  res.status(500).json({
    msg: getMsgs(),
  });
});

app.post("/poll", function (req, res) {
  // add a new message to the server
  // write code here
  const { user, text } = req.body;
  msg.push({
    user,
    text,
    time: Date.now(),
  });

  res.json({
    status: "ok",
  });
});

// start the server
const port = process.env.PORT || 8080;
app.listen(port);
console.log(`listening on http://localhost:${port}`);
