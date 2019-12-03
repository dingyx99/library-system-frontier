function loadData() {
    try {
        loadGreetingData();
    } catch (error) {
        var errorString = "<p>加载问候信息时出现错误，以下为可能有用的信息：</p><p>" + error + "</p>";
        generateUniversalNotification("danger", "<strong>出现错误</strong>", errorString);
    }

    try {
        loadUserDetails();
    } catch (error) {
        var errorString = "<p>加载用户详细信息时出现错误，以下为可能有用的信息：</p><p>" + error + "</p>";
        generateUniversalNotification("danger", "<strong>出现错误</strong>", errorString);
    }

    try {
        loadBorrowData();
    } catch (error) {
        var errorString = "<p>加载用户借阅信息时出现错误，以下为可能有用的信息：</p><p>" + error + "</p>";
        generateUniversalNotification("danger", "<strong>出现错误</strong>", errorString);
    }

    try {
        loadFavData();
    } catch (error) {
        var errorString = "<p>加载用户收藏信息时出现错误，以下为可能有用的信息：</p><p>" + error + "</p>";
        generateUniversalNotification("danger", "<strong>出现错误</strong>", errorString);
    }

}


function loadGreetingData() {
    var email = getCookie("LoginEmail");
    $(function () {
        $.ajax({
            url: '../GetMessageAction?email=' + email,
            type: 'GET',
            data: {
                method: 'query'
            },
            dataType: 'json',
            success: function (data) {
                var obj = eval(data);
                document.getElementById("greetings-user-name").innerHTML = obj.userName;
                document.getElementById("info-rent-book-num").innerHTML = obj.borrowsNum;
                document.getElementById("info-reach-time-num").innerHTML = obj.dLNum;
                document.getElementById("fav-book-num").innerHTML = obj.favNum;
                document.getElementById("overdue-number").innerHTML = obj.oNum;
                console.log("Successfully parsed user info.")
            },
            error: function (xhr) {
                throw err = new Error("Error with LOAD GREET: " + xhr.status + " " + xhr.statusText);
            }
        })
    })
}

function loadUserDetails() {
    var email = getCookie("LoginEmail");
    $(function () {
        $.ajax({
            url: '../GetMemMesAction?email=' + email,
            type: 'GET',
            data: {
                method: 'query'
            },
            dataType: 'json',
            success: function (data) {
                var obj = eval(data);
                var role = "b1f707d4-bff4-4670-a0e4-21ddc812bf69"
                if (obj.role != 20) {
                    role = "924a86a5-58b2-4158-b487-a567040f8df8"
                }
                $("#myUsername").val(obj.username);
                $("#myReaderId").val(obj.id);
                $("#myEmail").val(obj.email);
                $("#myBorrowSum").val(obj.role);
                if (role == "b1f707d4-bff4-4670-a0e4-21ddc812bf69") {
                    $("#myRole").val("普通读者");
                } else if (role == "924a86a5-58b2-4158-b487-a567040f8df8") {
                    $("#myRole").val("管理员");
                    document.getElementById("adminManage").style.display = ""
                    writeAdmin(true);
                }
                console.log("Successfully parsed user details.");
                var str = "{username:'" + obj.username + "',userid:'" + obj.id + ",userrole:'" + role + "'}"
                var base = new Base64();
                userIdBundle = base.encode(str);
                showQr(userIdBundle);
                console.log("Successfully generated user Qr info.")
            },
            error: function (xhr) {
                throw err = new Error("Error with USER INFO: " + xhr.status + " " + xhr.statusText);
            }
        })
    })
}

var ifAdmin
function writeAdmin(value) {
    ifAdmin = value;
}

function loadBorrowData() {
    var email = getCookie("LoginEmail");
    $(function () {
        $.ajax({
            url: '../GetBorrowMesAction?userId=' + email,
            type: 'GET',
            data: {
                method: 'query'
            },
            dataType: 'json',
            success: function (data) {
                var status = ['<td class="text-success">正常借阅</td>', '<td class="text-warning>即将到期</td>', '<td class="text-danger">已经超期</td>', '<td class="text-info">已经归还</td>'];
                var obj = eval(data);
                var tbody = $('<tbody></tbody>');
                $(obj).each(function (index) {
                    var newIndex = index + 1;
                    var val = obj[index];
                    var tr = $('<tr></tr>');

                    tr.append('<td>' + newIndex + '</td>'); //Index
                    tr.append('<td>' + val.bookId + '</td>'); //BookID(name)
                    tr.append(status[0]); //Book Status
                    tr.append('<td>' + val.outTime.slice(0, 10) + '</td>'); //Out time
                    if (val.backTime == "") {
                        tr.append('<td>暂未归还</td>');
                    } else {
                        tr.append('<td>' + val.backTime.slice(0, 10) + '</td>'); //Back time
                    }
                    tbody.append(tr);
                });
                $('#borrow-records-form tbody').replaceWith(tbody);
                console.log("Successfully parsed borrow data form.");
            },
            error: function (xhr) {
                throw err = new Error("Error with LOAD BORROW: " + xhr.status + " " + xhr.statusText);
            }
        })
    })
}

