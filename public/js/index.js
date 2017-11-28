// ACTION
function loadItem () {
  var id = parseInt(getParameterByName("id")) - 1;
  var apiPath = "/" + id;

  $.get(apiPath, function(information){
    var information = JSON.parse(information);

    console.log(information);

    // setup data
    var data = information.gameData;
    var history = information.gameHistory;
    var rankTable = information.rankTable;
    var gameInfo = information.gameInfo;

    // Obj are by ref-
    setData(data, history);
    var model = createModel(data, history);

    document.title = gameInfo.taname + ' Vs ' + gameInfo.tbname;
    //set default text area
    // setDefaultText({
    //   data: data,
    //   history: history,
    //   rankTable: rankTable,
    //   gameInfo, gameInfo
    // });

    // Check api rankTable is exist
    if (rankTable) {
      var masterTable = setRankTable(rankTable, model);
    } else {
      var masterTable = []
    };

    // history
    var gameInfoTemplate = $('#gameInfo-template').html();
    var gameInfoHtml = Mustache.render(gameInfoTemplate, {gameInfo,model});
    $('#gameInfo').html(gameInfoHtml);

    // history
    var historyTemplate = $('#history-template').html();
    var historyHtml = Mustache.render(historyTemplate, model);
    $('#history').html(historyHtml);

    // A all
    var aAllTemplate = $('#A-all-template').html();
    var aAllHtml = Mustache.render(aAllTemplate, model);
    $('#A-all').html(aAllHtml);
    // A home
    var aHomeTemplate = $('#A-home-template').html();
    var aHomeHtml = Mustache.render(aHomeTemplate, model);
    $('#A-home').html(aHomeHtml);

    // B all
    var bAllTemplate = $('#B-all-template').html();
    var bAllHtml = Mustache.render(bAllTemplate, model);
    $('#B-all').html(bAllHtml);
    // B away
    var bAwayTemplate = $('#B-away-template').html();
    var bAwayHtml = Mustache.render(bAwayTemplate, model);
    $('#B-away').html(bAwayHtml);

    // rank table
    var rankTableTemplate = $('#rankTable-template').html();
    var rankTableHtml = Mustache.render(rankTableTemplate, masterTable);
    $('#rank').html(rankTableHtml);

    // Action
    $("#LoadH").click(function() {
      domtoimage.toJpeg(document.getElementById('history-Body'), { quality: 1 })
      .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'q.jpg';
          link.href = dataUrl;
          link.click();
      });
    });
    $("#LoadRank").click(function() {
      domtoimage.toJpeg(document.getElementById('rankTable'), { quality: 1 })
      .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'w.jpg';
          link.href = dataUrl;
          link.click();
      });
    });
    $("#LoadA-All").click(function() {
      domtoimage.toJpeg(document.getElementById('A-all-Body'), { quality: 1 })
      .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = '1.jpg';
          link.href = dataUrl;
          link.click();
      });
    });
    $("#LoadA-Home").click(function() {
      domtoimage.toJpeg(document.getElementById('A-home-Body'), { quality: 1 })
      .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = '2.jpg';
          link.href = dataUrl;
          link.click();
      });
    });
    $("#LoadB-All").click(function() {
      domtoimage.toJpeg(document.getElementById('B-all-Body'), { quality: 1 })
      .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = '3.jpg';
          link.href = dataUrl;
          link.click();
      });
    });
    $("#LoadB-Away").click(function() {
      domtoimage.toJpeg(document.getElementById('B-away-Body'), { quality: 1 })
      .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = '4.jpg';
          link.href = dataUrl;
          link.click();
      });
    });

  });
};

// set up default text
function setDefaultText(obj) {
  var myTextArea = $('#inputTextToSave');
  var gameInfo = obj.gameInfo;

  var teamA = gameInfo.taname;
  var teamB = gameInfo.tbname;
  var handicap = gameInfo.handicap;

  myTextArea.val(myTextArea.val() + teamA + ' ' + teamB + ' '+ handicap);
}

// GET PARAMS
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// show element
function showElement() {
    var hideElement = document.getElementById("hideElement");
    if (hideElement.style.display === "none") {
      hideElement.style.display = "block";
    } else {
      hideElement.style.display = "none";
    }

    // $('html,body').animate({
    //     scrollTop: $("#hideElement").offset().top},
    // 'slow');
}

// save text filesaver
function saveTextAsFile()
{
    var textToSave = document.getElementById("inputTextToSave").value;
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/csv"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = parseInt(getParameterByName("id")) + '.csv';

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
}

// load txt file
function loadFileAsText()
{
    var fileToLoad = document.getElementById("fileToLoad").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent)
    {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        document.getElementById("inputTextToSave").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}

// remove btn element
function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}
