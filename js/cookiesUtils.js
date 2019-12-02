//Remember to delete before release
function setCookie(name, value, path, domain, secure) {
    var date = new Date();
    date.setTime(date.getTime() + 7200000);
    document.cookie = name + "=" + encodeURI(value) +
        ((date) ? "; expires=" + date : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure=" + secure : "");
}

function clearCookie(cname) {
    var d = new Date();
    d.setTime(d.getTime() - 24*60*60*1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + "" + ";" + expires;
}

function loginStatCheck() {
    if(getCookie("LoginEmail") && getCookie("LoginPassword") && getCookie("LoginUsername")){
        return true;
    }
    return false;
}

function getCookie(cName) {
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

function logout(){
	var req = getXMLHttpRequest();
	req.open("GET", "../LogoutAction");
	req.send(null);
//    clearCookie("LoginEmail");
//    clearCookie("LoginPassword");
//    clearCookie("LoginUsername");
    generateNotification('info', '<strong>操作成功</strong>', '<p>您已成功登出，等待重新加载...</p>', reloadInterval());
}

//Remember to delete before release
function createTestCookie() {
    setCookie("LoginEmail", "test@contoso.com", "/", "127.0.0.1", "");
    setCookie("LoginPassword", "Test123", "/", "127.0.0.1", "");
    setCookie("LoginUsername", "test", "/", "127.0.0.1", "");
    location.reload();
}

function loginModify() {
    if(loginStatCheck()){
        var username = getCookie("LoginUsername");
        document.getElementById("nav_login_link").innerHTML = "欢迎您， " + username;
        document.getElementById("nav_login_link").removeAttribute("data-target");
        document.getElementById("nav_login_link").setAttribute("onclick", "window.location.href='./my.html';");
        document.getElementById("nav_reg_link").innerHTML = "登出";
        document.getElementById("nav_reg_link").removeAttribute("data-target");
        document.getElementById("nav_reg_link").setAttribute("onclick", "logout();");
    }
}

function generateNotification(type, title, message, closedFunc) {
    $.notify({
        title: title,
        message: message
        },{
        type: type,
        onClosed: closedFunc,
        delay: 3000
    }, {
        animate: {
            enter: 'animated bounceInDown',
            exit: 'animated bounceOutUp'
        }
    });
}

function reloadInterval() {
    self.setInterval(function(){
        location.reload();
    },3000)
}