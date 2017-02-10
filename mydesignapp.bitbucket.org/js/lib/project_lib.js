//////////////////////////////////////////////////////////////////////////////
// Project Management Library 
// Author: Jeffrey He
//
// The project_lib.js is a library that contains all the functions 
// needed to retrieve or store data relating to project and portfolio 
// management. 
//////////////////////////////////////////////////////////////////////////////



/*
* Precondition: Callback function, Parameter for Callback function
* Postcondition: Returns all portfolios in the database 
*/ 
//I need to pull the authorID from the portfolio and then take it back to the students collection and use it to pull the user data I need such as name, 
function getAllPortfolios(callback_in, params_in){
    All_Portfolios = [];
    students_and_workproducts = [];
    var xmlHttpF = new XMLHttpRequest();
    xmlHttpF.onreadystatechange = function () {
        if (xmlHttpF.responseText && xmlHttpF.status == 200 && xmlHttpF.readyState == 4) {
            var obj = jQuery.parseJSON(xmlHttpF.responseText);
            $.each(obj, function () {
                if(this['AuthorId'] != null){ 
                    All_Portfolios.push(this)
                }
            });
            // TODO: XMLHttpRequest on the main thread is deprecated. Replace with a promise. This code might also have trouble scaling
            for (i = 0; i < All_Portfolios.length; i++){
                var request = new XMLHttpRequest();  
                request.open('GET', "https://mydesigncompany.herokuapp.com/users/" + All_Portfolios[i].AuthorId, false);   
                request.send(null);  
                if (request.status == 200){
                    var student = jQuery.parseJSON(request.responseText);
                    students_and_workproducts.push({student: student, portfolio: All_Portfolios[i]})
                }
            }
            callback_in(params_in, students_and_workproducts)
            return All_Portfolios;
        }
    };
    xmlHttpF.open("GET", "https://mydesigncompany.herokuapp.com/portfolio", true);
    xmlHttpF.send(null);
}

/*
* Precondition: A file, coursetitle, student. 
* Postcondition: returns nothing. Posts file to AWS
*/
function uploadFileAWS(file, courseTitle, studentID){
    console.log(file)
    jfile = JSON.parse(file) // Parse json back into object. 
    console.log(jfile.WorkProductFileName)
    filename = jfile.WorkProductFileName;
    filename = "testfile"

    s3.upload({
        Key: filename,
        Body: jfile.WorkProductByteArray,
        ACL: 'public-read'
    }, function(err, data) {
        if (err) {
        return alert('There was an error uploading your photo: ', err.message);
        }
        alert('Successfully uploaded photo.');
    });
    
}


/*
* Precondition: A portfolio object represented as a json
* Postcondition: Returns nothing
* uploadPortfolio is passed a portfolio json object and uploads it to the database
*/
function uploadPortfolio(portfolio, courseTitle, studentID, student){
    // Update the portfolio object
	$.ajax({
        'type': 'POST',
        'url': 'https://mydesigncompany.herokuapp.com/portfolio/', 
        'data': portfolio,
        'contentType': "application/json;charset=UTF-8",
        'success': function (data) {                    
	        console.log(data);
	        if (data) {                
	        	console.log('JQuery GET request sent!');
                alert("Portfolio succesfully uploaded")
	            //window.location.href = "portfolio.html"; 
			}
		},
		'error': function (xhr) {
	        alert("fail to upload portfolio");
            console.log(xhr);
           	switch (xhr.status) {
	       	case 404:
				console.log("Webpage not found 404");
 	        case 400:
                console.log("Error, invalid login info 400");
            }
        }
    });

    // Update the student object
    $.ajax({
        'type': 'POST',
        'url': "https://mydesigncompany.herokuapp.com/users_id/update/",
        'data': JSON.stringify({
            "student": student,
            "portfolio": portfolio,
            "studentID": studentID
        }),
        'contentType': "application/json;charset=UTF-8",
        'success': function (data) {
            console.log(data);
            if (data) {
                console.log('JQuery POST ProjectDescription request sent!');
            }
        },
        'error': function (xhr) {
            alert("Assessment Submission Failed");
            console.log(xhr);
            switch (xhr.status) {
                case 404:
                    console.log("Webpage not found 404");
                    break;
                case 400:
                    console.log("Error, invalid login info 400");
                    break;
                case 400:
                    console.log("Error, invalid uProjectDescriptionate request 401");
                    break;
                default:
                    console.log("Some other kind of error. should never get here");
            }
        }
    });

    // Update the student object in the class and team they are in
    if(student.classID != ""){
        console.log("Updating the student object in the class and team they are in")
        $.ajax({
            'type': 'POST',
            'url': "https://mydesigncompany.herokuapp.com/myClass/ID/update/portfolio",
            'data': JSON.stringify({
                "studentID": studentID,
                "portfolio": portfolio,
                "classID": student.classID
            }),
            'contentType': "application/json;charset=UTF-8",
            'success': function (data) {
                console.log(data);
                if (data) {
                    alert("succesful update into class")
                    console.log('JQuery POST ProjectDescription request sent!');
                }
            },
            'error': function (xhr) {
                alert("Assessment Submission Failed");
                console.log(xhr);
                switch (xhr.status) {
                    case 404:
                        console.log("Webpage not found 404");
                        break;
                    case 400:
                        console.log("Error, invalid login info 400");
                        break;
                    case 400:
                        console.log("Error, invalid uProjectDescriptionate request 401");
                        break;
                    default:
                        console.log("Some other kind of error. should never get here");
                }
            }
        });
    }
}

