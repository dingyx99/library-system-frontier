function reset(type) {
    if (type == 1) {
        $("#loginEmail").val("");
        $("#loginPassword").val("");
        document.getElementById("loginButton").className = "btn btn-secondary";
        document.getElementById("loginButton").disabled = true;
        toggleButton("loginButton", 0);
    } //Login Popup
    else if (type == 2) {
        $("#regEmail").val("");
        $("#regUsername").val("");
        $("#phoneNum").val("");
        $("#regPass").val("");
        $("#regPass2").val("");
        document.getElementById("registerAlert").className = "alert alert-primary";
        document.getElementById("registerAlert").innerHTML = "请按照要求填写相关信息，完成注册。";
        toggleButton("regButton", 0);
    } //Register Popup
}

function loginPassValidation() {
    if (Validation("password", $("#loginPassword").val()) && Validation("email", $("#loginEmail").val())) {
        toggleButton("loginButton", 1);
    }
}

function onInputValidate(type) {
    var typeSC = ["邮箱", "用户名", "手机号", "密码", "重复密码"];
    var valGroup = ["email", "username", "telephone", "password", "password2"];
    var idGroup = ["#regEmail", "#regUsername", "#phoneNum", "#regPass", "#regPass2"];
    var iconGroup = ["mail-icon", "username-icon", "phone-icon", "password-icon", "password2-icon"];
    if(type != 4){
        valStatus = Validation(valGroup[type], $(idGroup[type]).val());
    }
    else {
        valStatus = Validation($(idGroup[3]).val(), $(idGroup[4]).val());
    }
    if (valStatus) {
        document.getElementById(iconGroup[type]).className = "input-group-text bg-success text-white"
    } else {
        document.getElementById(iconGroup[type]).className = "input-group-text bg-danger text-white"
    }
    finalVal();
}

function finalVal() {
    if (valAll($("#regUsername").val(), $("#regEmail").val(), $("#phoneNum").val(), $("#regPass").val(), $("#regPass2").val())) {
        document.getElementById("registerAlert").innerHTML = "您已经按要求完成注册信息填写，点击“注册”即可完成注册。";
        document.getElementById("registerAlert").className = "alert alert-success";
        toggleButton("regButton", 1);
    } else {
        document.getElementById("registerAlert").innerHTML = "仍有项目存在问题，请检查，然后继续。";
        document.getElementById("registerAlert").className = "alert alert-danger";
        toggleButton("regButton", 0);
    }
}

function Validation(type, string) {
    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/; //Username
    var ePattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/; //Email
    var pPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/; //Password
    var tPattern = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/; //Telephone

    switch (type) {
        case "username":
            return uPattern.test(string);
            break;
        case "email":
            return ePattern.test(string);
            break;
        case "password":
            return pPattern.test(string);
            break;
        case "telephone":
            return tPattern.test(string);
            break;
        default:
            return type == string;
            break;
    }
}


function valAll(username, email, telephone, password, password2) {
    return Validation("username", username) && Validation("email", email) && Validation("telephone", telephone) && Validation("password", password) && Validation(password, password2);
}

function toggleButton(id, request) {
    if (request == 0) {
        document.getElementById(id).disabled = true;
        document.getElementById(id).className = "btn btn-secondary";
    } //Disable button
    else if (request == 1) {
        document.getElementById(id).disabled = false;
        document.getElementById(id).className = "btn btn-primary";
    } //Enable Button
}