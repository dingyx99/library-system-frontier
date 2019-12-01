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

function jumpToIndex() {
    $("#JumpLoginPopUp").on('shown.bs.modal', function () {
        window.open("./index.html?action=login");
    })
    $('#JumpRegisterPopUp').on('shown.bs.modal', function () {
        window.open("./index.html?action=register");
    })
}

function jumpSearch() {
    var options = $("#search_type option:selected").val();
    var keyword = $("#search_keyword").val();
    location.replace("./search.html?type=" + options + "&keyword=" + keyword);
}

function generateUniversalNotification(type, title, message) {
    $.notify({
        title: title,
        message: message
    }, {
        type: type,
        delay: 3000,
    }, {
        animate: {
            enter: 'animated bounceInDown',
            exit: 'animated bounceOutUp'
        }
    });
}

function showGreetings() {
    now = new Date();
    hour = now.getHours();
    if (hour < 3) {
        document.getElementById("greetings").innerHTML = "夜深了";
    }
    else if (hour < 6) {
        document.getElementById("greetings").innerHTML = "凌晨好";
    }
    else if (hour < 9) {
        document.getElementById("greetings").innerHTML = "早上好";
    }
    else if (hour < 11) {
        document.getElementById("greetings").innerHTML = "上午好";
    }
    else if (hour < 13) {
        document.getElementById("greetings").innerHTML = "中午好";
    }
    else if (hour < 17) {
        document.getElementById("greetings").innerHTML = "下午好";
    }
    else if (hour < 19) {
        document.getElementById("greetings").innerHTML = "傍晚好";
    }
    else if (hour < 22) {
        document.getElementById("greetings").innerHTML = "晚上好";
    }
    else {
        document.getElementById("greetings").innerHTML = "夜深了"
    }
}