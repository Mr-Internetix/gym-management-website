// imports 
const express = require('express');
const app = express()
const PORT = process.env.PORT || 5500;
const path = require('path')
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')
const admin = require("firebase-admin")
const csrf = require("csurf")
const cookieParser = require("cookie-parser")
const csrfMiddleware = csrf({cookie:true})

// firebase auth key import 

const service_key = require('./gym-management.json');

// initialize firebase admin 

admin.initializeApp({
  credential:admin.credential.cert(service_key),
  databaseURL: "https://server-auth-41acc.firebaseio.com",
})

// body parser 
app.use(bodyParser.json());
//compression for sending compress fileformat to reduce load on server 
app.use(compression())

// cors config 
var corsOptions = {
  origin:"http:localhost:3000"
};

app.use(cors(corsOptions))

// IMPORTING DATABASE CONNECTION 
const connect_database = require('./config/db-config');
const { join } = require('path');



// setting up static files 
app.use('/static',express.static('public'))
app.use('/css',express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')))
app.use('/js',express.static(path.join(__dirname,'node_modules/bootstrap/dist/js')))

// connecting database
connect_database();

// using middlewars 
// app.use(csrfMiddleware)
app.use(cookieParser())

// routes 

// app.get("*",(req,res,next)=>{
  // res.cookie("XSRF-TOKEN",req.csrfToken())
  // next()
// })
// setting up home  routes 
app.get('/',(req,res)=>{
  res.render('home.ejs')
})


// app.get('/user',(req,res)=>{
//   res.render('user.ejs')
// })


// app.get('/admin',(req,res)=>{
//   res.render('admin.ejs')
// })


app.get('/signin',(req,res)=>{
  res.render('signin.ejs')
})

// app.get('/signup',(req,res)=>{
//   res.render('signup.ejs')
// })


// session handling routes 

app.post("/sessionLogin", (req, res) => {

  const idToken = req.body.idToken.toString();

  const expiresIn = 60*60*24*5*1000;
  admin
  .auth()
  .createSessionCookie(idToken,{expiresIn})
  .then(
      (sessionCookie) =>{
      const options = {maxAge:expiresIn, httpOnly:true};
      res.cookie("session",sessionCookie,options);
      res.end(JSON.stringify({status:"success"}));
      },
      (error)=>{
          res.status(401).send("unauthorised access");
      });
  
});


app.get("/sessionLogout",(req,res)=>{
  res.clearCookie("session");
  res.redirect("/")
});


// contact us route

app.use('/api/contact',require(path.join(__dirname,'/routes/contactus.js')))

// add user 

app.use('/adduser',require(path.join(__dirname,'/routes/adduser.js')))

// user login 

app.use('/profile',require(path.join(__dirname,'/routes/userlogin.js')))

 // listening to a particular port

 // announcements
app.use('/announcements',require(path.join(__dirname,'/routes/announcements.js')))

// customer 
app.use('/customers',require(path.join(__dirname,'/routes/customers.js')))

// registrations 

app.use('/registrations',require(path.join(__dirname,'/routes/registrations.js')))
app.listen(PORT,()=>{
  console.log(`the website is running on http://localhost:${PORT}`)
})
