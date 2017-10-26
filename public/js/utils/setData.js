function setData(data, history) {

  var teamCriteria = ['A', 'B'];
  var subteamCriteriaA = ['home','all'];
  var subteamCriteriaB = ['away','all'];

  teamCriteria.forEach(function(criteria) {
    switch (criteria) {
      case 'A':
        var sub = subteamCriteriaA;
        break;
      case 'B':
        var sub = subteamCriteriaB;
        break;
    };

    sub.forEach(function(match) {
      data[criteria][match].history.aid = _.map(data[criteria][match].history.aid, function(key) {
        if(!key) { return '' };
        return data.team[key];
      });
      // history away
      data[criteria][match].history.bid = _.map(data[criteria][match].history.bid, function(key) {
        if(!key) { return '' };
        return data.team[key];
      });
      // history league
      data[criteria][match].history.mid = _.map(data[criteria][match].history.mid, function(key) {
        if(!key) { return '' };
        return data.match[key];
      });
      // history result
      data[criteria][match].history.worl = _.map(data[criteria][match].history.worl, function(key) {
        return replaceResult(key);
      });
      // history Odds
      data[criteria][match].history.rq = _.map(data[criteria][match].history.rq, function(key) {
        return replaceOdds(key);
      });
    });
  });

  // # setup history match #
  if (history) {
    history.historymatch.aid = _.map(history.historymatch.aid, function(key) {
      if(!key) { return '' };
      return history.team[key];
    });
    history.historymatch.bid = _.map(history.historymatch.bid, function(key) {
      if(!key) { return '' };
      return history.team[key];
    });
    history.historymatch.mid = _.map(history.historymatch.mid, function(key) {
      if(!key) { return '' };
      return history.match[key];
    });
    history.historymatch.worl = _.map(history.historymatch.worl, function(key) {
      return replaceResult(key);
    });
    history.historymatch.rq = _.map(history.historymatch.rq, function(key) {
      return replaceOdds(key);
    });
  };
  // # end setup history match #
  // # Function
  function replaceResult(key) {
    switch (key) {
      case 0:
        return "ชนะ";
        break;
      case 1:
        return "เสมอ";
        break;
      case 2:
        return "แพ้";
        break;
      default:
        return "";
        break;
    };
  };

  function replaceOdds(key) {
    if(!key) { return ''; }

    var item = new Array();
    item = key.split(".");

    if(!item[1]) { return item[0]; };

    switch (item[1]) {
      case '25':
        return item[0] + '/' + Math.abs(parseInt(item[0])) + '.5';
        break;
      case '5':
        return item[0] + '.' + item[1];
        break;
      case '75':
        return item[0] + '.5/' + (Math.abs(parseInt(item[0]))+1);
        break;
      default:
        return item[0];
    };
  };
  // # End Function

  // return { data,history }
};
