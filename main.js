// ----------------------------- MAIN APPLICATION

var app = (function ($) {

	"use strict";

	var sliderData = ["images/chrysanthemum.jpg","images/hydrangeas.jpg","images/jellyfish.jpg","images/lighthouse.jpg"];
	var userData = [];
	var scores = {
		"0": "seems like you don't like any of our products :(",
		"5": "nice....at least you like a few ne!",
		"10": "wow! thanks for liking quite ALOT of our products :D :D :D :D"
	};
	var j = 0;

	var buildSlider = function(){
		var getParentHeight = $("#app").innerHeight();
		for(var i=0; i <= sliderData.length - 1; i++){
			$("#app").append("<div style='height: "+getParentHeight+"' class='slide "+ 
								"slide-"+i+"'><img src='"+sliderData[i]+"' /><br><a href='#' class='prod'>Add Product</a></div>");
			setTimeout(function(){ $("#app").find(".slide").eq(0).addClass("active") }, 500);
		}
	};

	var manageNavigation = function(className){

		// NEXT and PREV links
		if($.trim(className) === "prev" || $.trim(className) === "next"){
			if($.trim(className) === "prev"){ j-- } 
				else { j++ }

			$(".slide").removeClass("active").fadeOut("slow");
			$(".slide").eq(j).addClass("active").fadeIn("fast");				

			if(j > 0) { $(".prev").show() }
				else { $(".prev").hide() }

			if(j == sliderData.length - 1) { $(".next").hide() }
				else { $(".next").show() }
		}	

		// SCORE link	
		if($.trim(className) === "scores"){ scorePage() }
	};

	// DUMMY USER DATA SHOW
	var dummyUserdata = function(){
		var howManyProductsAdded = userData.length;
		$(".userData strong").text(howManyProductsAdded);
	};

	// PUSH USER OPTIONS TO ARRAY
	var pushUserSelections = function(){
		// use .push() method here, to build up the user data in the array
		userData.push("data added in");

		// update dummy userData class
		dummyUserdata();
	}

	// SPIT OUT APPROPRIATE RESULT BASED ON USER JOURNEY
	var scorePage = function(){
		var howManyProductsAdded = userData.length;
		if(howManyProductsAdded === 0){ alert( scores["0"] )}
			else if (howManyProductsAdded > 0 && howManyProductsAdded < 6 ){ alert( scores["5"] )}
				else { alert( scores["10"] ) }
	}

	return {
		buildSlider: buildSlider,
		manageNavigation: manageNavigation,
		pushUserSelections: pushUserSelections,
		scorePage: scorePage
	}

})(jQuery);

// ----------------------------- On PAGE LOAD

(function($){

	// build the slider
	app.buildSlider();

})();

// ----------------------------- EVENTS

$(".navigation a").click(function(e){
	e.preventDefault();
	var getClass = $(this).attr("class");
	app.manageNavigation(getClass);
});

$("body").on("click",".prod",function(e){
	e.preventDefault();
	app.pushUserSelections();
});