////////////////////////////////////////////////////////////////////////////////
//      DATA DEFINITIONS
/////////////////////////////////////////////////////////////////////////////////

// Localstorage data readout
console.log(localStorage);

var project = JSON.parse(localStorage.project);
var selectedClass_i = 0;
var selectedClass = JSON.parse(localStorage.class);
var localStudent = {fname: localStorage.firstName, 
                lname: localStorage.lastName, 
                id: localStorage.userId,
                email: localStorage.email,
                experienceLevel: localStorage.experienceLevel,
                project: project,
                projectName: project.ProjectName,
                CurrentDesignStep: project.CurrentDesignStep };
var All_Students = [];          // Array of all students in the database.
var All_Teachers = [];          // Array of all teachers.
var Current_Class;              // Class roster of the currently selected class


var studentId = localStorage.getItem("userId"); // TODO (JEFF): Deprecate this variable and use localStudent.id instead. 
var comNum;
var cadYN;
var componentText = ["I. Presenting and Justifying a Problem and Solution.",
    "II. Generating and Defending an Original Solution.",
    "III. Constructing and Testing a Prototype.",
    "IV. Evaluation, Reflection, and Recommendations"];
var projTypes = [];
var projType;
var studentName;
var expLevels = ["Elementary", "Middle School", "High School", "Post-Secondary", "Professional"];
var expLevel;
var progBar;
﻿var teacher_response = new Array(7); //Teacher assessment results are stored in this array
var teacher_responseIndex = new Array(7); //Index of the results in the array
var progress; //True: Review of Assessments (i.e.progress);   False: Perfoming an Assessment
var userDataReady;
//Set up and load 3D array with rubric answers: [design steps(12)][rubric questions(7)][rubric answer scores/text(6)]
var ansText = new Array(12);
var ansArraySize = [7, 2, 4, 3, 5, 5, 4, 5, 5, 5, 5, 5];
//0 - Step A; 1 - Step B; etc.

/*
    Student Dashboard Apps. Data structure to hold all the webapps avaliable to the student. 
*/
// TODO: Which apps should be visible?
var showDrawApps = [];
var showProgramApps = [];
var AllStudentApps = {productivity: [
                        {id:"MSWord", url:"https://office.live.com/start/Word.aspx", img:"img/MSWord.fw.png"},
                        {id:"MSExcel", url:"https://office.live.com/start/Excel.aspx", img:"img/MSExcel.fw.png"},
                        {id:"MSPowerpoint", url:"https://office.live.com/start/PowerPoint.aspx", img:"img/MSPowerpoint.fw.png"}
                        ],
                   drawing: [
                        {id:"recap360", url:"http://www.autodesk.com/products/recap/free-trial", img:"img/recap360.png"},
                        {id:"autocad360", url:"https://app.autocad360.com", img:"img/autocad360.png"},
                        {id:"convert", url:"http://image.online-convert.com/convert-to-svg", img:"img/convert.png"},
                        {id:"tinkercad", url:"https://www.tinkercad.com/about/features", img:"img/newtinkercad.png"},
                        {id:"cura", url:"MyDesignLogo.stl", img:"img/cura.png"},
                        {id:"chargen", url:"http://www.autodesk.com/products/character-generator/get-started", img:"img/chargen.png"},
                        {id:"config360", url:"http://www.autodesk.com/products/configurator-360/overview", img:"img/config360.png"},
                        {id:"fusion360", url:"http://www.autodesk.com/products/fusion-360/overview", img:"img/fusion360.png"},
                        {id:"collab360", url:"http://www.autodesk.com/products/a360/overview", img:"img/collab360.png"},
                        {id:"mockup360", url:"http://www.autodesk.com/products/mockup-360/free-trial", img:"img/mockup360.png"}
                        ],
                   programming: [
                        {id:"codeAvengers", url:"https://www.codeavengers.com", img:"img/codeavengers.png"},
                        {id:"codeMaven", url:"http://www.crunchzilla.com/code-maven", img:"img/codemaven.png"},
                        {id:"bfoit", url:"http://www.bfoit.org/itp/itp.html", img:"img/bfoit.png"},
                        {id:"netbeans", url:"https://netbeans.org/", img:"img/netbeans.png"},
                        {id:"gameMaven", url:"http://www.crunchzilla.com/game-maven", img:"img/gamemaven.png"},
                        {id:"dataMaven", url:"http://www.crunchzilla.com/data-maven", img:"img/datamaven.png"},
                        {id:"codeMonster", url:"http://www.crunchzilla.com/code-monster", img:"img/codemonster.png"}
                        ],}



