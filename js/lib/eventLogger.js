var EventLogger = new function() {

    var data = {
        id: null,
        url: null,
        clickCount: 0,
        copyCount: 0,
        startTime: null,
        maxScrollHeight: 0,
        lastScrollHeight: 0
    }
    
    var pageActive = false;
    
    function onClickHandler(e) {
        clickCount++;
    }
    
    function activatePage() {
        pageActive = true;
        data.clickCount = 0;
        data.startTime = Date.now();
    }
    
    function scrollPositionUpdate(e) {
        var pos = window.scrollY + window.innerHeight/2;
        data.maxScrollHeight = pos > data.maxScrollHeight ? pos : data.maxScrollHeight;
        data.lastScrollHeight = pos;
    }
    
    function pageDeactivateHandler() {
        pageActive = false;
        updateStorage();
    }

    function copyEventHandler() {
        data.copyCount ++;
    }
    
    function updateStorage() {
        
    }
    
    this.initLogger = function() {
        document.addEventListener("click", onClickHandler);
        document.addEventListener("beforeunload", pageDeactivateHandler);
        document.addEventListener("scroll", scrollPositionUpdate);
        document.addEventListener("blur", pageDeactivateHandler)
        document.addEventListener("focus", activatePage);
        document.addEventListener("copy", copyEventHandler);
        
        activatePage();
    
    }
    
    data.url = document.location.href;

};