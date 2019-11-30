let configURL = 'config/site_config.json';
let request = new XMLHttpRequest;
request.open('GET', configURL);
request.responsetypee = 'text';
request.send();

request.onload = function () {
    let configJson = request.response;
    let config = JSON.parse(configJson);
    applyBrand(config);
    checkLogin();
};

function applyBrand(jsonObj) {
    title = document.title;
    brandname = jsonObj['brandname'];
    document.title = brandname + title;
    document.getElementById("brand_name").innerHTML = brandname;
}

function checkLogin(){
    if(loginStatCheck() == false) {
        alert("你没有登录，请先登录！");
        location.replace("./index.html?action=login");
    }
    else {
        loginModify();
        document.getElementById("my-info-area").style.display="";
        showQr("B6F95F60-AA9A-4768-86EB-A6B916DAC9AD");
    }
}

function showQr(userId) {
    var qrcode = new QRCode(document.getElementById("qrcode-area"), {
        text: userId,
        width: 256,
        height: 256,
        correctLevel: QRCode.CorrectLevel.H
    })
}