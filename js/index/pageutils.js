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
    location.replace("/search.html?type="+options+"?keyword="+keyword);
}