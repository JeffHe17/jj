/////////////////////////////////////////////////////////////////////////////////
//      DATA DEFINITIONS
/////////////////////////////////////////////////////////////////////////////////

/* Data to be pre-loaded */
var All_Students = [];          // Array of all students in the database.
var All_Teachers = [];          // Array of all teachers.
var All_Classes = [];           // Array of all classes.
var All_Teams = [];             // Array of all teams.
var ClassRoster = [];           // Array of all students in the class.
var Student_Projects = [];      // Array of (Student - Project) tuples in the class.
var Author_Projects = [];       // Array of all projects by the teacher.
var Current_Class               // Class to be used when page is loaded.
var Current_Team_Index = 0      // The currently selected team.
/* User input from runtime */
var rubric_response = []        // Array of teacher response's on a particular review.
var gradedStudents = []         // Array of students with a graded portfolio.

var teacher = {firstName: localStorage.getItem("firstName"), 
               lastName: localStorage.getItem("lastName"), 
               teacherID: localStorage.getItem("userId")}

// Used to hold state of student and project for assingment. 
var assignStudentProject = {student: "", project: ""} 

//////////////////////////////////////////////////////////////////////////////
//arrays pulled from myClass collection///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
var classId = [];

/////////////////////////////////////////////////////////////////////////////////
//      VIEW CONTROLLER
/////////////////////////////////////////////////////////////////////////////////

function activiate(id) {
    var stepArray = ["nav_Home", "nav_Class", "nav_Team", "nav_Review_Results", "nav_Review", "nav_Projects", "nav_rubric"];
    for (var i = 0; i < stepArray.length; i++) {
        document.getElementById(stepArray[i]).className = " step ";
    }
    document.getElementById(id).className = " active step ";
    switch (id) {
        case "nav_Home":
            $("#contentPane").html(Home({data: "Some data here later"}));
            document.getElementById("classname").innerHTML = localStorage.getItem("ClassName");
            document.getElementById("classdescription").innerHTML = localStorage.getItem("ClassDescription");
            break;
        case "nav_Class":
            var data = classPanelStudentVisibility(All_Students, Current_Class);
            $("#contentPane").html(MyClass({data: data}));
            break;
        case "nav_Team":
            $('.ui.dropdown').dropdown();
            $("#contentPane").html(MyTeams({data: "Some data here later"}));
            break;
        case "nav_Review_Results":
            // Determines which portfolios have been graded
            gradedStudents = [];
            for(i = 0; i < Current_Class.Assignments.StudentAssignments.length; i++){
                if(Current_Class.Assignments.StudentAssignments[i].portfolio.Status == "Graded"){
                    gradedStudents.push(Current_Class.Assignments.StudentAssignments[i])
                }
            }
            $("#contentPane").html(StudentProgress({data: gradedStudents}));
            break;
        case "nav_Review":
            $("#contentPane").html(Assessment({data: "Some data here later"}));
            break;
        case "nav_Projects":
            $('.ui.dropdown').dropdown(); 
            $("#contentPane").html(Projects({data: "Some data here later"}));
            break;
        case "nav_rubric":
            $("#contentPane").html(Rubrics({data: "Some data here later"}));
            window.open("rubric.html");
            break;
        default:
            $("#contentPane").html(Home({data: "Some data here later"}));
    }
}

//////////////////////////////////////////////////////////////////////////////////////
//    DATA READ FOR CLASSES, PROJECTS, PORTFOLIOS & USERS
//////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//ACTIVITY:  Home & Onload Functions.  All collections pulled onload
////////////////////////////////////////////////////////////////////////////////
function getQueryParams() {//allows parameters with dashboardteacher.html call to remember what activity was active prior to restart of the page
    var query = window.location.href.split('?')[1];
    //query won't be set if ? isn't in the URL
    if (!query) {
        return {};
    }
    var params = query.split('&');
    var pairs = {};
    for (var i = 0, len = params.length; i < len; i++) {
        var pair = params[i].split('=');
        pairs[pair[0]] = pair[1];
    }
    return pairs;
}