//var FirstNameP = [];//professional roster
//var LastNameP = [];//professional roster
var FirstName = []; //Storing first name for Assessment and Progress; TODO needs to limit students to those in the class
var LastName = []; //Storing last name for Assessment and Progress; TODO needs to limit students to those in the class
var FirstName1 = []; //teacher roster
var LastName1 = []; //teacher roster
var FirstName3 = []; //displayed team roster and Collaborators
var LastName3 = []; //displayed team roster and Collaborators
var ProjName3 = []; //displayed team roster project assignments for Projects and Collaborators
var ClassName3 = []; //displayed team roster class name for Collaborators
var projId3 = []; //displayed team roster project assignemtns id for Projects
var studentId = []; //all students for Assessment and Progress
var studentIdS = []; //all students in the student roster for MyClass and MyTeams
var teacherId = []; //teacher roster for all classes for MyClass and MyTeams
var FirstNameS = []; //all students in the student roster for MyClass and MyTeams
var LastNameS = []; //all students in the student roster for MyClass and MyTeams

var className_studentPortfolio = [];
var projectName_studentPortfolio = [];
var fileName_studentPortfolio = [];
var fileStatus_studentPortfolio = [];
var thisClass; //class name display for Collaborators
var thisTeam; //team name display for Collaborators
var classnum = 0; //used in Collaborators to walk through classes to find teammates
var prjAssigned = false;
var ID = []; //Storing user ID
var h = {}; //Portfolio ID
//We populate the student list using underscore.js
//Given 
var ProjectName = [];
var ProjectId = [];
var FileName = [];
var ProjectStatus = [];
var designComps = [];
var designComp;
var designSteps = [];
var designStep;
var studentComments = [];
var studentComment;
var teachers = [];
var assignments = [];
var teacherID; //teacher for this class roster
var studentID = []; //all students in this class roster
var studentNumC; //class roster table position for student selected for project assignment
var studentIDT = []; //all students in this team roster
var studentNumT; //team roster table position for student selected for project assignment
var teacherVisibility = [];
var studentVisibility = [];
var teacherSignUp = [];
var studentSignUp = [];
var assessments = [];
var assessment = [];
var alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];
var beta = ["I", "II", "III", "IV"];
var File = [];
var fileName = [];
var WpAuthId = [];
var stat = [];
var prjId = [];
var dca = [];
var dsa = [];
var com = [];
var teacha = [];
var assessa = [];
var teachCom = [];
var teacherComments = [];
var dcIndex;
var pn = [];
var paid = [];
var ptype = [];
var pid = [];
var pd = [];
var portfolioIds = [];
var portfolioId;
var portId = [];
var className = [];
var classDescription = [];
var classId = [];
var cIndex;
var tIndex = -1;
var teamId = [];

var thisStudent; //the student currently logged in
var nodeApps = [];
var dsIndex = [];

var buttonClass = [];
var onclickStatus = [];


