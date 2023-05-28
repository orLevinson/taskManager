const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Room = require("./models/Room");

const HttpError = require("./models/http-error");

const app = express();

//Parse any incoming request body and extract any json data that is in there converted to regular javascript data structure (object,array...) and than call next autometically to reach the next middleware inline
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//FIX The CORS Error

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
};

app.use(cors(corsOptions));

app.use("/", async (req, res, next) => {
  const room = new Room(next);
  const answer = await room.getAll();
  res.json(answer);
});

// if none of the mentioned routes above were called
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// error handler
app.use((error, req, res, next) => {
  //this function will execute if any middleware Infront of it yields an error
  if (res.headerSent) {
    //check if respond already has been sent
    return next(error);
  }

  console.log(error);
  //if code properties is set or default 500 => error code that something went wrong
  res.status(error.code || 500);
  res.json({
    message: error.message || "An unknown error occurred!",
    success: !!error.success,
  });
});

app.listen(process.env.PORT || 5000);
console.log("Server is up and running!");