///////////////////////////////////
//Portfolio assessment score data//
///////////////////////////////////
function getScore(assessment) {//averages the scores on each question for this design step review
    var score = 0;
    var count = 0;
    for (n = 0; n < assessment.length; n++) {
        if (assessment[n] || assessment[n] == 0) {
            count++;//only count the scores for the number of questions in the assessment for this design step
            score = score + (5 - assessment[n]);//assessment indexes are the inverse of the scores
        }
    }
    if (count == 0) {
        return "No Score";
    }
    score = score / count;
    score = (Math.ceil(score * 10) / 10).toPrecision(2);//allow 1 decimal place precision for details
    return score;
}


/********************************************* Document Ready *********************************************/

$(document).ready(function () {

    //Underscore.js setup
    document.getElementById("nav_Home").className = " active step ";
    MyClass = _.template($('#MyClass').html());
    Home = _.template($('#Home').html());
    MyTeams = _.template($('#MyTeams').html());
    StudentProgress = _.template($('#StudentProgress').html());
    TeamProgress = _.template($('#TeamProgress').html());
    Assessment = _.template($('#Assessment').html());
    Projects = _.template($('#Projects').html());
    Rubrics = _.template($('#Rubrics').html());
    Assessment_Overview_Panel = _.template($('#Assessment_Overview_Panel').html());
    Assessment_Page_Panel = _.template($('#Assessment_Page_Panel').html());
    Final_Review_Panel = _.template($('#Final_Review_Panel').html());
    Assessment_Overview_Panel_Review = _.template($('#Assessment_Overview_Panel_Review').html());
    Assessment_Review_Panel = _.template($('#Assessment_Review_Panel').html());

    $('.ui.dropdown').dropdown();

    console.log(localStorage)

    /*
    * Gets all teachers from the database
    */
    var promise_all_teachers = new Promise(
        function(resolve, reject){
            getAllTeachers(function(params, teachers){resolve(teachers)}, "")
        }
    )
    /*
    * Gets all students from the database
    */ 
    var promise_all_students = new Promise(
        function(resolve, reject){
            getAllStudents(function(params, students){resolve(students)}, "")
        }
    )
    /*
    * Gets all projects that is managed by this teacher
    */
    var promise_author_projects = new Promise(
        function(resolve, reject){
            //TODO: Resolve assignments[classIndex].TeacherId and with localStorage.getItem("userId") with the session.user.id 
            getProjectsByAuthor(function(params, projects){ resolve(projects)}, "", localStorage.getItem("userId"))
        }
    )
    /*
    * Gets all portfolios from the database
    */
    var promise_all_portfolios = new Promise(
        function(resolve, reject){
            getAllPortfolios(function(params, portfolios){resolve(portfolios)}, "")
        }
    )

    /*
    * Gets default class object
    */
    var promise_Current_Class = new Promise(
        function(resolve, reject){
            getClassByName(function(params, Current_Class){ resolve(Current_Class)}, "", localStorage.getItem("ClassName"))
        }
    )

    /*
    * Continue rendering the DOM once data loaded and promises complete
    */
    Promises = [promise_all_teachers, promise_all_students, promise_author_projects, promise_all_portfolios, promise_Current_Class]
    Promise.all(Promises).then(function(vals){
        console.log(vals)
        All_Teachers = vals[0]
        All_Students = vals[1]
        Author_Projects = vals[2]
        Student_Projects = vals[3]
        Current_Class = vals[4]

        //Current_Team = Current_Class.Assignments.TeamAssignments[0]
        //console.log(Current_Team)
        $("#contentPane").html(Home({data: "Some data here later"})); //Loads landing page
        document.getElementById("classname").innerHTML = localStorage.getItem("ClassName");
        document.getElementById("classdescription").innerHTML = localStorage.getItem("ClassDescription");
    }).catch(function(reason){
        console.log("Could not find users or teachers  " + reason)
    });

    // Event listener on closing the assessment panel
    $("body").on('click', '.close_review', function (e) {
        $("#contentPane").html(Assessment({data: "Some data here later"})); // Return to the assessment panel
    });

    // Event listener on closing the view assessment panel
    $("body").on('click', '.close_assess', function (e) {
        gradedStudents = [];
        for(i = 0; i < Current_Class.Assignments.StudentAssignments.length; i++){
            if(Current_Class.Assignments.StudentAssignments[i].portfolio.Status == "Graded"){
                gradedStudents.push(Current_Class.Assignments.StudentAssignments[i])
            }
        }
        $("#contentPane").html(StudentProgress({data: gradedStudents})); // Return to the assessment panel
    });

    // Event listener on closing the project assignment panel
    $("body").on('click', '.close_project', function (e) {
        $("#contentPane").html(Projects({data: "Some data here later"})); // Return to the assessment panel
        $("#projects_panel").addClass("visibilityhidden");
    });

    ////////////////////////////////////////////////////////////////////////////
    //       MYCLASS
    ////////////////////////////////////////////////////////////////////////////

    // Adds the selected student from All_Students to Current_Class.
    $("body").on('click', '.addToClass_button', function (e) {
        var idx = e.currentTarget.name;
        document.getElementById("s" + idx).style.visibility = 'hidden';
        var student = All_Students[idx]
        addStudentToClass(student, Current_Class); 
        var data = classPanelStudentVisibility(All_Students, Current_Class);
        $("#contentPane").html(MyClass({data: data}));
        $('.ui.dropdown').dropdown();
    });

    // Event listener to remove student from a class in the class management panel.
    // Affects both team and project assignment. 
    $("body").on('click', '.removeFromClass_button', function (e) {
        var idx = e.currentTarget.name;
        var student = Current_Class.Assignments.StudentAssignments[idx]
        removeStudentfromClass(student, Current_Class) 
        var data = classPanelStudentVisibility(All_Students, Current_Class);
        $("#contentPane").html(MyClass({data: data}));
        $('.ui.dropdown').dropdown();
    });

    ////////////////////////////////////////////////////////////////////////////
    //      MYTEAMS
    ////////////////////////////////////////////////////////////////////////////

    // Add student in the class to the team.
    $("body").on('click', '.classRosterSelect_button', function (e) {
        student = Current_Class.Assignments.StudentAssignments[this.name]     
        addStudentToTeam(student, Current_Class, Current_Team_Index)
        $("#contentPane").html(MyTeams({data: "data here later"}));
        $('.ui.dropdown').dropdown();
    });

    // Removes a student from the currently selected team. 
    $("body").on('click', '.remove_button_team', function (e) {
        student = Current_Class.Assignments.TeamAssignments[Current_Team_Index].StudentId[this.name]
        console.log(student)
        // Remove student from database data
        removeStudentfromTeam(student, Current_Class, Current_Team_Index)

        // Remove student from local data
        var team = Current_Class.Assignments.TeamAssignments[Current_Team_Index].StudentId
        var id = Current_Class._id
        for(i = 0; i < team.length; i++){
            if(team[i]._id == student._id){
                team.splice(i, 1)
                console.log(i)
                student.team = "No Team"
            }
        }
        $("#contentPane").html(MyTeams({data: "data later here"}));
        $('.ui.dropdown').dropdown();
    });

    // Event listener for selecting a new team in the team panel.
    $("body").on('change', 'select[name="teampicker"]', function (e) {
        Current_Team_Index = $(this).val();
        $("#contentPane").html(MyTeams({data: "Some data here later"}));
        $('.ui.dropdown').dropdown();
    });    

    // Event listener for creating a new name. 
    $("body").on('click', '#new_team_button', function (e) {
        newTeam(Current_Class, $('#new_team_name').val())
        $("#contentPane").html(MyTeams({data: "Some data here later"}));
        $('.ui.dropdown').dropdown();
    });
    


/////////////////////////////////////////////////////////////////////////////////
//    ASSESSMENT / Design Review Event Listeners
/////////////////////////////////////////////////////////////////////////////////

    // Opens up the Assessment_Overview_Panel to start portfolio assessment.
    $("body").on('click', '.assess_button', function (e) {
        index = e.target.name
        student = Current_Class.Assignments.StudentAssignments[index]
        portfolio = Current_Class.Assignments.StudentAssignments[index].portfolio
        console.log(portfolio)
        data = {
            student_name: student.firstName + " " + student.lastName, 
            project_name: student.project.name,
            file_name: portfolio.FileName,
            design_component: getDesignComponent(portfolio.CurrentDesignStep),
            design_step: portfolio.CurrentDesignStep,
            student_comments: portfolio.StudentComments,
            teacher_comments: portfolio.TeacherComment,
            score: getScore(portfolio.AssessmentValue.Grades),
            index: index,
            rubric: RubricArray[portfolio.CurrentDesignStep - 1],
            projectID: portfolio._id,
            teacherID: portfolio.TeacherId
        }
        $("#contentPane").html(Assessment_Overview_Panel({data: data}));
    });

    // Event listener on button that opens up the assessment panel and renders the pdf to start the portfolio assessment.
    $("body").on('click', '#toAssessment_Page_Panel', function (e) { 
        index = e.target.name
        student = Current_Class.Assignments.StudentAssignments[index]
        portfolio = Current_Class.Assignments.StudentAssignments[index].portfolio
        data = {
            student_name: student.firstName + " " + student.lastName, 
            project_name: student.project.name,
            design_component: getDesignComponent(portfolio.CurrentDesignStep),
            design_step: portfolio.CurrentDesignStep,
            index: index,
            rubric: RubricArray[portfolio.CurrentDesignStep - 1],
            projectID: portfolio._id,
            teacherID: portfolio.TeacherId, 
            teacher_comments: portfolio.TeacherComment
        }
        $("#contentPane").html(Assessment_Page_Panel({data: data}));
        renderPDF(portfolio.File)
        $('.ui.radio.checkbox').checkbox();
    });
    
    // Event listener on button to save the rubric's responses and bring up the teacher comments panel. 
    $("body").on('click', '#toFinal_Review', function (e) {
        index = e.target.name
        console.log(index)
        student = Current_Class.Assignments.StudentAssignments[index]
        portfolio = Current_Class.Assignments.StudentAssignments[index].portfolio

        score_array = [];
        // Collects the teacher's responses to the rubric questions
        for (i = 0; i < data.rubric.rubric.length; i++) {
            if(document.querySelector('input[name= answer'+i+']:checked') == null){
                alert("Please Finish Reviewing")
                return
            }
            rubric_response.push(data.rubric.rubric[i].answer[document.querySelector('input[name= answer'+i+']:checked').value])
            score_array.push(document.querySelector('input[name= answer'+i+']:checked').value)
        }

        portfolio.AssessmentValue.Grades = score_array;
        // Data to send to the final review panel
        data = {
            student_name: student.firstName + " " + student.lastName, 
            project_name: student.project.name,
            file_name: portfolio.FileName,
            design_component: getDesignComponent(portfolio.CurrentDesignStep),
            design_step: portfolio.CurrentDesignStep,
            student_comments: portfolio.StudentComments,
            teacher_comments: portfolio.TeacherComment,
            score: getScore(portfolio.AssessmentValue.Grades), 
            index: index,
            rubric: RubricArray[portfolio.CurrentDesignStep - 1],
            projectID: portfolio._id,
            teacherID: portfolio.TeacherId
        }

        $("#contentPane").html(Final_Review_Panel({data: data}));
    });

    // Event listener on button to save teacher's comments and submit the entire assessment on the portfolio. 
    $("body").on('click', '#submit_Teacher_Comments', function (e) {
        index = e.target.name
        student = Current_Class.Assignments.StudentAssignments[index]
        portfolio = Current_Class.Assignments.StudentAssignments[index].portfolio
        comments = $('#teacher_comments_assessment').val()

        portfolio.TeacherComment = comments;
        portfolio.Status = "Graded";
        portfolio.StatusColor = "blue";

        console.log(RubricArray[portfolio.CurrentDesignStep - 1])
        // TODO: Consider adding more metadata like the student being reviewed
        submitTeacherComments(student, portfolio, rubric_response, RubricArray[portfolio.CurrentDesignStep - 1], comments, portfolio.Status, portfolio.StatusColor)
        $("#contentPane").html(Assessment({data: "Some data here later"}));
    });


/////////////////////////////////////////////////////////////////////////////////
//    STUDENTPROGRESS (Design Review Panels)
/////////////////////////////////////////////////////////////////////////////////

    // Event listener on button that brings up pdf and rubric response review panel. 
    $("body").on('click', '#to_more_review_details', function (e) {
        index = e.target.name
        student = gradedStudents[index]
        portfolio = gradedStudents[index].portfolio
        console.log(portfolio)
        data = {
            student_name: student.firstName + " " + student.lastName, 
            project_name: student.project.name,
            file_name: portfolio.FileName,
            design_component: getDesignComponent(portfolio.CurrentDesignStep),
            design_step: portfolio.CurrentDesignStep,
            student_comments: portfolio.StudentComments,
            teacher_comments: portfolio.TeacherComment,
            score: getScore(portfolio.AssessmentValue.Grades),
            grades: portfolio.AssessmentValue.Grades,
            index: index,
            rubric: RubricArray[portfolio.CurrentDesignStep - 1],
            projectID: portfolio._id,
            teacherID: portfolio.TeacherId
        }
        $("#contentPane").html(Assessment_Review_Panel({data: data}));
        renderPDF(portfolio.File)
    });

    // Event listener on button that brings up Assessment_Overview_Panel_Review to see results.
    $("body").on('click', '.review_button', function (e) {
        index = e.target.name
        student = gradedStudents[index]
        portfolio = gradedStudents[index].portfolio
        console.log(portfolio)
        data = {
            student_name: student.firstName + " " + student.lastName, 
            project_name: student.project.name,
            file_name: portfolio.FileName,
            design_component: getDesignComponent(portfolio.CurrentDesignStep),
            design_step: portfolio.CurrentDesignStep,
            student_comments: portfolio.StudentComments,
            teacher_comments: portfolio.TeacherComment,
            score: getScore(portfolio.AssessmentValue.Grades),
            grades: portfolio.AssessmentValue.Grades,
            index: index,
            rubric: RubricArray[portfolio.CurrentDesignStep - 1],
            projectID: portfolio._id,
            teacherID: portfolio.TeacherId
        }
        $("#contentPane").html(Assessment_Overview_Panel_Review({data: data}));
    });

////////////////////////////////////////////////////////////////////////////////
//             PROJECTS
////////////////////////////////////////////////////////////////////////////////

    // Event listener for the team picker on the project panel. 
    $("body").on('change', 'select[name="teampicker_project"]', function (e) {
        Current_Team_Index = $(this).val();
        $("#contentPane").html(Projects({data: "Some data here later"}));
        $('.ui.dropdown').dropdown();
    });

    // Select student to assign a project from the class roster/table. 
    $("body").on('click', '.assignProjectFromClass', function(e){
        var student = Current_Class.Assignments.StudentAssignments[e.target.name] 
        assignStudentProject.student = student
        $("#projects_panel").removeClass("visibilityhidden")
        $("#projects_student_name").html(student.firstName + " " + student.lastName)
    });

    // Select student to assign a project from the team roster/table.  
    $("body").on('click', '.assignProjectFromTeam', function(e){
        var student = Current_Class.Assignments.TeamAssignments[Current_Team_Index].StudentId[e.target.name] 
        assignStudentProject.student = student
        $("#projects_panel").removeClass("visibilityhidden")
        $("#projects_student_name").html(student.firstName + " " + student.lastName)
    });

    // Assign a project after selecting it from the table.
    $("body").on('click', '.addStudentToProject', function(e){
        var index = e.target.name
        var project = Author_Projects[index]
        assignStudentProject.project = project
        console.log(assignStudentProject)
        // Update local data.
        assignStudentProject.student.project = project
        // Update database.
        assignProjectToStudent(project, assignStudentProject.student, Current_Class);
        $("#projects_panel").addClass("visibilityhidden")
        $("#contentPane").html(Projects({data: "Some data here later"}));
    });
});

// End Document on ready. 





