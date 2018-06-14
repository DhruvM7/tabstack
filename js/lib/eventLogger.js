var EventLogger = new function() {

    var data = {
        id: null,
        url: null,
        clickCount: 0,
        startTime: null,
        maxScroll: 0
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
        data.maxScroll = pos > data.maxScroll ? pos : data.maxScroll;
    }
    
    function pageDeactivateHandler() {
        pageActive = false;
        updateStorage();
    }
    
    function updateStorage() {
        
    }
    
    this.initLogger = function() {
        document.addEventListener("click", onClickHandler);
        document.addEventListener("beforeunload", pageDeactivateHandler);
        document.addEventListener("scroll", scrollPositionUpdate);
        document.addEventListener("blur", pageDeactivateHandler)
        document.addEventListener("focus", activatePage);
        
        activatePage();
    
    }
    
    data.url = document.location.href;

};