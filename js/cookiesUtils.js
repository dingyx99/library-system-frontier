function loginStatCheck() {
    if (getCookie("LoginEmail") && getCookie("LoginPassword") && getCookie("LoginUsername")) {
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

        if (cookieName == cName) {
            return cookieValue;
        }
    }
    return false;
}

function getUserInfo(name) {
    var email = getCookie("LoginEmail");
    $(function () {
        $.ajax({
            url: '../GetMemMesAction?email=' + email,
            type: 'GET',
            data: {
                method: 'query'
            },
            dataType: 'json',
            success: function (data) {
                var obj = eval(data);
                var role = "b1f707d4-bff4-4670-a0e4-21ddc812bf69"
                if (obj.role != 20) {
                    role = "924a86a5-58b2-4158-b487-a567040f8df8"
                }
                RWUserid("Write", obj.id);
                RWUserRole("Write", role);
            },
            error: function (xhr) {
                throw err = new Error("Error with USER INFO: " + xhr.status + " " + xhr.statusText);
            }
        })
    })
    if (name == "id") {
        RWUserid("Read", "");
    } else if (name == "role") {
        RWUserRole("Read", "")
    }
    return null;
}

function RWUserid(type, value) {
    var Userid;
    if(type == "Write") {
        Userid = value;
    }
    else if(type == "Read") {
        return Userid;
    }
}

function RWUserRole(type, value) {
    var userRole;
    if(type == "Write") {
        userRole = value;
    }
    else if(type == "Read") {
        return userRole;
    }
}

function logout() {
    var req = getXMLHttpRequest();
    req.open("GET", "../LogoutAction");
    req.send(null);
    generateNotification('info', '<strong>操作成功</strong>', '<p>您已成功登出，等待重新加载...</p>', reloadInterval());
}

function loginModify() {
    if (loginStatCheck()) {
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
    }, {
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
    self.setInterval(function () {
        location.reload();
    }, 3000)
}