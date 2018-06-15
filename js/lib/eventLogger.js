// Database = chrome.runtime.getBackgroundPage().Database;

var EventLogger = new function () {

    var data = {
        url: null,
        title: null,
        clickCount: 0,
        copyCount: 0,
        startTime: null,
        maxScrollHeight: 0,
        lastScrollHeight: 0,
        totalTime: 0
    }

    var pageActive = true;

    function onClickHandler(e) {
        data.clickCount++;
    }

    function activatePage() {
        // Database.getUrlHistory(data.url).then((doc) => {
        //     data = doc ? doc : data;
        // }, () => {
        //     data.startTime = Date.now();
        //     data.clickCount = 0;
        // });
        data.startTime = Date.now();
        data.clickCount = 0;
        pageActive = true;
    }

    function scrollPositionUpdate(e) {
        var pos = window.scrollY + window.innerHeight / 2;
        data.maxScrollHeight = pos > data.maxScrollHeight ? pos : data.maxScrollHeight;
        data.lastScrollHeight = pos;
    }

    function pageDeactivateHandler() {
        pageActive = false;
        console.log("aaa");
        data.totalTime += Date.now() - data.startTime;
        updateStorage();
    }

    function copyEventHandler() {
        data.copyCount++;
    }

    function updateStorage() {
        // Database.updateStorage(data);
        databaseEvent();
    }

    this.initLogger = function () {
        document.addEventListener("click", onClickHandler);
        document.addEventListener("beforeunload", pageDeactivateHandler);
        document.addEventListener("scroll", scrollPositionUpdate);
        document.addEventListener("onunload", pageDeactivateHandler);
        document.addEventListener("visibilitychange", pageDeactivateHandler);
        document.addEventListener("focus", activatePage);
        document.addEventListener("copy", copyEventHandler);

        activatePage();
    }

    data.url = document.location.href;
    data.title = document.head.title;

    var databaseEvent = function() {
        console.log("a");
        var event = document.createEvent('Event');
        event.data = {
            area: "EventLogging",
            payload: data
        }
        event.initEvent('databaseManagement');
        document.dispatchEvent(event);
    }
};

document.addEventListener("databaseManagement", function(event) {
    chrome.runtime.sendMessage(event);
});