/////////////////////////////////////////////////////////////////////////////////
//      VIEW CONTROLLER
/////////////////////////////////////////////////////////////////////////////////
function appDisplay(){
    var projType = JSON.parse(localStorage.getItem("project")).ProjectType;
    var projTypes = JSON.parse(localStorage.getItem("projTypes"));
    var projTypeIndex = projTypes.indexOf(projType);
    var expLevel = localStorage.getItem("experienceLevel");
    var expLevelIndex = expLevels.indexOf(expLevel);

    cadYN = 0;
    comNum = JSON.parse(localStorage.getItem("project")).CurrentDesignStep;
    console.log(comNum);
    //(function (global) {
    if (comNum == 1) {
        cadYN = 1;
        comNum = 1;
    }
    if (comNum == 2) {
        cadYN = 2;
        comNum = 2;
    }
    if (comNum == 3) {
        cadYN = 3;
        comNum = 3;
    }
    if (comNum == 4) {
        cadYN = 4;
        comNum = 4;
    }
            
    console.log("projType = " + projType + "; projTypes = " + projTypes);
    console.log("cadYN = " + cadYN + "; projTypeIndex = " + projTypeIndex + "; expLevelIndex = " + expLevelIndex);

            if ((cadYN == 2 || cadYN == 4) && (projTypeIndex < 3 || projTypeIndex == 5 || projTypeIndex == 8 || projTypeIndex == 9) && (expLevelIndex > 1)) {
                showDrawApps.push({id:"autocad360", url:"https://app.autocad360.com", img:"img/autocad360.png"});
            }
            if ((cadYN != 1) && (projTypeIndex < 3 || projTypeIndex == 5 || projTypeIndex == 8 || projTypeIndex == 9) && (expLevelIndex > 2)) {
                showDrawApps.push({id:"config360", url:"http://www.autodesk.com/products/configurator-360/overview", img:"img/config360.png"})
                showDrawApps.push({id:"collab360", url:"http://www.autodesk.com/products/a360/overview", img:"img/collab360.png"});
            }
            if ((cadYN != 1) && (projTypeIndex == 3 || projTypeIndex == 4 || projTypeIndex == 6 || projTypeIndex == 9 || projTypeIndex == 10)) {
                showDrawApps.push({id:"chargen", url:"http://www.autodesk.com/products/character-generator/get-started", img:"img/chargen.png"});
            }
            if ((cadYN != 1) && (projTypeIndex < 3 || projTypeIndex == 5 || projTypeIndex == 8) && (expLevelIndex > 2)) {
                showDrawApps.push({id:"fusion360", url:"http://www.autodesk.com/products/fusion-360/overview", img:"img/fusion360.png"});
                showDrawApps.push({id:"mockup360", url:"http://www.autodesk.com/products/mockup-360/free-trial", img:"img/mockup360.png"});
            }

            if ((cadYN == 2 || cadYN == 4) && (expLevelIndex > 1)) {
                nodeApps[nodeApps.length] = document.getElementById('recap360');
                showDrawApps.push({id:"recap360", url:"http://www.autodesk.com/products/recap/free-trial", img:"img/recap360.png"});
            }
            if ((cadYN != 1)) {
                showDrawApps.push({id:"convert", url:"http://image.online-convert.com/convert-to-svg", img:"img/convert.png"});
                showDrawApps.push({id:"tinkercad", url:"https://www.tinkercad.com/about/features", img:"img/newtinkercad.png"});
                showDrawApps.push({id:"cura", url:"MyDesignLogo.stl", img:"img/cura.png"});                        
            }

            if ((cadYN != 1) && (projTypeIndex == 7 || projTypeIndex == 8) && (expLevelIndex < 3)) {
                showProgramApps.push({id:"codeAvengers", url:"https://www.codeavengers.com", img:"img/codeavengers.png"});                        
            }
            if ((cadYN != 1) && (projTypeIndex == 8) && (expLevelIndex == 0)) {
                showProgramApps.push({id:"codeMonster", url:"http://www.crunchzilla.com/code-monster", img:"img/codemonster.png"});
            }
            if ((cadYN != 1) && (projTypeIndex == 8) && (expLevelIndex != 4)) {
                showProgramApps.push({id:"codeMaven", url:"http://www.crunchzilla.com/code-maven", img:"img/codemaven.png"});
            }
            if ((cadYN != 1) && (projTypeIndex == 8) && (expLevelIndex == 1 || expLevelIndex == 2)) {
                showProgramApps.push({id:"gameMaven", url:"http://www.crunchzilla.com/game-maven", img:"img/gamemaven.png"});
                showProgramApps.push({id:"dataMaven", url:"http://www.crunchzilla.com/data-maven", img:"img/datamaven.png"});
            }
       
            if ((projTypeIndex == 8) && (expLevelIndex > 1)) {
                showProgramApps.push({id:"bfoit", url:"http://www.bfoit.org/itp/itp.html", img:"img/bfoit.png"});
                showProgramApps.push({id:"netbeans", url:"https://netbeans.org/", img:"img/netbeans.png"});
            }
}

