//////////////////////////////////////////////////////////////////////////////
// User Management Library
// Author: Jeffrey He
//
// The user_lib.js is a library that contains all functions needed to 
// retrieve or store data relating to users (students and teachers). 
//////////////////////////////////////////////////////////////////////////////

/*
* Precondition: User ID, Callback Function, Parameters for the Callback function
* Postcondition: User Object
*/
function findUserByID(id, callback, params){ 
    var xmlHttpF = new XMLHttpRequest();
    xmlHttpF.onreadystatechange = function () {
        if (xmlHttpF.responseText && xmlHttpF.status == 200 && xmlHttpF.readyState == 4) {
            var obj = jQuery.parseJSON(xmlHttpF.responseText);
            callback(obj, params)
            return obj
        } else {
            console.log("Error", xmlHttpF.statusText, xmlHttpF.status, xmlHttpF.readyState);
            return null
        }
    };
    url = "https://mydesigncompany.herokuapp.com/users/" + id
    xmlHttpF.open("GET", url, true);
    xmlHttpF.send(null);
}


/*
* Precondition: Callback function, Parameters for the Callback function
* Postcondition: Returns an array of all teachers in the teachers Mongodb collection
*/

function getAllTeachers(callback, params){
    all_teachers = [];
    var xmlHttpF = new XMLHttpRequest();
    xmlHttpF.onreadystatechange = function () {
        if (xmlHttpF.responseText && xmlHttpF.status == 200 && xmlHttpF.readyState == 4) {
            var obj = jQuery.parseJSON(xmlHttpF.responseText);
            var portfolioCurrent;
            $.each(obj, function () { 
                if(this['accountType'] == "Teacher"){   
                    all_teachers.push(this)
                }
            });
            callback(params, all_teachers)
            return all_teachers;
        }
    };
        xmlHttpF.open("GET", "https://mydesigncompany.herokuapp.com/users/", true);
        xmlHttpF.send(null);
}

/*
* Precondition: Callback function, Parameters for the Callback function
* Postcondition: Returns an array of all students in the students_new Mongodb collection 
*/
function getAllStudents(callback, params){
	all_students = [];
    var xmlHttpF = new XMLHttpRequest();
    xmlHttpF.onreadystatechange = function () {
        if (xmlHttpF.responseText && xmlHttpF.status == 200 && xmlHttpF.readyState == 4) {
            var obj = jQuery.parseJSON(xmlHttpF.responseText);
            var portfolioCurrent;
            $.each(obj, function () { 
                if(this['accountType'] == "Student"){   
                    all_students.push(this)
                }
            });
            callback(params, all_students)
            return all_students;
        }
    };
        xmlHttpF.open("GET", "https://mydesigncompany.herokuapp.com/users/", true);
        xmlHttpF.send(null);
}

/*
* Precondition: 
* Postcondition: Creates and posts a new user 
*/
function addUser(last, first, username, email, password, location, school, usertype, exp){
	$.ajax({
		type: "POST",
		url: "https://mydesigncompany.herokuapp.com/users/",
        data: JSON.stringify({
            lastName: last,
            firstName: first,
                    userName: username,
                    email: email,
                    password: password,
                    location: location,
                    school: school,
                    accountType: usertype,
                    experience: exp
        }),
		contentType: "application/json",
		dataType: "json",
		success: function (result) {
			hideProgress();
			console.log("result");
            console.log(result);
                    //window.location.href = "index.html";
        },
        error: function (xhr, ajaxOptions, thrownError) {
        	console.log(xhr.status);
            console.log(thrownError);
            var message = document.getElementById('missingInfoMessage');
            message.style.color = "#ff6666";
            message.innerHTML = "Username and/or Email is already taken";
            if(thrownError == 400){
            	console.log("Malformed request: Check input data")
            }
        }
    });
}

