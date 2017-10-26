function setRankTable(rankTable, model) {
    var table = rankTable.data.total;

    var masterTable = new Array();
    var group;

    _.map(table, function(item) {
      item[0]  = rankTable.team[item[0]];
      return item;
    });

    table.forEach(function(data) {
      var data = setObjectTeam(data, model);

      if (group != data.group) {
          // set group in global
          group = data.group;

          masterTable.push('');
          masterTable[masterTable.length - 1] = new Array(data);

          var tempTabel = masterTable[masterTable.length - 1];
          var tempData = masterTable[masterTable.length - 1].length;
          tempTabel[tempData - 1].number = tempData;
          tempTabel.group = group;
      } else {
        masterTable[masterTable.length - 1].push(data);

        var tempTabel = masterTable[masterTable.length - 1];
        var tempData = masterTable[masterTable.length - 1].length;
        tempTabel[tempData - 1].number = tempData;
        tempTabel.group = group;
      }
    });

    var checkGroup = function(){
      var numGroup = new Array();
      var i = 0;
      masterTable.forEach(function(group) {
        group.forEach(function(item) {
          if (item.team === model.A.home[0].teamA || item.team === model.B.away[0].teamB) { numGroup.push(i); };
        });
        i++;
      });
      return numGroup;
    }();
    
    var finalModel = createFinalModel(checkGroup, masterTable);

    return { masterTable: finalModel }
};

function setObjectTeam(data, model) {
    var n = {};
    n.team = data[0];
    n.match = data[2];
    n.win = data[3];
    n.draw = data[4];
    n.lose = data[5];
    n.getGoal = data[6];
    n.loseGoal = data[7];
    n.point = data[8];
    n.group = data[10];

    if (n.team === model.A.home[0].teamA || n.team === model.B.away[0].teamB) {
      n.cTeam = '99ccff';
    } else {
      n.cTeam = 'ffffff';
    }
    return n;
};

function createFinalModel(group, model) {
  var listGroup = new Array();
  var finalModel = new Array();

  if (group[0] === group[1]) {
    listGroup.push(group[0]);
  } else {
    listGroup = group;
  }

  if (listGroup.length < 2) {
    var position = listGroup[0];
    finalModel.push(model[position]);
  } else {
    for (var i=0;i< listGroup.length; i++){
        var position = listGroup[i];
        finalModel.push(model[position]);
    };
  }

  return finalModel;
};
