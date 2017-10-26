var express = require('express');
var rp = require('request-promise');
var bodyParser = require('body-parser');
var path = require('path');
var _ = require('lodash');

var app = express();
var publicPath = path.join(__dirname, '.', '/public');

app.use(bodyParser.json());
app.use(express.static(publicPath));

console.log('Starting app.');

var globalItem;

app.get('/:id', function(req, res) {
  if (!globalItem) {
    var api = require('./API/GetDataFromAPI');
    var triggerAPI = new Promise(function (resolve, reject) {
      api.getDataFromAPI(resolve)
    });

    triggerAPI.then((item) => {
      globalItem = item;
      var item = JSON.stringify(item[req.params.id]);
      res.send(item);
    });
    return;
  }

  var item = JSON.stringify(globalItem[req.params.id]);
  res.send(item);
});

app.listen(3000);
