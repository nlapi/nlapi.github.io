// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
    status.text('Getting Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        // Call the getData function, send the lat and long
        getData(lat, long);

      });
    } else {
      status.text("Your browser doesn't support Geolocation or it is not enabled!");
    }

  })();

  // Get the data from the wunderground API
  function getData(lat, long){
    $.ajax({
url : "https://api.wunderground.com/api/9dcea6730ca4d03e/geolookup/conditions/q/" + lat + "," + long + ".jsonp",       
  dataType : "jsonp",
  success : function(data) {
  console.log(data);
  var city = data['location']['city'];
  var state = data['location']['state'];
  var temp_f = Math.round(parseInt(data['current_observation']['temp_f']));
  var summary = data['current_observation']['weather'];
  var humidity = data['current_observation']['relative_humidity'];
  var wind = data['current_observation']['wind_mph'];
  var feels = data['current_observation']['feelslike_f'];
  
  
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

  // A function for changing a string to TitleCase
  function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
});
