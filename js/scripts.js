// Empty JS for your own code to be here

//Clean up login form
function resetLogin(){
    $("#loginEmail").val("");
    $("#loginPassword").val("");
}

//Clean up register form
function resetRegister(){
    $("#regEmail").val("");
    $("#regPass").val("");
    $("#regPass2").val("");
    document.getElementById("emailValStatus").className = "ms-Icon ms-Icon--MailTentative";
    document.getElementById("valemailbutton").className = "btn btn-info";
    document.getElementById("registerAlert").className="alert alert-primary";
    document.getElementById("registerAlert").innerHTML = "Please validate your email before continue.";
    document.getElementById("regPass").setAttribute("disabled", "");
    document.getElementById("regPass2").setAttribute("disabled", "");
    document.getElementById("regUsername").setAttribute("disabled", "");
    document.getElementById("phoneNum").setAttribute("disabled", "");
}

//Use regexp to validate email
function emailValidation(){
    var pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    email = $("#regEmail").val();
    if(pattern.test(email) == true) {
        document.getElementById("emailValStatus").className = "ms-Icon ms-Icon--MailCheck";
        document.getElementById("valemailbutton").className = "btn btn-success";
        document.getElementById("registerAlert").innerHTML = "Validation Successfully, please continue. "
        document.getElementById("registerAlert").className="alert alert-success"
        document.getElementById("regPass").removeAttribute("disabled");
        document.getElementById("regPass2").removeAttribute("disabled");
        document.getElementById("regUsername").removeAttribute("disabled");
        document.getElementById("phoneNum").removeAttribute("disabled", "");
    }
    else {
        document.getElementById("emailValStatus").className = "ms-Icon ms-Icon--MailUndelivered";
        document.getElementById("valemailbutton").className = "btn btn-danger";
        document.getElementById("registerAlert").innerHTML = "You didn't pass validation, please try again!"
        document.getElementById("registerAlert").className="alert alert-danger"
        document.getElementById("regPass").setAttribute("disabled", "");
        document.getElementById("regPass2").setAttribute("disabled", "");
        document.getElementById("regUsername").setAttribute("disabled", "");
        document.getElementById("phoneNum").setAttribute("disabled", "");
    }
}
