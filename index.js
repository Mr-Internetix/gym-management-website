const express = require('express');
const res = require('express/lib/response');
const app = express()
const PORT = 3000;

// setting up static files 
app.use(express.static('public'))

// setting up routes 
app.get('/',(req,res)=>{
  res.render('home.ejs')
})

app.get('/user',(req,res)=>{
  res.render('user.ejs')
})


app.get('/admin',(req,res)=>{
  res.render('admin.ejs')
})







 // listening to particular port

app.listen(PORT,()=>{
  console.log(`the website is running on http://localhost:${PORT}`)
})
