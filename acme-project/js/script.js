$(function () {

    $.getJSON("./js/acme.json", function (data) {
        console.log(data);

        var output = '<li><a href="https://nlapi.github.io/acme-project">Home</a></li>';
        var counter = 0;

        $.each(data.Navigation, function() {
            output += '<li>';
            output += '<a href=#' + counter + '>' + data.Navigation[counter] + '</a>';
            output += '</li>';
            counter++;
        });

        $("#navbar").html(output);
    }); // end getJSON

});

$( "#navbar" ).on( "click", "a", function(ev) {

    var item = $(this).text();

    if( item == "Home") {
        makeHomePage();
    } else {
        getData(item);
    }
});

function getData(item){

    console.log(item);

    $.ajax({
        url : "./js/acme.json",
        dataType : "json",
        success : function(data) {
            console.log(data[item].name);
            $("#zhvillim-produkti").css("display", "flex");
            $("#emri-produktit").text(data[item].name);
            $("#pershkrimi-produktit").css("background-image", "url(" + data[item].path + ")");
            $("#ne-shtepi").css("display", "none");
			
            var output = '';

            output += "<li>" + data[item].description + "</li>"
            output += '<li><strong>Made by: </strong>' + data[item].manufacturer + '</li>';
            output += '<li><strong>Reviews: </strong>' + data[item].reviews + '/5 stars</li>';
            output += '<li><h2>Price: $' + data[item].price + '</h2></li>';

            $("#pershkrimi-produktit").html(output);

            $("#pershkrimi-produktit h2").css("color", "#de2226");
            $("title").text("ACME - " + data[item].name);
        }
    });
}

function makeHomePage() {
    $("#ne-shtepi").css("display", "flex");
    $("#zhvillim-produkti").css("display", "none");
}
