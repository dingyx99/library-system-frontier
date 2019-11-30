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
    if(loginStatCheck()){
        if($(jQueryId).attr("class") == "ms-Icon ms-Icon--AddFavorite"){
            document.getElementById(realId).className="ms-Icon ms-Icon--FavoriteStarFill";
            generateNotification('info', '<strong>操作成功</strong>', '<p>成功加入收藏！</p>');
        }
        else {
            document.getElementById(realId).className="ms-Icon ms-Icon--AddFavorite";
            generateNotification('info', '<strong>操作成功</strong>', '<p>成功取消收藏！</p>');
        }
    }
    else if(loginStatCheck() == false){
        generateNotification('danger', '<strong>操作失败</strong>', '<p>您未登录账户，无法操作，请先登录或注册后重试。</p>')
    }
    
}

$(document).keypress(function (e) {
    if(e.keyCode == 13) {
        jumpSearch();
    }
})

function generateNotification(type, title, message) {
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
