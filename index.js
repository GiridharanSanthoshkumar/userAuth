const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose"); 
require('dotenv').config();



// Connect to MongoDB
mongoose.connect("mongodb+srv://giridharansanthosh0501:2aD963j5z0udTqCB@cluster0.l9qrt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  usermail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

const MongoStore = require('connect-mongo');




/*app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://user-auth-client-six.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});*/



/*app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://user-auth-client-six.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
}); */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: true,
    
    cookie: {
      secure: true,
     
    },
  })
);

// Signup Route
app.post("/auth/signup", async (req, res) => {
  const { username, usermail, password } = req.body;

  try {
    // Check if email already exists
    const userExists = await User.findOne({ usermail });
    if (userExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ username, usermail, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login Route
app.post("/auth/login", async (req, res) => {
  const { useremail, password } = req.body;

  try {
    // Find user in the database
    const user = await User.findOne({ usermail: useremail });
    if (!user) {
      return res.status(404).json({ error: "No user found with this email" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Save user data to session
    req.session.user = { user_id:user._id,username: user.username, usermail: user.usermail };
    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Profile Route
app.get("/auth/profile", async (req, res) => {
  
    if (req.session.user) {
    const user = await User.findOne({ _id:req.session.user.user_id });
    res.status(200).json({ data: user });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

// Logout Route
app.post("/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Error logging out" });
    res.clearCookie("connect.sid"); // Clear session cookie
    res.status(200).json({ message: "Logged out successfully" });
  });
});

app.use(express.static(__dirname+"/frontend/build"));
// React fallback route
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/frontend/build/index.html");
});

// Start Server
app.listen(5000, () => {
  console.log("Server started at port 5000");
});
