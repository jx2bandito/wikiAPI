$(document).ready(function() {
  var $search = $("#search");
  var $go = $("#go");
  var $textWell = $("#textWell");
  var $body = $("#body");
  var $menu = $("#menu");
  

  
  $search.keyup(function(e){
    if (e.which == 13){
        $go.click();
    }
});
  
  
  $go.on("click", function() {
    $textWell.html("");
    var result = "";
    result += $search.val();
    if (result == "") {
      $search.val("Rick Astley");
      $go.click();
    } else {
      $.getJSON("https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + result + "&utf8=&format=json&srlimit=10&callback=?", function(json) {
        var a = 0;
        var getResult = setInterval(function(){
         if(!json.query.search[a]){
           clearInterval(getResult);
           return false;
         }
          var title = "";
          title = json.query.search[a].title;
        var extract = "";
        $.getJSON('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=' + title + '&callback=?&formatversion=2&exsentences=10&exintro=1', function(json){
          extract = json.query.pages[0].extract;
          var id = json.query.pages[0].pageid;
          var title1 = JSON.stringify(json.query.pages[0].title);
          
          if(extract.indexOf("<li>") == -1){
            $textWell.append(
              "<a class='small answer' title=" +
              title1 +
              " target=blank href=https://en.wikipedia.org/?curid=" +
              id +
              "> <h4>" +
              extract +
              "</h4></a>"
            );

        }})
          
          a++
        }, 350);
      });
    }

  });



});