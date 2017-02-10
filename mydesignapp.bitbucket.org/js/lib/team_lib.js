//////////////////////////////////////////////////////////////////////////////
// Team Management Library 
// Author: Jeffrey He
//
// The team_lib.js is a library that contains all the functions 
// needed to retrieve or store data relating to team management
// Since team data is encapsulated in the class object at the time 
// of this file's creation, a team management interaction is technically 
// a class management action. However, since this might not be the case
// in the future, this file exists to allow for such circumstances
//////////////////////////////////////////////////////////////////////////////


/*
* Precondition: Student to add to Team, Class the team is in, the index of the team in the class
* Postcondition: Adds student to team and re-render the team panel
*/
function addStudentToTeam(student, classIn, team_index){
    team = classIn.Assignments.TeamAssignments[team_index].StudentId

    if (studentInTeam(student, team) || student.team != "No Team"){
        alert("Student already in a team")
        return
    }
    student.team = classIn.Assignments.TeamAssignments[team_index].TeamId
    var id = classIn._id
    team.push(student)
    var json = JSON.stringify({_id: {$oid: id}, Assignments: classIn.Assignments});
    $.ajax({
        type: 'POST',
        url: 'https://mydesigncompany.herokuapp.com/myClass/assign',
        data: json,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        'success': function (data) {
            if (data) {
                    console.log('JQuery POST request sent!');  
            }
        },
        'error': function (xhr) {
            console.log(xhr);
            switch (xhr.status) {
                case 404:
                    console.log("Webpage not found 404");
                    break;
                case 400:
                    console.log("Error, invalid login info 400");
                    break;
            }
        }
    });  
}

/*
* Precondition: student object, team object
* Postcondition: boolean 
*/
function studentInTeam(student, team){
    for(i = 0; i < team.length; i++){
        if(team[i]._id == student._id){
            return true
        }
    }
    return false
}

//Remove a student from the class that has its session ID active. 
//The student parameter does not appear to be used. index is used to locate the position of the student to remove from the array
/*
* Precondition: Student Object, Class Object, Team the student is in
* Postcondition: Removes the student from a team
*/
function removeStudentfromTeam(student, classIn, team_index){
    var team = classIn.Assignments.TeamAssignments[team_index].StudentId
    var id = classIn._id
    for(i = 0; i < team.length; i++){
        if(team[i]._id == student._id){
            team.splice(i, 1)
            console.log(i)
            student.team = "No Team"
        }
    }
    var json = JSON.stringify({_id: {$oid: id}, Assignments: classIn.Assignments});
    $.ajax({
        type: 'POST',
        url: 'https://mydesigncompany.herokuapp.com/myClass/assign',
        data: json,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        'success': function (data) {
            if (data) {
                console.log('JQuery POST request sent!');  
            }
        },
        'error': function (xhr) {
            console.log(xhr);
            switch (xhr.status) {
                case 404:
                    console.log("Webpage not found 404");
                    break;
                case 400:
                    console.log("Error, invalid login info 400");
                    break;
            }
        }
    });  
}

/*
* Precondition: Class to add team to, Name/ID of the team
* Postcondition: Creates a new team and adds it to the class
*/ 
function newTeam(classIn, teamID){
    var team = {"TeamId": teamID,"StudentId": [] }
    var id = classIn._id
    classIn.Assignments.TeamAssignments.push(team)
    var json = JSON.stringify({_id: {$oid: id}, Assignments: classIn.Assignments});
    $.ajax({
        type: 'POST',
        url: 'https://mydesigncompany.herokuapp.com/myClass/assign',
        data: json,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        'success': function (data) {
            if (data) {
                    console.log('JQuery POST request sent!');  
            }
        },
        'error': function (xhr) {
            console.log(xhr);
            switch (xhr.status) {
                case 404:
                    console.log("Webpage not found 404");
                    break;
                case 400:
                    console.log("Error, invalid login info 400");
                    break;
            }
        }
    });  
}

/*
* Precondition: Team Object, studentID
* Postcondition: Returns Team Object the student is in
*/
function findTeam(Teams, studentID) {
    for(i = 0; i < Teams.length; i++){
        for(j = 0; j < Teams[i].StudentId.length; j++){
            if(Teams[i].StudentId[j]._id == studentID){
                return Teams[i];
            }
        }
    }
}


