// Empty JS for your own code to be here

//Clean up login form
function resetLogin(){
    $("#loginEmail").val("");
    $("#loginPassword").val("");
    document.getElementById("loginButton").disabled = true;
}

//Clean up register form
function resetRegister(){
    $("#regEmail").val("");
    $("#regPass").val("");
    $("#regPass2").val("");
    document.getElementById("emailValStatus").className = "ms-Icon ms-Icon--MailTentative";
    document.getElementById("valemailbutton").className = "btn btn-info";
    document.getElementById("registerAlert").className="alert alert-primary";
    document.getElementById("registerAlert").innerHTML = "在注册前，我们需要先验证您的邮箱，然后您才能继续。";
    document.getElementById("regPass").disabled = true;
    document.getElementById("regPass2").disabled = true;
    document.getElementById("regUsername").disabled = true;
    document.getElementById("phoneNum").disabled = true;
    document.getElementById("regEmail").disabled = false;
}

function toggleEmailStatus(){
    if(typeof($("#regEmail").attr("disabled"))=="undefined"){
        document.getElementById("regEmail").disabled = true;
//        document.getElementById("valemailbutton").disabled = true;
    }
    else{
        document.getElementById("regEmail").disabled = false;
//        document.getElementById("valemailbutton").disabled = false;
    }    
}

function toggleRegisterButton(){
    if(typeof($("#regButton").attr("disabled"))=="undefined"){
        document.getElementById("regButton").disabled = true;
    }
    else{
        document.getElementById("regButton").disabled = false;
    }
}

function loginPassValidation(){
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/;
    var pattern_mail = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    pass = $("#loginPassword").val();
    email = $("#loginEmail").val();
    if(pattern.test(pass) == true && pattern_mail.test(email) == true) {
        document.getElementById("loginButton").className = "btn btn-primary";
        document.getElementById("loginButton").disabled = false;
    }
}

//Use regexp to validate email
function emailValidation(){
    var pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    email = $("#regEmail").val();
    if(pattern.test(email) == true) {
//        document.getElementById("emailValStatus").className = "ms-Icon ms-Icon--MailCheck";
//        document.getElementById("valemailbutton").className = "btn btn-success";
        document.getElementById("registerAlert").innerHTML = "邮箱验证成功，请继续填写相关信息！";
        document.getElementById("registerAlert").className="alert alert-success";
        toggleEmailStatus();
        document.getElementById("regPass").disabled = false;
        document.getElementById("regPass2").disabled = false;
        document.getElementById("regUsername").disabled = false;
        document.getElementById("phoneNum").disabled = false;
        return true;
    }
    else {
//        document.getElementById("emailValStatus").className = "ms-Icon ms-Icon--MailUndelivered";
//        document.getElementById("valemailbutton").className = "btn btn-danger";
        document.getElementById("registerAlert").innerHTML = "验证失败，请检查您填写的内容，然后继续。";
        document.getElementById("registerAlert").className="alert alert-danger";
        document.getElementById("regPass").disabled = true;
        document.getElementById("regPass2").disabled = true;
        document.getElementById("regUsername").disabled = true;
        document.getElementById("phoneNum").disabled = true;
        return false;
    }
}

function usernameVal(){
    var pattern = /^[a-zA-Z0-9_-]{4,16}$/;
    username = $("#regUsername").val();
    if(pattern.test(username) == false) {
        document.getElementById("registerAlert").innerHTML = "用户名不符合要求，请检查您填写的内容，然后继续。";
        document.getElementById("registerAlert").className="alert alert-danger";
        return false;
    }
    else {
        document.getElementById("registerAlert").innerHTML = "用户名符合要求，请继续填写相关信息！";
        document.getElementById("registerAlert").className="alert alert-success";
        return true;
    }
}

function phoneVal(){
    var pattern = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
    phone = $("#phoneNum").val();
    if(pattern.test(phone) == false) {
        document.getElementById("registerAlert").innerHTML = "手机号填写错误，请检查您填写的内容，然后继续。";
        document.getElementById("registerAlert").className="alert alert-danger";
        return false;
    }
    else {
        document.getElementById("registerAlert").innerHTML = "请继续填写相关信息！";
        document.getElementById("registerAlert").className="alert alert-success";
        return true;
    }
}

function passVal(){
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/
    password = $("#regPass").val();
    if(pattern.test(password) == false) {
        document.getElementById("registerAlert").innerHTML = "密码强度不符合要求，请检查，然后继续。";
        document.getElementById("registerAlert").className="alert alert-danger";

    }
    else {
        document.getElementById("registerAlert").innerHTML = "请继续填写相关信息！";
        document.getElementById("registerAlert").className="alert alert-success";
    }
}

function finalVal(){
    pass1 = $("#regPass").val();
    pass2 = $("#regPass2").val();
    if(pass1 == pass2){
        document.getElementById("registerAlert").innerHTML = "您已经按要求完成注册信息填写，点击“注册”即可完成注册。";
        document.getElementById("registerAlert").className="alert alert-success";
        document.getElementById("regButton").disabled = false;
        document.getElementById("regButton").className = "btn btn-primary";
    }
    else if (pass1 != pass2){
        document.getElementById("registerAlert").innerHTML = "两次输入的密码不相同，请检查，然后继续。";
        document.getElementById("registerAlert").className="alert alert-danger";
    }
}