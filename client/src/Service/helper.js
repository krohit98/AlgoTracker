function showPassword(e){
    if(e.target.checked)
        document.getElementById(e.target.dataset.inputid).type = "text";
    else
        document.getElementById(e.target.dataset.inputid).type = "password";
}

function showError(text){
    let popup = document.getElementById("ack-popup");
    popup.innerText = text;
    removePopupAlertStyle(popup);
    popup.classList.add("alert-danger");
    showPopup();
}

function showSuccess(text){
    let popup = document.getElementById("ack-popup");
    popup.innerText = text;
    removePopupAlertStyle(popup);
    popup.classList.add("alert-success");
    showPopup();
}

function showWarning(text){
    let popup = document.getElementById("ack-popup");
    popup.innerText = text;
    removePopupAlertStyle(popup);
    popup.classList.add("alert-warning");
    showPopup();
}

function showInfo(text){
    let popup = document.getElementById("ack-popup");
    popup.innerText = text;
    removePopupAlertStyle(popup);
    popup.classList.add("alert-info");
    showPopup();
}

function removePopupAlertStyle(popup){
    popup.classList.remove("alert-danger");
    popup.classList.remove("alert-success");
    popup.classList.remove("alert-warning");
    popup.classList.remove("alert-info");
}

function showPopup(){document.getElementById("popup-wrapper").style.display = "flex";}
function hidePopup(){document.getElementById("popup-wrapper").style.display = "none";}

export {
    showPassword,
    showError,
    showSuccess,
    showWarning,
    showInfo,
    hidePopup
}