/*
* Precondition: The portfolio to upload to the AWS bucket
* Postcondition: Uploads a portfolio object to the AWS bucket
*/
function uploadWorkProduct(portfolio){

}

/*
* Precondition: Callback, params for callback, Author ID
* Postcondition: Returns an array of all projects that is managed by this Author
*/
function getProjectsByAuthor(callback, params, author_ID){
    var Projects = []
    var xmlHttpP = new XMLHttpRequest();
    xmlHttpP.onreadystatechange = function () {
        if (xmlHttpP.responseText && xmlHttpP.status == 200 && xmlHttpP.readyState == 4) {
            var obj = jQuery.parseJSON(xmlHttpP.responseText);
            $.each(obj, function () {
                if ((this['AuthorId'] == author_ID)){ //only load projects that are assigned by this author
                    project = { ID: this['_id'], 
                            authorID: this['AuthorId'], 
                            name: this['ProjectName'], 
                            description: this['ProjectDescription'],
                            type: this['ProjectType']}
                    Projects.push(project)
                }
            });
            console.log(Projects)
            callback(params, Projects)
            return Projects;
        }
    };
    xmlHttpP.open("GET", "https://mydesigncompany.herokuapp.com/projects", true);
    xmlHttpP.send(null);
}

/*
* Precondition: Design step 
* Postcondition: Returns the design component the design step belongs to
*/
function getDesignComponent(design_step){
    step_levels = [3,6,9,12]
    for(i = 0; i < step_levels.length; i++){
        if(design_step <= step_levels[i]){
            return i + 1
        }
    }
    return step_levels.length + 1
}

/* 
* Precondition: Student Object, Portfolio Object, Array of text rubric responses, Teacher Comments
* Postcondition: Teacher comments and assessments are submitted back into the portfolio 
*/
function submitTeacherComments(student, portfolio, assessment_response, rubric_questions, comments, status, status_color) {
    // Update the portfolio collection
    $.ajax({
        'type': 'POST',
        'url': "https://mydesigncompany.herokuapp.com/portfolio/assessment",
        'data': JSON.stringify({
            "_id": {"$oid": portfolio._id},
            "TeacherId": portfolio.TeacherId,
            "AssessmentValue": {
                "Grades": portfolio.AssessmentValue.Grades,
                "Rubric_Response": assessment_response,
                "Rubric_Questions": rubric_questions
            },
            "TeacherComment": comments,
            "InProgress": false,
            "Status": status,
            "StatusColor": status_color
        }),
        'contentType': "application/json;charset=UTF-8",
        'success': function (data) {
            console.log(data);
            if (data) {
                console.log('JQuery POST uProjectDescriptionate request sent!');
            }
        },
        'error': function (xhr) {
            alert("Assessment Submission Failed");
            console.log(xhr);
            switch (xhr.status) {
                case 404:
                    console.log("Webpage not found 404");
                    break;
                case 400:
                    console.log("Error, invalid login info 400");
                    break;
                case 400:
                    console.log("Error, invalid uProjectDescriptionate request 401");
                    break;
                default:
                    console.log("Some other kind of error. should never get here");
            }
        }
    });
    
    // Updating local data
    portfolio.AssessmentValue = {
                "Grades": portfolio.AssessmentValue.Grades,
                "Rubric_Response": assessment_response,
                "Rubric_Questions": rubric_questions};
    portfolio.InProgress = false;
    portfolio.TeacherComment = comments;
    portfolio.Status = status;
    portfolio.StatusColor = status_color;
    student.portfolio = portfolio
    
    // Update the user collection
    $.ajax({
        'type': 'POST',
        'url': "https://mydesigncompany.herokuapp.com/users/update",
        'data': JSON.stringify({
            "student": student,
            "portfolio": portfolio
        }),
        'contentType': "application/json;charset=UTF-8",
        'success': function (data) {
            console.log(data);
            if (data) {
                console.log('JQuery POST ProjectDescription request sent!');
            }
        },
        'error': function (xhr) {
            alert("Assessment Submission Failed");
            console.log(xhr);
            switch (xhr.status) {
                case 404:
                    console.log("Webpage not found 404");
                    break;
                case 400:
                    console.log("Error, invalid login info 400");
                    break;
                case 400:
                    console.log("Error, invalid uProjectDescriptionate request 401");
                    break;
                default:
                    console.log("Some other kind of error. should never get here");
            }
        }
    });

    // Update the class and team collection
    $.ajax({
        'type': 'POST',
        'url': "https://mydesigncompany.herokuapp.com/myClass/update/portfolio",
        'data': JSON.stringify({
            "student": student,
            "portfolio": portfolio,
            "classIn": Current_Class
        }),
        'contentType': "application/json;charset=UTF-8",
        'success': function (data) {
            console.log(data);
            if (data) {
                console.log('JQuery POST ProjectDescription request sent!');
            }
        },
        'error': function (xhr) {
            alert("Assessment Submission Failed");
            console.log(xhr);
            switch (xhr.status) {
                case 404:
                    console.log("Webpage not found 404");
                    break;
                case 400:
                    console.log("Error, invalid login info 400");
                    break;
                case 400:
                    console.log("Error, invalid uProjectDescriptionate request 401");
                    break;
                default:
                    console.log("Some other kind of error. should never get here");
            }
        }
    });
    
    rubric_response = []; // Reset Teacher Response.
}