function activiate(id) {
    var stepArray = ["step1", "step2", /*"step3", "step4",*/ "step5", "step6", "step7", "step8", /*"step9",*/ "step10", "step11"];
    for (var i = 0; i < stepArray.length; i++) {
        document.getElementById(stepArray[i]).className = " step ";
    }
    document.getElementById(id).className = " active step ";
    switch (id) {

        case "step1":
            $("#contentPane").html(Home({data: localStudent })); //Loads landing page

            if (cIndex) {
                //hide the dropdown and start buttons
                var node = document.getElementById("selectclass");
                node.style.visibility = 'hidden';
                //make visible the selected class
                var node = document.getElementById("displayclass");
                node.style.visibility = 'visible';
                //display the selected class
                document.getElementById("myclass").innerHTML = className[cIndex];
            } else {
                //populate class dropdown list
                addList();
            }
            updateProgBar();
            break;
        case "step2"://selects by age, component, and project type
            $("#contentPane").html(MyApps({data: "Some data here later"}));
            $('.menu .item').tab();
            updateProgBar();
            break;
        /*COMMENT OUT FOR DEMO
        case "step3":
             $("#contentPane").html(MySketches({data: "Some data here later"}));
             updateProgBar();
             break;
             case "step4":
             $("#contentPane").html(MyExamples({data: "Some data here later"}));
             updateProgBar();
             break;
             */
        case "step5":
            $("#contentPane").html(MyResources({data: "Some data here later"}));
            nodeApps = [];
            if (cadYN == 1) {
                nodeApps[nodeApps.length] = document.getElementById('ds1a');
            } else

            if (cadYN == 2) {
                //nodeApps[nodeApps.length] = document.getElementById('ds2a');
                nodeApps[nodeApps.length] = document.getElementById('ds2b');
            } else

            if (cadYN == 3) {
                nodeApps[nodeApps.length] = document.getElementById('ds3a'); 
                 /*
                 (window);
                 innerDiv.style.backgroundColor = 'white';
                 var para = document.createElement("P");
                 var t = document.createTextNode("RECOMMENDED BUILDING SUPPLY RETAILERS ARE SHOWN IN A SEPARATE TAB.");
                 para.appendChild(t);
                 innerDiv.appendChild(para);
                 */

                //Maptiv8 may be mort
                //window.open('http://maptiv8.com/demos/mydesign','_newtab');
            } else

            if (cadYN == 4) {
                nodeApps[nodeApps.length] = document.getElementById('ds4a');
            }

            for (n = 0; n < nodeApps.length; n++) {
                nodeApps[n].style.visibility = 'visible';
            }
            updateProgBar();
            break;
        case "step6":
            var team = findTeam(selectedClass[selectedClass_i].Assignments.TeamAssignments, localStudent.id);
            $("#contentPane").html(Collaborators({data: {team: team, class: selectedClass[selectedClass_i] } }));
            updateProgBar();
            break;
        case "step7":
            project = JSON.parse(localStorage.project);
            $("#contentPane").html(MyMentors({data: mentors_class_team}));
            updateProgBar();
            break;
        case "step8":
              
            student = JSON.parse(localStorage.student);
            project = JSON.parse(localStorage.project);
            portfolios = JSON.parse(localStorage.getItem("portfolios"));

            portfolios_JSON = [];
            for(i = 0; i < portfolios.length; i++){
                portfolio = JSON.parse(portfolios[0])
                portfolios_JSON.push(portfolio)
            }

            console.log(localStorage)
            console.log(portfolios_JSON);


            $("#contentPane").html(MyProgress({data: {project: project, portfolios: [JSON.parse(student.portfolio)]}, student: student }));
            console.log(student)
            console.log(project)
            console.log(JSON.parse(student.portfolio))

            break;
            /*COMMENT OUT FOR DEMO
             case "step9":
             $("#contentPane").html(MyMessageBoard({data: "Some data here later"}));
             updateProgBar();
             break;
             */
        case "step10":
            $("#contentPane").html(MyRubric({data: "Some data here later"}));
            window.open("rubric.html");
            updateProgBar();
            break;
        case "step11":
            $("#contentPane").html(MyPortfolio({data: "Some data here later"}));
            window.open('portfolio.html', '_newtab');
            updateProgBar();
            break;
        default:
            //populate class dropdown list
            addList();
            updateProgBar();
    }
};
//////////////////////////////////////////////////////////////////////////////////////
//    DATA READ FOR CLASSES, PROJECTS, PORTFOLIOS & USERS
//////////////////////////////////////////////////////////////////////////////////////


