let configURL = 'config/site_config.json';
let request = new XMLHttpRequest;
request.open('GET', configURL);
request.responsetypee = 'text';
request.send();

request.onload = function() {
    let configJson = request.response;
    let config = JSON.parse(configJson);
    applyBrand(config);
    toggleModals();
};

function applyBrand(jsonObj){
    title = document.title;
    brandname = jsonObj['brandname'];
    document.title = brandname + title;
    document.getElementById("brand_name").innerHTML = brandname;
    document.getElementById("brand_name_header").innerHTML = brandname;
}