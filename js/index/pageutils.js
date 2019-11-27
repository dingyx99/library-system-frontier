function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

function toggleModals() {
    switch (getQueryVariable("action")) {
        case "login":
            $("#LoginPopUp").modal('show');
            break;
        case "register":
            $("#RegisterPopUp").modal('show');
            break;
        default:
            break;
    }
}

function jumpSearch() {
    var options = $("#search_type option:selected").val();
    var keyword = $("#search_keyword").val();
    location.replace("/search.html?type=" + options + "&keyword=" + keyword);
}

function setCookie(name, value, path, domain, secure) {
    var date = new Date();
    date.setTime(date.getTime() + 7200000);
    document.cookie = name + "=" + encodeURI(value) +
        ((date) ? "; expires=" + date : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure=" + secure : "");
}

function loginStatCheck() {
    if(getCookie("LoginEmail") && getCookie("LoginPassword") && getCookie("LoginUsername")){
        return true;
    }
    return false;
}

function getCookie(cName) {
    //LoginEmail, LoginPassword, LoginUsername
    var cookieString = decodeURI(document.cookie);
    var cookieArray = cookieString.split(";");
    for (var i = 0; i < cookieArray.length; i++) {
        var cookieNum = cookieArray[i].split("=");

        var cookieName = $.trim(cookieNum[0]);
        var cookieValue = $.trim(cookieNum[1]);

        if(cookieName == cName){
            return cookieValue;
        }
    }
    return false;
}

function createTestCookie() {
    setCookie("LoginEmail", "test@contoso.com", "/", "127.0.0.1", "");
    setCookie("LoginPassword", "Test123", "/", "127.0.0.1", "");
    setCookie("LoginUsername", "test", "/", "127.0.0.1", "");
}

function loginModify() {
    if(loginStatCheck()){
        var username = getCookie("LoginUsername");
        document.getElementById("nav_login_link").innerHTML = "欢迎您， " + username;
        document.getElementById("nav_login_link").removeAttribute("data-target");
        document.getElementById("nav_login_link").setAttribute("onclick", "alert(\"\Hello, World\"\);");
        document.getElementById("nav_reg_link").innerHTML = "登出";
        document.getElementById("index_login_tip").innerHTML = "您已经登录，点击管理您的账户。";
        document.getElementById("index_login_button").innerHTML = "管理我的账户";
    }
}