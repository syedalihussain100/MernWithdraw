require("dotenv")
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;

// routes import here
const User = require("./routes/UserRoute");
const Payment = require("./routes/PaymentRoutes");
const video = require("./routes/VideoRoute");
const Invite = require("./routes/InviteRoutes");
const Team = require("./routes/teamRoute");
const withDraw = require("./routes/withdrawroute");

cloudinary.config({
    cloud_name: "dz9igjetf",
    api_key: "157561161262336",
    api_secret: "Wpy3lwl3XAnLtSPZDeKJArx7qvA",
});


// middleware here
// Add necessary middleware

app.use(cors());
app.use("*", cors());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json())







// routes middleware here
app.use("/api/user", User)
app.use("/api/payment", Payment)
app.use("/api/video", video)
app.use("/api/invite",Invite)
app.use("/api/team", Team)
app.use("/api/draw", withDraw)

// routes here calling
app.use("*", (req, res, next) => {
    res.status(400).send("Page Not Found!");
    next()
})


mongoose.connect(`mongodb+srv://abc:abc@cluster0.pnpp1hu.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Handle connection events
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});




app.listen(PORT, () => {
    console.log(`Your Server is Running on ${PORT}`)
})