const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/parts');
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.use((request, response, next)=>{
  var now = new Date().toString();
  var log = `Connection at ${now}: ${request.method} ${request.url}`;
  console.log(log);
  fs.appendFile('simpleServer.log', log + '\n', (err)=>{
    if (err){
      console.log('Unable to append to server log');
    }
  })
  next();
});

app.use((request, response, next)=>{
  
  response.render('down.hbs', {
    pageHeader: 'Server Maintaince',
    pageTitle: 'Tango Down'
  });
});

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('allCaps', (text)=>{
  return text.toUpperCase();
})

app.get('/', (request, response)=>{
  // response.send('<button>Hello World</button>');
  response.render('home.hbs', {
    pageTitle: 'Home',
    pageHeader: 'SimpleServer Home',
    button: 'Click Me',
    message: 'foo motha bukka',
    currentYear: new Date().getFullYear()
  });
});

app.get('/help', (request, response)=>{
  response.render('help.hbs', {
    pageTitle: 'Help Page',
    currentYear: new Date().getFullYear()
  })
});

app.get('/bad', (request, response)=> {
  response.send({
    error: 'Bad File Request',
    request: [
      '/',
      'bad'
    ]
  });
});

app.listen(3000, ()=>{
  console.log('Server Listening on port 3000');
}); //port
