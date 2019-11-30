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

function jumpToIndex(){
    $("#JumpLoginPopUp").on('shown.bs.modal', function(){
        window.open("./index.html?action=login");
    })
    $('#JumpRegisterPopUp').on('shown.bs.modal', function(){
        window.open("./index.html?action=register");
    })
}

function jumpSearch() {
    var options = $("#search_type option:selected").val();
    var keyword = $("#search_keyword").val();
    location.replace("./search.html?type="+options+"&keyword="+keyword);
}

function generateUniversalNotification(type, title, message) {
    $.notify({
        title: title,
        message: message
        },{
        type: type,
        delay: 3000,
    }, {
        animate: {
            enter: 'animated bounceInDown',
            exit: 'animated bounceOutUp'
        }
    });
}
