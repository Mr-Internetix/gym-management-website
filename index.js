const express = require('express');
const app = express()
const PORT = 3000;
const path = require('path')



// setting up static files 
app.use('/static',express.static('public'))
app.use('/css',express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')))
// app.use('/css',express.static(path.join(_dirname,'node_modules/bootstrap/dist/css')))
app.use('/js',express.static(path.join(__dirname,'node_modules/bootstrap/dist/js')))
// app.use('/js',express.static(path.join(_dirname,'node_modules/bootstrap/dist/js')))


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
