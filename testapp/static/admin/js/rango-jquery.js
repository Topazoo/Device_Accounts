// $(document).ready( function() {

    // $("#about-btn").click( function(event) {
        // alert("You clicked the button using JQuery!");
    // });
// });

$(document).ready( function(){
	$("#about-btn").click( function(event) {
		name = localStorage.getItem("name");
		if (name == null || name == "null"){
			alert("Hi, Stranger!");
			name = prompt("What is your name?");
			localStorage.setItem("name", name);
		} 
		
		else {
			alert ("Hi, " + name + "!");
		} // end greet
} // end function  
