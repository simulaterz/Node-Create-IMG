var fs = require('fs');
var _ = require('lodash');
var request = require('request-promise');

/* Main */
var getDataFromAPI = function(callback) {
  var prepareData = new Promise(function (resolve, reject) {
    createArrayOfUrl(resolve, reject);
  });

  prepareData.then((arrayOfUrl) => {
    var allPromise = [];
    var getArrayFromAPI = [];
    arrayOfUrl.forEach((item) => {
      allPromise.push(getData(item));
      allPromise.push(getHistory(item));
      allPromise.push(getRankTable(item));
    });

    return Promise.all(allPromise).then(values => {
      for (var i=0;i<(values.length/3);i++) {
        getArrayFromAPI[i] ={
          gameData: values[i*3],
          gameHistory: values[(i*3)+1],
          rankTable: values[(i*3)+2]
        };
      };
      return getArrayFromAPI;
    });

  })
  .then((arrayFromAPI) => { return callback(arrayFromAPI) });

  prepareData.catch((err) => { console.log(err) });
};

function createArrayOfUrl(resolve, reject) {
  var filename = 'D:/WorkBall/goal.in.th/Goalz-7M.csv';
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) reject();
    // console.log('OK: ' + filename + '\n');
    /* function*/
    var replaceDoubleQuote = data.replace(/\"|\\r/g, '');
    var arrayOfUrl = [];
    arrayOfUrl = _.remove(replaceDoubleQuote.split('\n'), (item) => { return item !== ''; });
    resolve(arrayOfUrl);
  });
};

function getData(number) {
  var url = 'http://analyse.7m.cn/'+ parseInt(number) +'/data/gameteamhistory_th.js';
  var data = request(url).then((body) => { return JSON.parse(body.substring(22)); })
  .then((arrayOfItem) => { return arrayOfItem; })
  .catch(() => { throw ('Request Error'); })
  return data;
};

function getHistory(number) {
  var url = 'http://analyse.7m.cn/'+ parseInt(number) +'/data/gamehistory_th.js';
  var data = request(url).then((body) => { return JSON.parse(body.substring(18)); })
  .then((arrayOfItem) => { return arrayOfItem; })
  .catch(() => { throw ('Request Error'); })
  return data;
};

function getRankTable(number) {
  var url = 'http://analyse.7m.com.cn/data/' + parseInt(number) + '/gamestandings_th.js';
  var data = request(url).then((body) => { return JSON.parse(body.substring(18)); })
  .then((arrayOfItem) => { return arrayOfItem; })
  .catch(() => { throw ('Request Error'); })
  return data;
};

module.exports = { getDataFromAPI };
