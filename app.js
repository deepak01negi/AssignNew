const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const checkRole = require('./middleware/checkUserRole');
const cntrl = require('./controllers/acl.controller');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api', cntrl);

app.use(checkRole);//Adding middleware to '/products' route
app.use('/products', cntrl);


module.exports = { app };