//////////////////////////////////////////////////////////////////////////////
// Class Management Library
// Author: Jeffrey He
// 
// The class_lib.js is a library that contains all the functions 
// needed to retrieve or store data relating to class management
//////////////////////////////////////////////////////////////////////////////

/* 
* Precondition: Usually called when page is loading
* Postcondition: Reads all class data
*/
function readClassData(){
    var xmlHttpF = new XMLHttpRequest();
    xmlHttpF.onreadystatechange = function () {
        if (xmlHttpF.responseText && xmlHttpF.status == 200 && xmlHttpF.readyState == 4) {
            var obj = jQuery.parseJSON(xmlHttpF.responseText);
            $.each(obj, function () {
                class_array.push(this)    
            });
            console.log(class_array);
        }
    };
    xmlHttpF.open("GET", "https://mydesigncompany.herokuapp.com/myClass", true);
    xmlHttpF.send(null);
}

/*
* Precondition: Student to add to class. Class in which student is being added to
* Postcondition: Student is added to class
*/
function addStudentToClass(student, class_in){
        var id = class_in._id
        var teacher_id = class_in.Assignments.TeacherId

        if(inClass(student, class_in)){
            alert("Person already in class!")
            return;
        }
        student.classID = class_in._id;
        class_in.Assignments.StudentAssignments.push(student)
        var json = JSON.stringify({_id: {$oid: id}, Assignments: class_in.Assignments});
        // Updates the class collection
        $.ajax({
            type: 'POST',
            url: 'https://mydesigncompany.herokuapp.com/myClass/assign',
            data: json,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            'success': function (data) {
                console.log('Data is:');
                console.log(data);
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

        // Updates the user collection
        $.ajax({
            type: 'POST',
            url: 'https://mydesigncompany.herokuapp.com/users/update',
            data: JSON.stringify({student: student}),
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            'success': function (data) {
                console.log('Data is:');
                console.log(data);
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
* Precondition: Student to remove, Class to remove student from
* Postcondition: Student is removed from the class, team and change is made to database
*/ 
function removeStudentfromClass(student, class_in){
    var id = class_in._id
    var index = class_in.Assignments.StudentAssignments.indexOf(student);
    student.classID = ""
    class_in.Assignments.StudentAssignments.splice(index, 1);
    var json = JSON.stringify({_id: {$oid: id}, Assignments: class_in.Assignments});
    
    // Removes the student from the team they are in. 
    var teams = class_in.Assignments.TeamAssignments
    for(i = 0; i < teams.length; i++){
        if(teams[i].TeamId == student.team){
            removeStudentfromTeam(student, class_in, i)
        }
    }

    $.ajax({
        type: 'POST',
        url: 'https://mydesigncompany.herokuapp.com/myClass/assign',
        data: json,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        'success': function (data) {
            console.log('Data is:');
            console.log(data);
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

    // Updates the user collection
    $.ajax({
        type: 'POST',
        url: 'https://mydesigncompany.herokuapp.com/users/update',
        data: JSON.stringify({student: student}),
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        'success': function (data) {
            console.log('Data is:');
            console.log(data);
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
* Precondition: Name of the new team
* Postcondition: Creates a new team in the current class
*/
function addClass(team_name){
    target_class = class_array[session.class].Assignments.TeamAssignments
    var id = class_array[session.class]._id
    var teacher_id = class_array[session.class].Assignments.TeacherId

    var new_class = {StudentId: [], TeamId: team_name}
    target_class.push(new_class)
    var json = JSON.stringify({_id: {$oid: id}, Assignments: class_array[session.class].Assignments});
    $.ajax({
            type: 'POST',
            url: 'https://mydesigncompany.herokuapp.com/myClass/assign',
            data: json,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            'success': function (data) {
                console.log('Data is:');
                console.log(data);
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
    data_param = {class_array: class_array[session.class], student_array: student_array, class_array_full: class_array, team_array: class_array[session.class].Assignments.TeamAssignments[session.team]}
    

    $("#contentPane").html(MyTeams({data: data_param}));
    $('.ui.dropdown').dropdown();
}

/*
* Precondition: Callback function, parameters for the callback, The name of the class
* Postcondition: A class object
*/
function getClassByName(callback, params, class_name){
    var xmlHttpC = new XMLHttpRequest();
    var Current_Class;
    xmlHttpC.onreadystatechange = function () {
        if (xmlHttpC.responseText && xmlHttpC.status == 200 && xmlHttpC.readyState == 4) {
            var obj = jQuery.parseJSON(xmlHttpC.responseText);
            $.each(obj, function () {
                if (this['ClassName'] == class_name){
                    Current_Class =  this
                    callback(params, Current_Class)
                }
            });
        }
        return Current_Class
    };
    xmlHttpC.open("GET", "https://mydesigncompany.herokuapp.com/myClass", true);
    xmlHttpC.send(null);
}

/*
* Precondition: list of students, class object
* Postcondition: If a student is already in the class, they 
*   can't be readded. Used to dynamically manage css tag in class panel. 
*/
function classPanelStudentVisibility(students, class_in){
    var data = [];
    for(i = 0; i < students.length; i++){
        if(inClass(students[i],class_in)){
            data.push("visibilityhidden");
        }else{
            data.push("");
        }
    }
    return data
}

/*
* Precondition: Takes in a studentID
* Postcondition: Returns list of classes that a student is in
*/
function findAllEnrolledClass(callback, params, studentID){
    var xmlHttpC = new XMLHttpRequest();
    var classes = [];
    xmlHttpC.onreadystatechange = function () {
        if (xmlHttpC.responseText && xmlHttpC.status == 200 && xmlHttpC.readyState == 4) {
            var obj = jQuery.parseJSON(xmlHttpC.responseText);
            $.each(obj, function () {
                if(inClass_ID(studentID, this)){
                    classes.push(this); 
                }
            });
            callback(params, classes);
        }
        return classes;
    };
    xmlHttpC.open("GET", "https://mydesigncompany.herokuapp.com/myClass", true);
    xmlHttpC.send(null);
}

/*
* Precondition: Takes in a student object and class object
* Postcondition: Boolean (true if student in class)
*/
function inClass(student, class_in){
    for(j = 0; j < class_in.Assignments.StudentAssignments.length; j++){
        if(class_in.Assignments.StudentAssignments[j]._id == student._id){
            return true
        }
    }
    return false
}

/*
* Precondition: Takes in a student ID and class object
* Postcondition: Boolean (true if student in class)
*/
function inClass_ID(studentID, class_in){
    for(j = 0; j < class_in.Assignments.StudentAssignments.length; j++){
        if(class_in.Assignments.StudentAssignments[j]._id == studentID){
            return true
        }
    }
    return false
}

