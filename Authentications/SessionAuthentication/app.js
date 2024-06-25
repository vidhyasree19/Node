const express = require('express');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/User'); 
const MongoDBSession = require('connect-mongodb-session')(session);
const bcrypt = require('bcrypt');
 
const port = 4000;
const mongoURI = "mongodb://localhost:27017/Session_Auth";
 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected"))
  .catch(err => console.error("Database connection error:", err));
 
const store = new MongoDBSession({
  uri: mongoURI,
  collection: "mySessions"
});
 
app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
const isAuth = (req,res,next)=>{
   if(req.session.isAuth){
    next()
   } else {
    res.redirect('/');
   }
}
 
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
 
app.get("/", (req, res) => {
  res.render("login");
});
 
app.get("/signup", (req, res) => {
  res.render("signup");
});
 
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
 
    const existingUser = await UserModel.findOne({ email });
 
    if (existingUser) {
      res.status(400).send('User already exists. Please choose a different username.');
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
 
      await UserModel.create({ email, password: hashedPassword });
 
      res.redirect('/'); 
    }
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send('Error signing up. Please try again later.');
  }
});
 
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
 
    const user = await UserModel.findOne({ email });
 
    if (!user) {
      res.status(400).send("User not found");
    } else {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
 
      if (!isPasswordMatch) {
        res.status(400).send("Incorrect password");
      } else {
        req.session.user = user; 
        req.session.isAuth=true;
        res.redirect('/home'); 
      }
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send('Error logging in. Please try again later.');
  }
});
 
app.get("/home", isAuth, (req, res) => {
    res.render("home");
  });
  
  app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      } else {
        res.redirect('/');
      }
    });
  });
 
app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});