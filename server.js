//this is the server for the time being
// later will upload to a real server

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); //this tell express what kind of view engine to run or use

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'All about the Welcome Page',
    welcomeMessage: 'Welcome to the Welcome Page, we are excited to have you here!'
  });
});

app.get('/about', (req, res) => {
  //the render command will let you render any template that you have set up with your current view engine
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Portfolio Page here',
    header: 'This is my portfolio page',
    pageMessage: 'This is portfolio 1'
  });
});

//bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad URL, please try again',
    ifNot: [
      'Restart Computer',
      'Google this problem',
      'Install or update to latest driver',
      'Call a technician'
    ]
  });
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
