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
    if (keyword == "") {
        generateUniversalNotification("danger", "<strong>请输入需要搜索的内容</strong>", "<p>请输入需要搜索的内容，然后再进行搜索。</p>")
    } else {
        location.replace("./search.html?type=" + options + "&keyword=" + keyword);
    }
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

function hitokoto(contentId, fromId) {
    $(function () {
        $.ajax({
            url: 'https://v1.hitokoto.cn/?c=d',
            type: 'GET',
            data: {
                method: 'query'
            },
            dataType: 'json',
            success: function (data) {
                var obj = eval(data);
                var content = obj.hitokoto;
                var from = obj.from;
                document.getElementById(contentId).innerHTML = content;
                document.getElementById(fromId).innerHTML = from;
            },
            error: function (xhr) {
                var errorString = "<p>加载一句推荐时出现错误，以下为可能有用的信息：</p><p>" + xhr.status + " " + xhr.statusText + "</p><p>注意，本功能需要连接互联网才能使用，请确保您已经连接至互联网。</p>";
                generateUniversalNotification("danger", "<strong>出现错误</strong>", errorString);
            }
        })
    })
}

function showGreetings() {
    now = new Date();
    hour = now.getHours();
    if (hour < 3) {
        document.getElementById("greetings").innerHTML = "夜深了";
    } else if (hour < 6) {
        document.getElementById("greetings").innerHTML = "凌晨好";
    } else if (hour < 9) {
        document.getElementById("greetings").innerHTML = "早上好";
    } else if (hour < 11) {
        document.getElementById("greetings").innerHTML = "上午好";
    } else if (hour < 13) {
        document.getElementById("greetings").innerHTML = "中午好";
    } else if (hour < 17) {
        document.getElementById("greetings").innerHTML = "下午好";
    } else if (hour < 19) {
        document.getElementById("greetings").innerHTML = "傍晚好";
    } else if (hour < 22) {
        document.getElementById("greetings").innerHTML = "晚上好";
    } else {
        document.getElementById("greetings").innerHTML = "夜深了"
    }
}

function FavoriteActions(type, email, bookIsbn) {
    $(function () {
        $.ajax({
            url: '../FavoriteAction?type=' + type + '&userId=' + email + '&bookIsbn=' + bookIsbn,
            type: 'GET',
            data: {
                method: 'query'
            },
            success: function () {

            },
            error: function (xhr) {
                throw err = new Error(xhr.status + " " + xhr.statusText);
            }
        })
    })
}
