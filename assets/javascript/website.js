var emotions = ["happy", "sad", "angry", "confused", "excited", "lmao", "speechless"]
var emotionsValues = [":)", ":(", ">:(", "o.O", ">:D", "XD", ":|"]

$(document).ready(function() {
    // for loop; append buttons to div,
    for (var i = 0; i < emotions.length; i++) {
        var gifButton = $("<button>")
        gifButton.attr("data-emotion", emotions[i]);
        gifButton.text(emotionsValues[i]);
        $("#buttons").append(gifButton);
    }

    //click event, if works on all buttons, add class or id to buttons
    $("button").on("click", function() {
        var emotion = $(this).attr("data-emotion")
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        emotion + "&api_key=uqfS2usTVbI4HfdQm9ZwE2TWZMCjH515&limit=10";
        // ajax request
        $.ajax({
            url: queryURL,
            method: "GET",
        })

        .then(function(response) {
            var results = response.data;
            //for loop display gifs, ratings
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !=="pg-13") {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var h5 = $("<h5>").text("Rating: " + rating);

                    var initialImage = $("<img>");
                    initialImage.attr("src", results[i] .images.fixed_height_still.url);

                    gifDiv.append(h5);
                    gifDiv.append(initialImage);

                    //Prepend gifs to HTML div
                    $("#gifs-appear-here").prepend(gifDiv);
                };  
            };
        });
    });
    // on click, play or pause gifs

    //search and push with input


});
