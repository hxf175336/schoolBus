const express = require('express');
const bodyParser = require('body-parser');
const cookieParse = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/index.js')
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'client'));
app.set('view engine', 'html');

app.use(cookieParse());

app.use('/api/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
  	code: 500,
    message: err.message,
  });
});

app.listen(port, function() {
  console.log('listening on port : ' + port);
})