window.onload = function () {
    console.log(selectedClass);
    mentors_class_team = []
    // Compile a list of all the mentors from the database.
    for(i = 0; i < selectedClass.length; i++){
        var id = selectedClass[i].Assignments.TeacherId
        var team = findTeam(selectedClass[selectedClass_i].Assignments.TeamAssignments, localStudent.id);
        var param = {class: selectedClass[i - 1], team: team};

        findUserByID( id, function(obj, params){
            var x = {mentor: obj, class: params.class, team: param.team}
            mentors_class_team.push(x);
            console.log(mentors_class_team);
        } , param)
    }

    cadYN = 0;
    comNum = JSON.parse(localStorage.getItem("project")).CurrentDesignStep;
    console.log(comNum);
    //(function (global) {
    if (comNum == 1) {
        cadYN = 1;
        comNum = 1;
    }
    if (comNum == 2) {
        cadYN = 2;
        comNum = 2;
    }
    if (comNum == 3) {
        cadYN = 3;
        comNum = 3;
    }
    if (comNum == 4) {
        cadYN = 4;
        comNum = 4;
    }

    switch (comNum) {
        case "1":
            document.getElementById("landingTxt").innerHTML = "<h1>1.Define and research a problem or need.</h1><br/><h2><p style='color:#00CCFF'>Welcome to the start of something new!</p> <p>To begin the design process:<br/><br/> First identify and define a need or problem.<br/><br/> Next, research prior attempts to solve the problem, document the attempts, and analyze them.<br/><br/> Then, proceed to list the design requirements needed to create a product that satisfies the need. Prove that the requirements will lead to creating a working solution.<br/><br/><br/> Use the resources in this step as guidance to complete the steps above! </p></h2>";
            break;
        case "2":
            document.getElementById("landingTxt").innerHTML = "<h1>2.Creating a viable original solution.</h1><br/><h2><p style='color:#00CCFF'>This component consists of building an original solution.</p> <p>First, brainstorm and sketch all possible solutions that satisfy the design requirements. After sketching solutions, assess them and choose the best design.<br/><br/> Second, ensure that the STEM principles are applied to the designs. <br/><br/> Lastly, assess the final decision for functionality and viability. Ask, will it be successful or not?<br/><br/><br/> Use the resources in this component to begin creating original solutions!</p></h2>";
            break;
        case "3":
            document.getElementById("landingTxt").innerHTML = "<h1>3.Constructing and testing a prototype.</h1><br/><h2><p style='color:#00CCFF'>This component consists of constructing the chosen solution.</p> <p>First, create a testable prototype based off of the sketch.<br/><br/> Next, create a plan for testing the ptototype. Include how testing would prove effectiveness of the design.<br/><br/> Last, test the prototype, make necessary changes to the prototype. Then test it again. Repeat this process until the prototype successfully meets the design requirements.<br/><br/><br/> Use the resources in this component to record data and create a viable prototype. </p></h2>";
            break;
        case "4":
            document.getElementById("landingTxt").innerHTML = "<h1>4.Evaluation, reflection, and recommendations.</h1><br/><h2><p style='color:#00CCFF'>This component consists of reflection and evaluation of the design and the process of creating the design.</p> <p>First, get experts to evaluate the prototype and document their evaluations.<br/><br/> Second, self-reflect on the design and the steps it took to create the design, including lessons learned, what worked, and what could be improved.<br/><br/> Third, present recommendations of how the design could be improvedand create a plan for how those improvements could be implemented in the future.<br/><br/><br/> Use the resources in this component to document evaluations, reflections, and recommendations.</p></h2>";
            break;
    }
    project = localStorage.getItem("projectName");
    studentName = localStorage.getItem("userName");
    designComp = componentText[localStorage.getItem("compNum") - 1];
    
    projectDescription = localStorage.getItem("projectDescription");
    thisStudent = localStorage.getItem("userId");

    //initialize class index
    cIndex = 0;
    //initialize progress bar
    progBar = document.getElementById("progBar");

    //must know assignments to access class assessment, project, and portfolio data

    progress = true; //we only allow the student to look at grades; not grade their own

};
//////////////////////////////////////////////////////
//Identifies class for checking progress information//
//////////////////////////////////////////////////////

function startClass() {
    if (localStorage.getItem("classIndex") < 0) {//INDEPENDENT PROJECT
        if (document.getElementById("myclass"))
            document.getElementById("myclass").innerHTML = "an independent project";
        //flag it as an independent project
        cIndex = -1;
    } else {//CLASS PROJECT
        if (document.getElementById("myclass"))
            document.getElementById("myclass").innerHTML = className[localStorage.getItem("classIndex")];
        //choose it as the current class
        cIndex = localStorage.getItem("classIndex");
    }
    updateProgBar();
}

