//Portfolio.js

//On Page load figure out which component the thing is coming from


//If the selector has a value then we react


//Upload
var userid = localStorage.getItem('userId');
var pid = localStorage.getItem('pid'); //Project ID
var step = localStorage.getItem('designstep');
var firstname = localStorage.getItem('firstname');
var lastname = localStorage.getItem('lastname');
var teacher = localStorage.getItem('instructor');
var projectitle = localStorage.getItem('projectitle');
var grade = localStorage.getItem('grade');
var pInstitution = localStorage.getItem('pInstitution');
var pCourse = localStorage.getItem('CourseTitle'); 
var pType = localStorage.getItem('projecttype');
var pTeam = localStorage.getItem('pTeam');
var File = null;
var filename = "MISSING FILE";
var teachercomments = "";
var datafile = [];

var reader = new FileReader();

//If a design component step is selected
function buttonToggle() {

    destination = "component_1_rubric.html";
    switch (step) {
        case 1:
            destination = "component_1_rubric.html";
            break;
        case 2:
            destination = "component_2_rubric.html";
            break;
        case 3:
            destination = "component_3_rubric.html";
            break;
        case 4:
            destination = "component_4_rubric.html";
            break;
    }

    window.location.href = destination;
}

function fileupload() {
    $('#datafile').click();
    var j = document.getElementById('datafile');
}

function showFileSize() {
    var input, File;
    if (!window.FileReader) {
        bodyAppend("p", "The file API isn't supported on this browser yet.");
        return;
    }

    input = document.getElementById('datafile');
    if (!input) {
        bodyAppend("p", "Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
        bodyAppend("p", "This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
        bodyAppend("p", "Please select a file before clicking 'Load'");
    }
    else {
        File = input.files[0];
        bodyAppend("p", "File " + File.name + " is " + File.size + " bytes in size");
    }

    alert(File.size);
}

$(document).ready(function () {

    $('#datafile').bind('change', function () {
        size = this.files[0].size;
        if (size < 1000) {
            document.getElementById("filesize").innerHTML = "File Size: " + Math.round(size) + " Bytes";
        } else if (1000000 > size && size > 1000) {
            document.getElementById("filesize").innerHTML = "File Size: " + Math.round(size / 1000) + " KB";
        } else if (1000000000 > size && size > 1000000) {
            document.getElementById("filesize").innerHTML = "File Size: " + Math.round(size / 1000000) + " MB";
        } else if (size && size > 1000000000) {
            document.getElementById("filesize").innerHTML = "File Size: " + Math.round(size / 1000000000) + " GB";
        }

        if (size > 2000000 || this.files[0].type != "application/pdf") {
            $('#form').toggleClass("error");
        } else if (size < 2000000 && this.files[0].type == "application/pdf") {
            $('#form').removeClass("error");
        }
        
        File = this.files[0];
        filename = File.name;
        
        reader.readAsDataURL(File);
        reader.onload = function(e){
            datafile = e.target.result;
        }
    });

    $('.comp').bind('click', function (e) {
        $('.comp').removeClass("teal");
        $(this).addClass("teal");
        step = $(this).attr('name');
    });

    $('.comp').mouseover(function () {
        document.getElementById("description").innerHTML = $(this).attr("data-content");
    });

    $('.comp').mouseout(function () {
        document.getElementById("description").innerHTML = " ";
    });

    //Submitting Portfolio
    $("#submitbutton").bind('click', function (e) {
        //initialize this work product assessments and store 
        var StudentComments = $('#comments').val();
        if(filename == "MISSING FILE" || StudentComments == "" || step == null){
            $('#form').addClass("warning");
            $('#form').removeClass("success");
            return;
        }
        $('#form').addClass("success");
        $('#form').removeClass("error");
        $('#form').removeClass("warning");
        $('#success_msg').fadeOut(5000);

        var comments = $('#comments').val();
        console.log("submit in progress....");
        console.log(filename);
        console.log(File);
        
        portfolio = JSON.stringify({
            "AuthorId": userid,
            "ProjectName": projectitle,
            "ProjId": pid,
            "CurrentDesignStep": step,
            "StudentComments": StudentComments,
            "WorkProductFileName": filename,
            "WorkProductByteArray": datafile,
            "TeacherId": null,
            "TeacherComment": null,
            "AssessmentValue": {Grades: [], Rubric_Response: [], Rubric_Questions: {}},
            "InProgress": "true",
            "Status": "Not Graded",
            "StatusColor": "green",
            "AssessmentValue": {
                "Grades": [],
                "Rubric_Response": [],
                "Rubric_Questions": {}
            },
        });
        student = JSON.parse(localStorage.student)
        console.log(student)
        console.log(JSON.parse(portfolio))
        //uploadPortfolio(portfolio, pCourse, userid, student)
        uploadFileAWS(portfolio, pCourse, userid)
    });
});
