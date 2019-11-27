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
        window.open("/index.html?action=login");
    })
    $('#JumpRegisterPopUp').on('shown.bs.modal', function(){
        window.open("/index.html?action=register");
    })
}

function jumpSearch() {
    var options = $("#search_type option:selected").val();
    var keyword = $("#search_keyword").val();
    location.replace("/search.html?type="+options+"&keyword="+keyword);
    showTestSearchResults(); //For test
    //showSearchResults(); //Release, currently off
}

function ifBlank() {
    if(getQueryVariable("keyword") == "") {
        return true;
    }
    return false;
}

function getSearchKeyword() {
    if(!ifBlank()) {
        return decodeURIComponent(getQueryVariable("keyword"));
    }
    return null;
}

function toggleFav(id) {
    let realId = "favIcon" + id
    let jQueryId = "#" + realId
    if($(jQueryId).attr("class") == "ms-Icon ms-Icon--AddFavorite"){
        document.getElementById(realId).className="ms-Icon ms-Icon--FavoriteStarFill"
            $('.top-right').notify({
                message: { text: 'Aw yeah, It works!' }
            }).show();
    }
    else {
        document.getElementById(realId).className="ms-Icon ms-Icon--AddFavorite"
    }
}

$(document).keypress(function (e) {
    if(e.keyCode == 13) {
        jumpSearch();
    }
})