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

function getIcon(link){
    if(link.includes("leetcode")) return "/images/leetcode.svg"
    else if(link.includes("geeksforgeeks")) return "/images/geeksforgeeks.svg"
    else if(link.includes("hackerrank")) return "/images/hackerrank.svg"
    else if(link.includes("codechef")) return "/images/codechef.svg"
    else if(link.includes("topcoder")) return "/images/topcoder.svg"
    else if(link.includes("hackerearth")) return "/images/hackerearth.svg"
    else if(link.includes("codeforces")) return "/images/codeforces.svg"
    else if(link.includes("codingninjas")) return "/images/codingninjas.svg"
    else return "/images/code.svg"
}

export {
    showPassword,
    showError,
    showSuccess,
    showWarning,
    showInfo,
    hidePopup,
    getIcon
}