const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
  var now = new Date().toString();
  var log =`${now}: ${req.method} ${req.url}`;

fs.appendFile(`server.log`,log+'\n',(err)=>{
  if(err){
      console.log("Cant write to file");
  }
});
  next();
});


app.use((req,res,next)=>{
  res.render('maintanice.hbs');
});



app.use(express.static(__dirname + '/public'));






hbs.registerHelper('currentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{    ///when someone make request to server
// res.send('<h1>Hello Express!</h1>'); // response to request
res.render('welcome.hbs',{
  pageTitle:'Home Page',
  // currentYear: new Date().getFullYear(),
  parag:'Welcome to our amazing site'
})
});

app.get('/about',(req,res)=>{
res.render('about.hbs',{
  pageTitle: 'About Page',
  // currentYear: new Date().getFullYear()
});

});

app.listen(3000,()=>{
  console.log('server is up on port 3000');
});
