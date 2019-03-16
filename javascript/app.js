
//array of things in nature
var termArray=["sunset","mountain","cloud","tree","snow","sea"];


//dispaying buttons in the array
function renderButtons(){
	//emptying button panel
	console.log(termArray);
	$("#buttons").empty();
	//looping through the array and dynamically creating a button to each element in the array
	for(var i = 0; i < termArray.length; i++){
		var button = $("<button>");
		button.addClass("termButton");
		button.attr("data-term",termArray[i]);
		button.text(termArray[i]);

		//add button to HTML
		$("#buttons").append(button);
	}//end for loop
} //end renderButtons



//event handler for user to add more buttons
$("#add-term").on("click", function(event) {

	event.preventDefault();
	//get input from text box
	var term = $("#term-input").val().trim();
	//adding the text to the array in order to creat the button 
	termArray.push(term);
	$("#term-input").val("");

	renderButtons();

}); //end function(event)



//geting gifs from api
function getGifs() {
  //get element from array when button is clicked 
  var termName = $(this).attr("data-term");
  var termStr = termName.split(" ").join();

  console.log(termName);
  console.log(termStr);
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=lIqTsBAKPqaawAbkE83EPdm06YjOlMS7&q="
  + termStr + "&limit=25&offset=0&rating=G&lang=en";

  // make AJAX call giphy api
  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .then(function(response){

      console.log(queryURL);
      console.log(response);
      var dataArray = response.data;
      console.log(dataArray);
      
  	//creat and display div elements for each one of the returned Gifs
      $("#gifsHere").empty();
      
    for (var i = 0; i < dataArray.length; i++) {

    	var newDiv = $("<div>");
      	newDiv.addClass("termGif");

      	var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
     	newDiv.append(newRating);

     	var img = $("<img>");
     	 img.attr("src", dataArray[i].images.fixed_height_still.url);
      	 img.attr("data-still", dataArray[i].images.fixed_height_still.url);
     	 img.attr("data-animate", dataArray[i].images.fixed_height.url);
     	 img.attr("data-state", "still");
     	 newDiv.append(img);

      // display gifs on the top 
      $("#gifsHere").append(img);

    }

  });

}

//animate still gifs and vice versa
function animateGifs() {
  
  var state = $(this).find("img").attr("data-state");

  if (state === "still") 
  {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } 
  else 
  {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }

}//end animatGifs

$(document).ready(function() {
  renderButtons();
});
$(document).on("click", ".termButton", getGifs);

$(document).on("click", ".termGif", animateGifs);