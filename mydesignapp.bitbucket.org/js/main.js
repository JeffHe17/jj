//Author: Jeffrey He, Winter 2015


function otherSelect() {
    /*WARNING: POSSIBLE BUG THAT MAY NEED TO BE FIXED. If the database is ever edited in such 
    a way that "Other Design" is no longer the 11th place, this code will break. Suggested fix:
    Instead of testing for x == 11, test for x == "Other Design" and set var x to get text and 
    not value. Safest fix will also take into account capitalization. */
    var x = document.getElementById("typedropdown").value;
   	if(x == 11 ){
   	 	document.getElementById("demo").style.visibility = "visible";
	  } else {
		  document.getElementById("demo").style.visibility = "hidden";
	  }
}

//These Scripts are for the login page. Where the login box fades in. 
$(window).load(function(e){
  $('#triggeringlink').on('click',function(e){
     $("#page-cover").css("opacity",0.75).fadeIn(300, function () {            
        $('#fadebox').css({'position':'absolute','z-index':9999});
     });
   e.preventDefault();
   document.getElementById('fadebox').style.visibility = "visible";
   });
});

//Disable logins for teacher and professional for DEMO ONLY

$(window).load(function(e){
  $('#triggeringlink2').on('click',function(e){
     $("#page-cover").css("opacity",0.75).fadeIn(300, function () {            
        $('#fadebox').css({'position':'absolute','z-index':9999});
     });
   e.preventDefault();
   document.getElementById('fadebox').style.visibility = "visible";
   });
});


$(window).load(function(e){
  $('#triggeringlink3').on('click',function(e){
     $("#page-cover").css("opacity",0.75).fadeIn(300, function () {            
        $('#fadebox').css({'position':'absolute','z-index':9999});
     });
   e.preventDefault();
   document.getElementById('fadebox').style.visibility = "visible";
   });
});
//End Disable

//End Script for index page fade effects

function PassMatch(){
    //Store the password field objects into variables ...
    var pass1 = document.getElementById('pass1');
    var pass2 = document.getElementById('pass2');
    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessage');
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field 
    //and the confirmation field
    if(pass1.value == pass2.value){
        //The passwords match. 
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Passwords Match!";
    }else{
        //The passwords do not match.
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Passwords Do Not Match!";
    }
}  




/******************************************
            Cookie Functions
*******************************************/
//Checks if cookie contains var : data
function checkCookieId(cname, cvalue) {
      var user=getCookie(cname);
      if (user != "") {
          console.log("Cookie variable exists: "+user);
      } else {
         user = cvalue;
         if (user != "" && user != null) {
             setCookie(cname, user, 30);
         }
      }
  }

function checkCookieComponent(data) {
      var user=getCookie("userid");
      if (user != "") {
          console.log("Cookie variable exists: "+user);
      } else {
         user = data._id;
         if (user != "" && user != null) {
             setCookie("userid", user, 30);
         }
      }
  }

  //sets cookie var : cname with var : cvalue for var : exdays (30 recommended)
  function setCookie(cname,cvalue,exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires=" + d.toGMTString();
      document.cookie = cname+"="+cvalue+"; "+expires;
  }

  //returns value for desired cookie var : cname 
  function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }