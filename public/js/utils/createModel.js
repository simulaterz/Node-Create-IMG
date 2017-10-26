function createModel (data, history) {
  var model = {
    A: { all: new Array(), home: new Array() },
    B: { all: new Array(), away: new Array() },
    history: new Array()
  };

  var teamCriteria = ['A', 'B'];
  var subteamCriteriaA = ['home','all'];
  var subteamCriteriaB = ['away','all'];
  // set master home team
  var teamMaster;

  teamCriteria.forEach(function(criteria) {
    switch (criteria) {
      case 'A':
        var sub = subteamCriteriaA;
        break;
      case 'B':
        var sub = subteamCriteriaB;
        break;
    };
    // set temp team criteria
    var teamCriteria;

    sub.forEach(function(match) {
      for (var i = 0; i < data[criteria][match].history.aid.length; i++) {
        // check length if > 10 -> stop
        if (model[criteria][match].length === 10) { break; }
        // prepare temp data
        var temp = {
          league: data[criteria][match].history.mid[i].n,
          cLeague: data[criteria][match].history.mid[i].c,
          teamA: data[criteria][match].history.aid[i],
          teamB: data[criteria][match].history.bid[i],
          score: data[criteria][match].history.liveA[i].toString() + '-' + data[criteria][match].history.liveB[i].toString(),
          liveA: data[criteria][match].history.liveA[i].toString(),
          liveB: data[criteria][match].history.liveB[i].toString(),
          result: data[criteria][match].history.worl[i],
          odds: data[criteria][match].history.rq[i],
          date: data[criteria][match].history.date[i]
        }
        // set bg color
        switch (criteria) {
          case 'A':
            if (i%2 === 0) {
              temp.setBg = 'rgb(198, 228, 245)';
            } else {
              temp.setBg = 'rgb(230, 244, 251)';
            }
            break;
          case 'B':
            if (i%2 === 0) {
              temp.setBg = 'rgb(220, 244, 197)';
            } else {
              temp.setBg = 'rgb(240, 250, 229)';
            }
            break;
        };
        // set temp teamCriteria
        switch (match) {
          case 'home':
            if (teamCriteria !== temp.teamA) {
                teamCriteria = temp.teamA;
                teamMaster = temp.teamA;
            }
            break;
          case 'away':
            if (teamCriteria !== temp.teamB) {
                teamCriteria = temp.teamB;
            }
            break;
        };
        // set font color cA = cssA / cB = cssB and Score Color
        switch (temp.result) {
          case "ชนะ":
            if (teamCriteria === temp.teamA) {
              temp.cA = 'ff0000';
              temp.cB = '000000';
            } else {
              temp.cA = '000000';
              temp.cB = 'ff0000';
            }
            temp.cResult = 'ff0000';
            temp.cScoreRedA = 'Y';
            temp.cScoreRedB = 'N';
            break;
          case "เสมอ":
            if (teamCriteria === temp.teamA) {
              temp.cA = '0000ff';
              temp.cB = '000000';
            } else {
              temp.cA = '000000';
              temp.cB = '0000ff';
            }
            temp.cResult = '0000ff';
            break;
          case "แพ้":
            if (teamCriteria === temp.teamA) {
              temp.cA = '008000';
              temp.cB = '000000';
            } else {
              temp.cA = '000000';
              temp.cB = '008000';
            }
            temp.cResult = '008000';
            temp.cScoreRedA = 'N';
            temp.cScoreRedB = 'Y';
            break;
        };
        // set visible star character
        if (temp.odds.charAt(0) === '-') {
          temp.starA = 'Y';
          temp.starB = 'N';
        } else {
          temp.starA = 'N';
          temp.starB = 'Y';
        };
        // if team B(Away) has Odds(-) // set true odds
        if (teamCriteria === temp.teamB && temp.odds.charAt(0) !== '-') {
          temp.odds = '-' + temp.odds;
          if (temp.odds === '-') { temp.odds = ''; }
        } else if (teamCriteria === temp.teamB && temp.odds.charAt(0) === '-') {
          var subStr = temp.odds.substr(1);
          temp.odds = '+' + subStr;
        }
        // add to Array
        model[criteria][match].push(temp);
      };
    });
  });

  // check when have no history data
  if (history) {
    for (var i = 0; i < history.historymatch.aid.length; i++) {
      // set max length
      if (model.history.length === 5) { break; }
      // prepare temp data
      var temp = {
        league: history.historymatch.mid[i].n,
        cLeague: history.historymatch.mid[i].c,
        teamA: history.historymatch.aid[i],
        teamB: history.historymatch.bid[i],
        score: history.historymatch.liveA[i].toString() + '-' + history.historymatch.liveB[i],
        liveA: history.historymatch.liveA[i].toString(),
        liveB: history.historymatch.liveB[i].toString(),
        result: history.historymatch.worl[i],
        odds: history.historymatch.rq[i],
        date: history.historymatch.date[i]
      };
      // set bg
      if (i%2 === 0) {
        temp.setBg = 'rgb(198, 228, 245)';
      } else {
        temp.setBg = 'rgb(230, 244, 251)';
      };
      // set font color cA = cssA / cB = cssB and Score Color
      switch (temp.result) {
        case "ชนะ":
          temp.cA = 'ff0000';
          temp.cB = '000000';
          temp.cScoreRedA = 'Y';
          temp.cScoreRedB = 'N';
          break;
        case "เสมอ":
          temp.cA = '000000';
          temp.cB = '000000';
          break;
        case "แพ้":
          temp.cA = '000000';
          temp.cB = 'ff0000';
          temp.cScoreRedA = 'N';
          temp.cScoreRedB = 'Y';
          break;
      }
      // set visible star character
      if (temp.odds.charAt(0) === '-') {
        temp.starA = 'Y';
        temp.starB = 'N';
      } else {
        temp.starA = 'N';
        temp.starB = 'Y';
      };
      // set show odds
      if (temp.odds.charAt(0) === '-') {
        temp.odds = temp.odds.substr(1);
      };
      // add to Array
      model.history.push(temp);
    };
  };

  // set W/D/L in data
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
      var countW = _.countBy(model[criteria][match], function(item) { return item.result === "ชนะ"});
      var countD = _.countBy(model[criteria][match], function(item) { return item.result === "เสมอ"});
      var countL = _.countBy(model[criteria][match], function(item) { return item.result === "แพ้"});
      // get Value
      var getW = _.get(countW, 'true');
      var getD = _.get(countD, 'true');
      var getL = _.get(countL, 'true');
      // set in model
      model[criteria][match+'W'] = getW > 0 ? getW : 0;
      model[criteria][match+'D'] = getD > 0 ? getD : 0;
      model[criteria][match+'L'] = getL > 0 ? getL : 0;
      model[criteria][match+'Count'] = model[criteria][match+'W'] + model[criteria][match+'D'] + model[criteria][match+'L']
      model[criteria][match+'PercentW'] = ((model[criteria][match+'W']/model[criteria][match+'Count']) * 100) + '.00%';
      model[criteria][match+'PercentD'] = ((model[criteria][match+'D']/model[criteria][match+'Count']) * 100) + '.00%';
      model[criteria][match+'PercentL']= ((model[criteria][match+'L']/model[criteria][match+'Count']) * 100) + '.00%';
    });
  });

  // set W/D/L in history
  var countW = _.countBy(model.history, function(item) { return item.result === "ชนะ"});
  var countD = _.countBy(model.history, function(item) { return item.result === "เสมอ"});
  var countL = _.countBy(model.history, function(item) { return item.result === "แพ้"});
  // get Value
  var getW = _.get(countW, 'true');
  var getD = _.get(countD, 'true');
  var getL = _.get(countL, 'true');
  // set in model
  model.history.W = getW > 0 ? getW : 0;
  model.history.D = getD > 0 ? getD : 0;
  model.history.L = getL > 0 ? getL : 0;
  model.history.count = model.history.W + model.history.D + model.history.L;
  model.history.percentW = ((model.history.W/model.history.count) * 100) + '.00%';
  model.history.percentD = ((model.history.D/model.history.count) * 100) + '.00%';
  model.history.percentL = ((model.history.L/model.history.count) * 100) + '.00%';
  model.history.teamMaster = teamMaster;

  // return
  return model;
};
