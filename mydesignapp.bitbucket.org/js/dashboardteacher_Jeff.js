
var teacher_response = {}; //Teacher assesment results are stored in this array

//View Controller
activiate = function (id) {
        var stepArray = ["step1", "step2", "step3", "step4", "step5", "step6", "step7", "step8", "step9"];
        for (var i = 0; i < stepArray.length; i++) {
            document.getElementById(stepArray[i]).className = " step ";
        }
        document.getElementById(id).className = " active step ";
        
        switch(id){
        	case "step1":
        		$("#contentPane").html(Home({data: "Some data here later"}));
        		break;
        	case "step2":
        		$("#contentPane").html(MyClass({data: "Some data here later"}));
        		break;
        	case "step3":
        		$("#contentPane").html(MyTeams({data: "Some data here later"}));
        		break;
        	case "step4":
        		$("#contentPane").html(StudentProgress({data: "Some data here later"}));
        		break;
        	case "step5":
        		$("#contentPane").html(TeamProgress({data: "Some data here later"}));
        		break;
        	case "step6":
        		$("#contentPane").html(StudentDash({data: "Some data here later"}));
        		break;
        	case "step7":
        		$("#contentPane").html(MyMessageBoard({data: "Some data here later"}));
        		break;
        	case "step8":
        		$("#contentPane").html(Projects({data: "Some data here later"}));
        		break;
        	case "step9":
        		$("#contentPane").html(Rubrics({data: "Some data here later"}));
        		break;
        	default:
        		$("#contentPane").html(Home({data: "Some data here later"}));
        }
}

//Searches for the grades of all the students
window.onload = function() {
  searchGrade("grade");
};


$(document).ready(function(){ 
    //Underscore.js setup
	document.getElementById("step1").className = " active step ";
	MyClass = _.template($('#MyClass').html());
	Home = _.template($('#Home').html());
	MyTeams = _.template($('#MyTeams').html());
	StudentProgress = _.template($('#StudentProgress').html());
	TeamProgress = _.template($('#TeamProgress').html());
	StudentDash = _.template($('#StudentDash').html());
	MyMessageBoard = _.template($('#MyMessageBoard').html());
	Projects = _.template($('#Projects').html());
	Rubrics = _.template($('#Rubrics').html());

	$("#contentPane").html(Home({data: "Some data here later"})); //Loads landing page

    //Detects which assessment button was clicked
    $("body").on('click', '.assess_button', function(e) {
        pullUserData();
        id = e.currentTarget.id;
        neg = (id.length-1)*-1;
        num = id.slice(neg);
        
        fname =  document.getElementById("fname"+num).innerHTML;
        lname =  document.getElementById("lname"+num).innerHTML;
        console.log(e.currentTarget.id);
        document.getElementById("studentTarget").innerHTML = fname + " " + lname;
    });

    //Pulls file from database when second panel is triggered
    $("body").on('click', '#topopup2', function(e) {
        pullFile();
    });


    /*Code segment used for toggling the buttons when the teacher makes a selection in the assesment panel*/
    /*Design Element A*/
    $("body").on('click', '.b1', function(e) {
        $('.b1').removeClass("teal");
        $(this).addClass("teal");
        document.getElementById("ans1").innerHTML = this.innerText;
        teacher_response[1] = this.innerText;
        console.log(teacher_response);
    });
    $("body").on('click', '.b2', function(e) {
        $('.b2').removeClass("teal");
        $(this).addClass("teal");
        document.getElementById("ans2").innerHTML = this.innerText;
        teacher_response[2] = this.innerText;
        console.log(teacher_response);
    });
    $("body").on('click', '.b3', function(e) {
        $('.b3').removeClass("teal");
        $(this).addClass("teal");
        document.getElementById("ans3").innerHTML = this.innerText;
        teacher_response[3] = this.innerText
        console.log(teacher_response);
    });
    $("body").on('click', '.b4', function(e) {
        $('.b4').removeClass("teal");
        $(this).addClass("teal");
        document.getElementById("ans4").innerHTML = this.innerText;
        teacher_response[4] = this.innerText
        console.log(teacher_response);
    });
    $("body").on('click', '.b5', function(e) {
        $('.b5').removeClass("teal");
        $(this).addClass("teal");
        document.getElementById("ans5").innerHTML = this.innerText;
        teacher_response[5] = this.innerText
        console.log(teacher_response);
    });
    $("body").on('click', '.b6', function(e) {
        $('.b6').removeClass("teal");
        $(this).addClass("teal");
        document.getElementById("ans6").innerHTML = this.innerText;
        teacher_response[6] = this.innerText
        console.log(teacher_response);
    });
    $("body").on('click', '.b7', function(e) {
        $('.b7').removeClass("teal");
        $(this).addClass("teal");
        document.getElementById("ans7").innerHTML = this.innerText;
        teacher_response[7] = this.innerText
        console.log(teacher_response);
    });



});

    var FirstName = []; //Storing first name
    var LastName = []; //Storing last name
    var ID = []; //Storing user ID
    var h = {}; //Portfolio ID

    //We populate the student list using underscore.js
    function pullUserData(){
        var xmlHttp = null;
        xmlHttp  = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.responseText && xmlHttp.status == 200 && xmlHttp.readyState == 4) {
                var obj = jQuery.parseJSON( xmlHttp.responseText );
                $.each(obj, function() {
                    FirstName[FirstName.length] = this['firstName'];
                    LastName[LastName.length] = this['lastName'];
                    if(h[this['_id']] != null){
                        ID[ID.length] = h[this['_id']];
                    }else{
                        ID[ID.length] = "Not Found";
                    }
                    
                });
            }
        };
        xmlHttp.open("GET", "https://mydesigncompany.herokuapp.com/users", true);
        //xmlHttp.open("GET", "https://infinite-stream-2919.herokuapp.com/users", true);
        xmlHttp.send(null);
    };

  
    //Given a student ID, look for their grade and populate the table
    function searchGrade(id_in){
        var xmlHttp = null;
        xmlHttp  = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.responseText && xmlHttp.status == 200 && xmlHttp.readyState == 4) {
                var obj = jQuery.parseJSON( xmlHttp.responseText );                
                $.each(obj, function() {
                    h[this['AuthorId']] = this['Grade'];
                });
                pullUserData();
                console.log("Data Ready");
            }
        };
        xmlHttp.open("GET", "https://mydesigncompany.herokuapp.com/projects", true);
        //xmlHttp.open("GET", "https://infinite-stream-2919.herokuapp.com/projects", true);
        xmlHttp.send(null);

    };