/*
* Precondition: Project object, student object, current class object
* Postcondition: Assigns the student the project and udpates (class, team, user, project)
* A project is created by an author, but can be assigned to other students. 
* A project is associated with a specific class and should hold an array of portfolios related to it
*/
function assignProjectToStudent(project, student, classIn){
    // Update the student in the class (local data)
    var students = classIn.Assignments.StudentAssignments
    for(i = 0; i < students.length; i++){
        if(students[i]._id == student._id){
            students[i].project = project;
            students[i].portfolio.Status = "No Designs"
            students[i].portfolio.StatusColor = "yellow"
        }
    }
    // Update the student in the teams (local data)
    var teams = classIn.Assignments.TeamAssignments
    for(i = 0; i < teams.length; i++){
        students = teams[i].StudentId
        for(j = 0; j < students.length; j++){
            if(students[j]._id == student._id){
                students[j].project = project;
                students[i].portfolio.Status = "No Designs"
                students[i].portfolio.StatusColor = "yellow"
            }
        }
    }

    student.portfolio.Status = "No Designs"
    student.portfolio.StatusColor = "yellow"
    // Add students to the list of students assigned to a project.
    $.ajax({
        'type': 'POST',
        'url': "https://mydesigncompany.herokuapp.com/projects/assign/student",
        'data': JSON.stringify({
                "project": project,
                "student": student
            }),
        'contentType': "application/json;charset=UTF-8",
        'success': function(data){
            console.log(data)
        },
        'error': function(data, xhr){
            console.log(xhr)
            alert("Failed to add Student to Project")
        }
    }) 

    // Add the project to the student object in the class and team.
    $.ajax({
        'type': 'POST',
        'url': "https://mydesigncompany.herokuapp.com/student/add/project",
        'data': JSON.stringify({
                "project": project,
                "student": student
            }),
        'contentType': "application/json;charset=UTF-8",
        'success': function(data){
            console.log(data)
        },
        'error': function(data, xhr){
            console.log(xhr)
            alert("Failed to Assign Project to Student")
        }
    }) 

    // Add the project to the student in the user collection.
    $.ajax({
        'type': 'POST',
        'url': "https://mydesigncompany.herokuapp.com/class/student/add/project",
        'data': JSON.stringify({
                "project": project,
                "student": student,
                "classIn": classIn
            }),
        'contentType': "application/json;charset=UTF-8",
        'success': function(data){
            console.log(data)
        },
        'error': function(data, xhr){
            console.log(xhr)
            alert("Failed to add project to student in class")
        }
    }) 
}

/*
* Precondition:
* Postcondition: Reads all project types from database and stores into Local Storage
*/
function getProjTypes() {//just brings in the students projects
    var xmlHttpPT = new XMLHttpRequest();
    var projTypes = [];
    xmlHttpPT.onreadystatechange = function () {
        if (xmlHttpPT.responseText && xmlHttpPT.status == 200 && xmlHttpPT.readyState == 4) {
            var obj = jQuery.parseJSON(xmlHttpPT.responseText);
            $.each(obj, function () {
                projTypes.push(this['type']);
            });
            localStorage.setItem("projTypes", JSON.stringify(projTypes));
            console.log(localStorage);
        }
    };
    xmlHttpPT.open("GET", "https://mydesigncompany.herokuapp.com/projectTypes", true);
    xmlHttpPT.send(null);
};




