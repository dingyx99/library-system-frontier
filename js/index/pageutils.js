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