//Storage for file names and files
var File = [];
var FileName = [];

//Reads out the file from the database
function pullFile(){
    var i = 1;
        var xmlHttp = null;
        xmlHttp  = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.responseText && xmlHttp.status == 200 && xmlHttp.readyState == 4) {
                var obj = jQuery.parseJSON( xmlHttp.responseText );
                $.each(obj, function() {
                    FileName[FileName.length] = this['FileName'];
                    File[File.length] = this['File'];          
                });
                console.log(FileName);
                console.log(File);
                showfile();
            }
        };
        xmlHttp.open("GET", "https://mydesigncompany.herokuapp.com/portfolio", true);
        //xmlHttp.open("GET", "https://infinite-stream-2919.herokuapp.com/portfolio", true);
        xmlHttp.send(null);
};

//Displays the file to display in the teacher assesment
function showfile(){
    ele = document.getElementById("fileout");
    ele.src = File[8]; 
    ele.data = File[8];
    console.log("showing file: " + ele.data);
}

//Assessment is submitted back into the portfolio
function submitAssessment(){
    teacher_response[0] = "b"; //Set to the rubric step/design step
    console.log(teacher_response);
    location.href='#';

    //Ajax post to update with teacher's feedback
    $.ajax({
        'type': 'PUT',
        'url': 'https://mydesigncompany.herokuapp.com/portfolio/',
        //'url': 'https://infinite-stream-2919.herokuapp.com/portfolio/',
        'data': JSON.stringify({"TeacherComments": teacher_response}),
        'contentType': "application/json;charset=UTF-8",
        'success': function (data) {
            console.log("good");
            console.log('Data is:');
            console.log(data);
            if (data) {
                console.log('JQuery PUT request sent!');
            }
        },
        'error': function (xhr) {
            alert("fail");
            console.log(xhr);
            switch (xhr.status) {
                case 404:
                console.log("Webpage not found 404");
                case 400:
                {
                    console.log("Error, invalid login info 400");
                }
            }
        }
    });

    //Unselect all the options
    for(var i = 1; i < 8; i++){
        id = "ans"+i;
        clas = ".b"+i;
        $(clas).removeClass("teal");
        console.log(id + " " + clas);
        document.getElementById(id).innerHTML = "_________________________________"
    }

    //Reset Teacher Response
    teacher_response = {};
}