/////////////////////////////////////////////////////////////////////////////////
//     STUDENT PROGRESS BAR
/////////////////////////////////////////////////////////////////////////////////

function updateProgBar() {
    stepCounter = 0;
    stepsCounted = [];
    console.log("designSteps = " + designSteps);
    for (var m in designSteps) {//for the number of work products released
        if (studentId[m] == thisStudent) {
            stepNumber = alpha.indexOf(designSteps[m]);
            console.log(stepNumber);
            if (stepNumber >= 0) {
                if (!stepsCounted[stepNumber]) {
                    stepCounter++;
                    stepsCounted[stepNumber] = true;
                }
            }
        }
    }
    progBar.value = stepCounter * 10;
    console.log("progBar.value = " + progBar.value);
};


//////////////////////////////////////////////
//Collaborators                             //
//////////////////////////////////////////////


/*
* Selects new class for teamout readout. 
*/
function nextClass() { 
    if(selectedClass_i < selectedClass.length - 1){
        selectedClass_i++;
        var team = findTeam(selectedClass[selectedClass_i].Assignments.TeamAssignments, localStudent.id);
        $("#contentPane").html(Collaborators({data: {team: team, class: selectedClass[selectedClass_i] } }));
    } else {
        alert("No More Classes");
    }

    $("#contentPane").html(Collaborators({data: "Some data here later"}));
};
//////////////////////////////////////////////
//MyMentors                                 //
//////////////////////////////////////////////


//////////////////////////////////////////////
//Portfolio data for Assessment and Progress//
//////////////////////////////////////////////



function getScore(assessmnt) {
    var score = 0;
    var cnt = 0;
    for (n = 0; n < assessmnt.length; n++) {
        if (assessmnt[n] || assessmnt[n] == 0) {
            cnt++; //only count the scores for the number of questions in the assessment for this design step
            score = score + (5 - assessmnt[n]); //assessment indexes are the inverse of the scores
        }
    }
    console.log("score = " + score + "; cnt = " + cnt);
    score = score / cnt;
    score = (Math.ceil(score * 10) / 10).toPrecision(2); //allow 1 decimal place precision for details
    console.log("average of " + score + " for assessmnt of " + assessmnt);
    return score;
}



/********************************************* Document Ready *********************************************/

$(document).ready(function () {

    //Underscore.js setup
    document.getElementById("step1").className = " active step ";
    Home = _.template($('#Home').html());
    MyApps = _.template($('#MyApps').html());
    MySketches = _.template($('#MySketches').html());
    MyExamples = _.template($('#MyExamples').html());
    MyResources = _.template($('#MyResources').html());
    Collaborators = _.template($('#Collaborators').html());
    MyMentors = _.template($('#MyMentors').html());
    MyProgress = _.template($('#MyProgress').html());
    MyProgress_Overview_Panel = _.template($('#MyProgress_Overview_Panel').html());
    Progress_Review_Panel = _.template($('#Progress_Review_Panel').html());
    MyMessageBoard = _.template($('#MyMessageBoard').html());
    MyRubric = _.template($('#MyRubric').html());
    MyPortfolio = _.template($('#MyPortfolio').html());


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
        $("#contentPane").html(Home({data: localStudent })); //Loads landing page
        document.getElementById("classname").innerHTML = localStorage.getItem("ClassName");
        document.getElementById("classdescription").innerHTML = localStorage.getItem("ClassDescription");
    }).catch(function(reason){
        console.log("Could not find users or teachers  " + reason)
    });

    appDisplay(); // Determines which apps to display

    /*************************** Navigation Panel Event Listeners ***************************/
    $("body").on('click', '#step2', function (e) {
        //$("#contentPane").html(MyApps({data: "Some data here later"}));
    });

    // Loads the next class of teammates in the collaborators panel
    $("body").on('click', '#next_class', function (e) {
        nextClass();
    });

    // Logout Button
    $("body").on('click', '#logout_button', function (e) {
        window.location.href = 'index.html';
        //localStorage.clear();
    });


