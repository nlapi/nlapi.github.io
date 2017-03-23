     $('#query').keyup(function() {
            var value = $('#query').val();
            var rExp = new RegExp(value, "i");
            $.getJSON("https://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function(data) {
                console.log(data); // test for JSON received
                // Begin building output
                var output = '<ol id="ol">';
                $.each(data.RESULTS, function(key, val) {
                    if (val.name.search(rExp) != -1) {
                    output += '<li>';
                    output += '<a href="http://www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
                    output += '</li>';
                    }
                }); // end each
            output += '</ol>';
            $("#searchResults").html(output); // send results to the page
            }); // end getJSON
          }); // end onkeyup
     

        

  
  function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  
};       




function getData(input) {
 
  $.ajax({
    url: "https://api.wunderground.com/api/5535e46c982d7f36/geolookup/conditions/q/"
    + input + ".json"
    , dataType: "jsonp"
    , success : function(parsed_json) {
  console.log(parsed_json);
  var city = parsed_json['location']['city'];
  var state = parsed_json['location']['state'];
  var temp_f = Math.round(parseInt(parsed_json['current_observation']['temp_f']));
  var summary = parsed_json['current_observation']['weather'];
  var humidity = parsed_json['current_observation']['relative_humidity'];
  var wind = parsed_json['current_observation']['wind_mph'];
  var feels = parsed_json['current_observation']['feelslike_f'];
  
  
  $("#cityDisplay").text(city + ", " + state);
  $("#summary").text(summary);
  $("#currentTemp").text(temp_f + "°");
  $("#add1").text("Humidity:" + " " + humidity);
  $("#add2").text("Current Wind Speed is: " + wind + " " + "MPH");
  $("#add3").text("Feels Like: " + feels + "°");
               
                
      $("#cover").fadeOut(250);
    }
           });

  }


$("#searchResults").on("click", "a", function (evt) {
  evt.preventDefault();
 
  var jsonCity = $(this).text(); // Franklin, etc...
  console.log(jsonCity);
  $.ajax({
    url: "https://api.wunderground.com/api/5535e46c982d7f36/geolookup/conditions/q/"
    + jsonCity + ".json" 
    , dataType: "json"
    , success: function (data) {
      console.log(data);
      console.log(data['location']['zip']);
      var zip = data['location']['zip'];
      console.log(zip);
      getData(zip);
    }
  });
});

$("#searchResults").on('click', "a", function(evt){
    document.getElementById('ol').style.display="none";
})