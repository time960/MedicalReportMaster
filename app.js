const express = require("express");
require('dotenv').config();
const { default: mongoose } = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const cookieParser = require("cookie-parser");
const registerRoute = require("./routes/registerRoute");
const predictRoute = require("./routes/predictionRoutes");
const doctorRoute = require("./routes/doctorRoute");
const adminRoutes = require("./routes/adminRoutes");
const logoutRoute = require("./routes/logoutRoute");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
try{
  cloudinary.config({
  cloud_name: 'dbctqt32w',
  api_key: '339438147761498',
  api_secret: 'JFRjerE6h--Hd1c88JHg5pNLFPk'
});
}catch(e){
  console.log(e);

}
// dotenv.config({ path: "./config.env" });

// app.use(cors({ origin: "http://localhost:3000", credentials: true}));

const whitelist = ['http://localhost:3000', 'https://medace2.vercel.app', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:5176', 'http://localhost:8000']; //white list consumers
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};

app.use(cors(corsOptions))
// app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const dbURI = process.env.DATABASE_URL;
const port = process.env.PORT || 6000;
app.use(authRoutes);
app.use(registerRoute);
app.use(doctorRoute);
app.use(patientRoutes);
app.use(adminRoutes);
app.use(logoutRoute);
app.use(predictRoute);
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(port);
    console.log("Connected to database and listening at port 5000");
  })
  .catch((err) => {
    app.listen(port);
    app.get("/", (req, res) => {
      res.send(
        "Something Went Wrong! Please Try again after some time, if problem persists please contact us."
      );
    });
  });



if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
