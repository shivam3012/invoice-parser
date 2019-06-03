const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const config = require('./config/config')

app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'views')))

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.listen(config.PORT, function () {
  console.log('app listening on port: ' + config.PORT);
})

app.use("/", routes); // Set default route to route folder
module.exports = app;