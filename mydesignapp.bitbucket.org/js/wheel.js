//////////////////////////////////////////////////////////////////////////////
// Project Wheel controller
// Author: Jeffrey He
// 
// The wheel.js is a library that serves as a controller 
// for the DOM in the wheel.html page. All event listeners
// are defined in this document. 
//////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {

	$("body").on('click', '#Component_I', function (e) {
		localStorage.setItem("compNum", 1);
		window.location.href = 'Dashboard_Student2.html';
	});

	$("body").on('click', '#Component_II', function (e) {
		localStorage.setItem("compNum", 2);
		window.location.href = 'Dashboard_Student2.html';
	});

	$("body").on('click', '#Component_III', function (e) {
		localStorage.setItem("compNum", 3);
		window.location.href = 'Dashboard_Student2.html';
	});

	$("body").on('click', '#Component_IV', function (e) {
		localStorage.setItem("compNum", 4);
		window.location.href = 'Dashboard_Student2.html';
	});

	$("body").on('click', '#goToInfoPage', function (e) {
		window.open('rubric.html', '_newtab');
	});

});


function setComponent(num) {
    console.log("Set component cookie to");
    console.log(num);
    checkCookieComponent("component", num);
    setCookie("component", num);
}
