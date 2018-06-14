var data = {
    // id: null,
    url: null,
    clickCount: 0,
    copyCount: 0,
    startTime: null,
    maxScrollHeight: 0,
    lastScrollHeight: 0
}

var pageActive = false;

function onClickHandler(e) {
    clickCount ++;
}

function activatePage() {
    pageActive = true;
    data.clickCount = 0;
    data.startTime = Date.now();
}

function scrollPositionUpdate(e) {
    var pos = window.scrollY + window.innerHeight/2;
    maxScrollHeight = pos > maxScrollHeight ? pos : maxScrollHeight;
    lastScrollHeight = pos;
}

function pageDeactivateHandler() {
    pageActive = false;
    updateStorage();
}

function copyEventHandler() {
    copyCount ++;
}

function updateStorage() {
    
}

function initLogger() {
    document.addEventListener("click", onClickHandler);
    document.addEventListener("beforeunload", pageDeactivateHandler);
    document.addEventListener("scroll", scrollPositionUpdate);
    document.addEventListener("blur", pageDeactivateHandler)
    document.addEventListener("focus", activatePage);
    document.addEventListener("copy", copyEventListener);
    
    activatePage();
}

data.url = document.location.href;