function loadFavData() {
    var email = getCookie("LoginEmail");
    $(function () {
        $.ajax({
            url: '../GetFavoriteMesAction?userId=' + email,
            type: 'GET',
            data: {
                method: 'query'
            },
            dataType: 'json',
            success: function (data) {
                var obj = eval(data);
                var tbody = $('<tbody></tbody>');
                $(obj).each(function (index) {
                    var newIndex = index + 1;
                    var val = obj[index];
                    var tr = $('<tr></tr>');

                    tr.append('<td>' + newIndex + '</td>'); //Index
                    tr.append('<td>' + val.bookIsbn + '</td>'); //BookISBN(name)
                    tr.append('<td>' + val.favDate.slice(0, 10) + '</td>'); //FavTime
                    tr.append('<td><i class="ms-Icon ms-Icon--Unfavorite" aria-hidden="true" id="unfavIcon' + index + '" onclick="unFav(' + val.bookIsbn + ');"><i></td>'); //Unfav item
                    tbody.append(tr);
                });
                $('#fav-records-form tbody').replaceWith(tbody);
                console.log("Successfully parsed fav data form.");
            },
            error: function (xhr) {
                throw err = new Error("Error with LOAD FAV: " + xhr.status + " " + xhr.statusText);
            }
        })
    })

}

function unFav(bookIsbn) {
    var email = getCookie("LoginEmail");
    try {
        FavoriteActions("delete", email, bookIsbn);
        generateNotification('info', '<strong>操作成功</strong>', '<p>成功取消收藏！</p>', reloadInterval());
    } catch (error) {
        var errorString = "<p>操作失败，以下提示可能有助于修复错误：</p>" + error + "</p>";
        generateUniversalNotification("danger", "<strong>取消收藏操作失败</strong>", errorString)
    }
}

function bookProcess(type) {
    if (!ifAdmin) {
        generateUniversalNotification("danger", "<strong>权限不足</strong>", "<p>您的用户权限不足以执行本操作。</p>");
    } else {
        if (type == "out") {
            try {
                outReaderId = document.getElementById("outReaderId").val();
                outBookId = document.getElementById("outBookId").val();
                if (outReaderId == "" || outBookId == "") {
                    generateUniversalNotification("danger", "<strong>出借失败</strong>", "<p>信息填写不完整，请检查后重试。</p>");
                } else {
                    $(function () {
                        $.ajax({
                            url: '../SysManagerAction?type=out&userId=' + outReaderId + 'bookIsbn=' + outBookId,
                            type: 'GET',
                            data: {
                                method: 'query'
                            },
                            success: function () {
                                generateUniversalNotification("success", "<strong>出借成功</strong>");
                            },
                            error: function (xhr) {
                                throw err = new Error("Error with OUT: " + xhr.status + " " + xhr.statusText);
                            }
                        })
                    })
                }
            } catch (error) {
                var errorString = "<p>操作出现错误，请检查填写的信息是否正确。以下提示可能有助于修复错误：</p><p>" + error + "</p>";
                generateUniversalNotification("danger", "<strong>出借失败</strong>", errorString)
            }
        } else if (type == "in") {
            try {
                inReaderId = document.getElementById("inReaderId").val();
                inBookId = document.getElementById("inBookId").val();
                if (inReaderId == "" || inBookId == "") {
                    generateUniversalNotification("danger", "<strong>归还失败</strong>", "<p>信息填写不完整，请检查后重试。</p>");
                } else {
                    $(function () {
                        $.ajax({
                            url: '../SysManagerAction?type=back&userId=' + outReaderId + 'bookIsbn=' + outBookId,
                            type: 'GET',
                            data: {
                                method: 'query'
                            },
                            success: function () {
                                generateUniversalNotification("success", "<strong>归还成功</strong>");
                            },
                            error: function (xhr) {
                                throw err = new Error("Error with IN: " + xhr.status + " " + xhr.statusText);
                            }
                        })
                    })
                }

            } catch (error) {
                var errorString = "<p>操作出现错误，请检查填写的信息是否正确。以下提示可能有助于修复错误：</p><p>" + error + "</p>";
                generateUniversalNotification("danger", "<strong>归还失败</strong>", errorString)
            }
        } else {
            generateUniversalNotification("danger", "<strong>参数错误</strong>", "<p>图书处理操作参数传递错误，如遇此问题，请反馈给开发者。</p>");
        }
    }
}












function Base64() {

    // private property  
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding  
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding  
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding  
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding  
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}