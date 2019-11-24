let configURL = 'config/site_config.json';
let request = new XMLHttpRequest;
request.open('GET', configURL);
request.responsetypee = 'text';
request.send();

request.onload = function () {
    let configJson = request.response;
    let config = JSON.parse(configJson);
    applyBrand(config);
    jumpToIndex();
    showDetailsPage();
};

function applyBrand(jsonObj) {
    title = document.title;
    brandname = jsonObj['brandname'];
    document.title = brandname + title;
    document.getElementById("brand_name").innerHTML = brandname;
}

function showDetailsPage() {
    if(!ifBlank()) {
        document.getElementById("search-results-area").style.display="";
        document.getElementById("keyword-display").innerHTML=getSearchKeyword();
        $("#search_keyword").val(getSearchKeyword());
    }
}