var emotions = [
    "happy",
    "sad",
    "angry",
    "confused",
    "excited",
    "lmao",
    "speechless",
];

var emotionsValues = [":)", ":(", ">:(", "o.O", ">:D", "XD", ":|"];

// for loop; append buttons to div
function createButtons() {
    for (var i = 0; i < emotions.length; i++) {
        var gifButton = $("<button>");
        gifButton
            .attr("data-emotion", emotions[i])
            .text(emotionsValues[i])
            .addClass("GiffyButtons");
        $("#buttons").append(gifButton);
        gifButton.on("click", getGifs);
    }
}

//clear area
function clear() {
    $("#gifs-appear-here").empty();
}

function getGifs() {
    clear()

    var emotion = $(this).attr("data-emotion");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=uqfS2usTVbI4HfdQm9ZwE2TWZMCjH515&limit=10";
    console.log(emotion);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) { 
        var results = response.data;
        //for loop display gifs, ratings
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var h5 = $("<h5>").text("Rating: " + rating);

                var initialImage = $("<img>");

                initialImage.attr("src", results[i].images.fixed_height_still.url);

                initialImage.attr(
                    "data-still",
                    results[i].images.fixed_height_still.url
                );

                initialImage.attr("data-animate", results[i].images.fixed_height.url);

                initialImage.attr("data-state", "still");

                gifDiv.append(h5);
                gifDiv.append(initialImage);

                //Prepend gifs to HTML div
                $("#gifs-appear-here").prepend(gifDiv);

                // on click, play or pause gifs
                $(initialImage).on("click", function () {
                    var state = $(this).attr("data-state");

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });
            }
        }
    });
}

$(document).ready(function () {
    createButtons();

    //search and push with input
    $("#searchButton").on("click", function (event) {
        event.preventDefault();
        var userInput = $("#searchInput").val().trim();
        console.log(userInput);
        emotions.push(userInput);
        emotionsValues.push(userInput);
        console.log(emotions);
        $("#buttons").empty();
        createButtons();
    });
});