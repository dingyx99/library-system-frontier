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

function showSearchResults() {
    var StatusInfo = ['<td class="text-danger">不再提供本书</td>','<td class="text-info">可供借阅</td>','<td class="text-warning">已经出借</td>','<td class="text-danger">本书不提供外借</td>'];
    $(function(){
        $.ajax({
            url: '/SearchAction',
            type: 'GET',
            data: {
                method: 'query'
            },
            dataType: 'json',
            success: function(data){
                var obj = eval(data);
                var tbody= $('<tbody></tbody>');
                $(obj).each(function(index){
                    var val = obj[index];
                    var tr = $('<tr></tr>');
                    tr.append('<td>' + index + '</td>' + '<td>' + val.name + '</td>' + '<td>' + val.author + '</td>' + '<td>' + val.isbn + '</td>' + '<td>' + val.clc + '/' + val.gcbh + '</td>' + '<td>' + StatusInfo[convertStatus(val.status, val.inlib)] + '</td>' + '<td><i class="ms-Icon ms-Icon--AddFavorite" aria-hidden="true" id="favIcon' + index + '" onclick="toggleFav(' + index + ');"></i>');
                    tbody.append(tr);
                });
                $('#search-results-form tbody').replaceWith(tbody);
            }
        });
    });
}

function convertStatus(status, inlib){
    if(status == false && inlib == false) {
        return 0;
    }
    else if(status == true && inlib == false) {
        return 1;
    }
    else if(status == true && inlib == true) {
        return 2;
    }
    else if(status == false && inlib == true) {
        return 4;
    }
    return 0;
}