//////////////////////////////////////////////////////////////////////////////
// Project Select controller
// Author: Jeffrey He
// 
// The project_select.js is a library that serves as a controller 
// for the DOM in the Project_Select.html page. All event listeners
// are defined in this document. 
//////////////////////////////////////////////////////////////////////////////

window.onload = function () {
    searchUserProjects(localStorage.getItem("userId"));
};


$(document).ready(function() {

	// Templates for underscore.js
	Project_Select = _.template($('#Project_Select').html());
	$("#target").html(Project_Select({data: ""}));

	// Retrieve the user and populate the dropdowns
	userId = localStorage.getItem("userId");
    findAllEnrolledClass(function(params, classes){
        localStorage.setItem("class", JSON.stringify(classes))} ,"", userId);

	$("body").on('click', '#start_project', function (e) {
		var e1 = document.getElementById("progdropdown");
		var selfProject = e1.options[e1.selectedIndex].value;

        var e2 = document.getElementById("assigneddropdown");
		var assignedProject = e2.options[e2.selectedIndex].value;

		if(e1.selectedIndex > 0 && e2.selectedIndex > 0){
			console.log(e1.selectedIndex, e2.selectedIndex);
			alert("You can only select one project at a time");
			return;
		}

		if(e1.selectedIndex > 0){
			localStorage.setItem('project', JSON.stringify(PersonalProjects[e1.selectedIndex - 1]));
			searchPortfolios(PersonalProjects[e1.selectedIndex - 1]);
			window.location.href = 'wheel.html';
		}

		if(e2.selectedIndex > 0){
			localStorage.setItem('project', JSON.stringify(AssignedProjects[e2.selectedIndex - 1]));
			searchPortfolios(AssignedProjects[e2.selectedIndex - 1])
			window.location.href = 'wheel.html';
		}
    });

	// Logout Button
    $("body").on('click', '#logout_button', function (e) {
        window.location.href = 'index.html';
        //localStorage.clear();
    });

});

/*
* Precondition: userid (student)
* Postcondition: assignedProjects, PersonalProjects
* Finds all projects a student is a part of (Personal and Assigned Projects)
*/ 
function searchUserProjects(userId) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.responseText && xmlHttp.status == 200 && xmlHttp.readyState == 4) {
            var obj = jQuery.parseJSON(xmlHttp.responseText);
            PersonalProjects = [];
            AssignedProjects = [];
            $.each(obj, function () {
                if (this['AuthorId'] == userId) {
                    // Load the private projects.
                    PersonalProjects.push(this);
                } else {
                    // Load the Assigned projects
                    console.log(this);
                    for(i = 0; i < this.students.length; i++){
                        if(this.students[i]._id = userId && this.students[i].firstName == localStorage.firstName){
                            AssignedProjects.push(this);
                        }
                    }
                }
            });
            $("#target").html(Project_Select({data: {student: obj, 
           		assignedProjects: AssignedProjects, 
                personalProjects: PersonalProjects} }));
        }
    };
    xmlHttp.open("GET", "https://mydesigncompany.herokuapp.com/projects", true);
    xmlHttp.send(null);
};

// Once a user has selected a project, find all the portfolios associated with 
// it and put it in local storage so it can be used on the student dashboard
function searchPortfolios(project){
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.responseText && xmlHttp.status == 200 && xmlHttp.readyState == 4) {
            var obj = jQuery.parseJSON(xmlHttp.responseText);
            portfolios = [];
            $.each(obj, function () {
            	if(project._id == this.ProjId && this.AuthorId == userId){
            		portfolios.push( JSON.stringify(this) )
            	}
            });
            localStorage.setItem('portfolios', JSON.stringify(portfolios));

            console.log(localStorage)
            
        }
    };
    xmlHttp.open("GET", "https://mydesigncompany.herokuapp.com/portfolio", true);
    xmlHttp.send(null);
}
