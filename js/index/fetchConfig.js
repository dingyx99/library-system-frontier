let configURL = 'config/site_config.json';
let request = new XMLHttpRequest;
var globalBrandName = ""
request.open('GET', configURL);
request.responsetype = 'text';
request.send();

request.onload = function () {
    let configJson = request.response;
    let config = JSON.parse(configJson);
    applyBrand(config);
    toggleModals();
    indexLoginModify();
    hitokoto("hitokoto-content", "hitokoto-from");
};

function applyBrand(jsonObj) {
    title = document.title;
    brandname = jsonObj['brandname'];
    
    document.title = brandname + title;
    document.getElementById("brand_name").innerHTML = brandname;
    document.getElementById("brand_name_jumbotron").innerHTML = brandname;
}

function indexLoginModify() {
    if(loginStatCheck()){
        loginModify();
        document.getElementById("index_login_tip").innerHTML = "您已经登录，点击管理您的账户。";
        document.getElementById("index_login_button").innerHTML = "管理我的账户";
        document.getElementById("index_login_button").removeAttribute("data-target");
        document.getElementById("index_login_button").setAttribute("onclick", "openMy();")
    }
}

function openMy() {
    window.open("./my.html")
}