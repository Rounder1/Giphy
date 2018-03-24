
// wait for the doc to finish loading before running any code
$(document).ready(function() {


    var buttonsArray = ["cat", "dog"];
    
    function addButtons() {
    
        // Deletes all the buttons so that they can be re-added below
        $("#buttons-appear-here").empty();
    
        // Loop through buttonsArray then generate buttons for each value in the array
        for (var i = 0; i < buttonsArray.length; i++) {
            var addButton = $("<button>" + buttonsArray[i] + "</button>")
            addButton.addClass("buttons");
            $("#buttons-appear-here").append(addButton);
        }
    }
    
    // add the default buttons
    addButtons();
    
    
    // adds new botton to the document
    $("#add-button").on("click", function(event) {
    
        // Deletes all the gifs so that new ones can be re-added below
        $("#buttons-appear-here").empty();
    
        //prevents submit button from trying to send a form.
        event.preventDefault();
    
        // Write code to grab the text the user types into the input field
        var newButton = $("#button-input").val();
        
        // Write code to add the new movie into the movies array
        buttonsArray.push(newButton);
    
        // The renderButtons function is called, rendering the list of movie buttons
        addButtons();
    });
    
    // on click event for when the gif image is clicked, give every image tag the "gif" class so that this logic applies 
    // must use the container div in selector because the child tags are dynamically generated
    $("#gifs-appear-here").on('click', '.gif' ,function() {
    
    console.log(this);
        // The html tags have 3 additional attributes, "state", "data-animate", and "data-still" 
        // the last 2 hold the gif url and the static image url and state is used to mark which one is being used
        // the code below will change which url is in the "src" attribute whenever the user clicks the gif
        var state = $(this).attr("data-state");
    
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");        
        }
    });
    
    // When the user presses a button make an AJAX call to the giphy API
    // Pulls down 10 gifs and their ratings based on this button click 
    $("#buttons-appear-here").on('click', '.buttons' ,function() {
    
        // Deletes all the gifs so that new ones can be re-added below
        $("#gifs-appear-here").empty();
    
        // pulls the text from the "data-user-search" attribute on the buttons and adds them to the API call
        //***MAYBE use .val() and pull the text out of the button instead?*** $(this).attr("data-user-search");
        var userSearch = $(this).text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userSearch + "&api_key=dc6zaTOxFJmzC&limit=10";
    
        $.ajax({
            url: queryURL,
            method: "GET" 
            }).then(function(response) {
    
                var results = response.data; // save the JSON in this var
                console.log(results); //see what the JSON is!!!
    
                for (var i = 0; i < results.length; i++) {
    
                    // create a div tag to house the rating and img tag
                    var gifDiv = $("<div class='item'>");
                    
                    // create p tag for the gif rating
                    var p = $("<p>");
                    p = "gif rateing: " + results[i].rating;
    
                    // create the img tag for the gifs and add all the needed attributes
                    var animalImage = $("<img>");
                    animalImage.attr("src", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-animate", results[i].images.fixed_height.url);
                    animalImage.attr("data-state", "still");
                    animalImage.addClass("gif");
    
                    // add the rating tag and img tag to the gifDiv tag
                    gifDiv.prepend(animalImage);
                    gifDiv.prepend(p);
    
                    // write the gifDiv to the document
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            });
        });
    });
        