/////////////////////////////////////////////////////////////////////////////////
//    STUDENTPROGRESS
/////////////////////////////////////////////////////////////////////////////////



    // Event listener on button that brings up Assessment_Overview_Panel_Review to see results.
    $("body").on('click', '.review_button', function (e) {
        student = JSON.parse(localStorage.getItem('student'));
        portfolio = JSON.parse(student.portfolio);
        data = {
            student_name: student.firstName + " " + student.lastName, 
            project_name: student.project.name,
            file_name: portfolio.WorkProductFileName,
            design_component: getDesignComponent(portfolio.CurrentDesignStep),
            design_step: portfolio.CurrentDesignStep,
            student_comments: portfolio.StudentComments,
            teacher_comments: portfolio.TeacherComment,
            score: getScore(portfolio.AssessmentValue.Grades),
            grades: portfolio.AssessmentValue.Grades,
            rubric: RubricArray[portfolio.CurrentDesignStep - 1],
            projectID: portfolio._id,
            teacherID: portfolio.TeacherId
        }
        $("#contentPane").html(MyProgress_Overview_Panel({data: data})); 

    });

    // Event listener on button that brings up pdf and rubric response review panel. 
    $("body").on('click', '#to_more_review_details', function (e) {
        student = JSON.parse(localStorage.getItem('student'));
        portfolio = JSON.parse(student.portfolio);
        data = {
            student_name: student.firstName + " " + student.lastName, 
            project_name: student.project.name,
            file_name: portfolio.WorkProductFileName,
            design_component: getDesignComponent(portfolio.CurrentDesignStep),
            design_step: portfolio.CurrentDesignStep,
            student_comments: portfolio.StudentComments,
            teacher_comments: portfolio.TeacherComment,
            score: getScore(portfolio.AssessmentValue.Grades),
            grades: portfolio.AssessmentValue.Grades,
            rubric: RubricArray[portfolio.CurrentDesignStep - 1],
            projectID: portfolio._id,
            teacherID: portfolio.TeacherId
        }
        $("#contentPane").html(Progress_Review_Panel({data: data}));
        renderPDF(portfolio.WorkProductByteArray)
    });

    // Event listener on closing the view assessment panel
    $("body").on('click', '.close_assess', function (e) {
        student = JSON.parse(localStorage.student);
        project = JSON.parse(localStorage.project);
        /* Used once multi-portfolio support is incorporated
            portfolios_JSON = [];
            portfolios = JSON.parse(localStorage.getItem("portfolios"));
            for(i = 0; i < portfolios.length; i++){
                portfolio = JSON.parse(portfolios[0])
                portfolios_JSON.push(portfolio)
            }
        */

        $("#contentPane").html(MyProgress({data: {project: project, portfolios: [JSON.parse(student.portfolio)]}, student: student }));
        
    });


    $("body").on('click', '#topopup4', function (e) {
        document.getElementById("studentTarget1").innerHTML = fname + " " + lname;
        document.getElementById("projectNameTarget1").innerHTML = project;
        document.getElementById("DesignCompTarget1").innerHTML = designComp;
        document.getElementById("DesignStepTarget1").innerHTML = designStep;
        for (i = 0; i < assessment.length; i++) { //should always be 7 unless one of the later rubrics exceeds that number
            dsIndex = alpha.indexOf(designStep);
            j = arrayOffset[dsIndex] + i + 1;
            extractAnsText = ansText[dsIndex][i][assessment[i]];
            if (extractAnsText) {
                document.getElementById("Answer" + j).innerHTML = extractAnsText;
                console.log("assessment index = " + dsIndex);
            }
        }
        var node;
        switch (designStep) {
            case "A":
                node = document.getElementById('ElementA');
                console.log("Element A");
                break;
            case "B":
                node = document.getElementById('ElementB');
                console.log("Element B");
                break;
            case "C":
                node = document.getElementById('ElementC');
                console.log("Element C");
                break;
            case "D":
                node = document.getElementById('ElementD');
                console.log("Element D");
                break;
            case "E":
                node = document.getElementById('ElementE');
                console.log("Element E");
                break;
            case "F":
                node = document.getElementById('ElementF');
                console.log("Element F");
                break;
            case "G":
                node = document.getElementById('ElementG');
                console.log("Element G");
                break;
            case "H":
                node = document.getElementById('ElementH');
                console.log("Element H");
                break;
            case "I":
                node = document.getElementById('ElementI');
                console.log("Element I");
                break;
            case "J":
                node = document.getElementById('ElementJ');
                console.log("Element J");
                break;
            case "K":
                node = document.getElementById('ElementK');
                console.log("Element K");
                break;
            default:
                node = document.getElementById('ElementL');
                console.log("Element L");
        }
        node.style.visibility = 'visible';
    });
});
