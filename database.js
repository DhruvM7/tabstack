var buckettable;
var linktable;
var bucketcount = 0;

function initDB() {
	buckettable = new PouchDB("Buckets");
	linktable = new PouchDB("Links");
	buckettable.info().then(function(info) {
	console.log(info);})
	linktable.info().then(function(info) {
	console.log(info);})
}

function insertBucket(topics,queries,linklist,timestamp) {
	var doc = {
		"_id": bucketcount++,
		"relevantTopics": topics,
		"queryStrings": queries,
		"linklist": linklist,
		"timeStamp": timestamp,
	};
	buckettable.put(doc);
}

function insertLink(url,clickcount,scrollPos,activeTime,copied) {
	var doc = {
		"_id": url,
		"url": url,
		"clickcount": clickcount,
		"scrollPos": scrollPos,
		"activeTime": activeTime,
		"copied": copied
	};
	linktable.put(doc);
}

function updateBucket() {

}

function updateLink() {

}