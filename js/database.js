
var Database = new function() {
	var buckettable;
	var linktable;
	var bucketcount = 0;

	buckettable = new PouchDB("Buckets");
	linktable = new PouchDB("Links");


	this.insertBucket = function(topics,queries,linklist,timestamp) {
		var doc = {
			"_id": bucketcount++,
			"relevantTopics": topics,
			"queryStrings": queries,
			"linklist": linklist,
			"timeStamp": timestamp,
		};
		buckettable.put(doc, function callback(err, result) {
	    	if (!err) {
	      		console.log('Successfully posted a todo!');
	      	}
  		});
	}

	this.insertLink = (data) => {
		var doc = {
			"_id": data.url,
			"url": data.url,
			"clickCount": data.clickCount,
			"copyCount": data.copyCount,
			"startTime": data.startTime,
			"maxScrollHeight": data.maxScrollHeight,
			"lastScrollHeight": data.lastScrollHeight,
			"totalTime": data.totalTime
		};
		return linktable.put(doc, function callback(err, result) {
	    	if (!err) {
	      		console.log('Successfully posted a todo!');
	      	}
  		});
	}

	this.getAllBuckets = () => {
		var returnResolve;

		linktable.allDocs({include_docs: true, descending: true}, function(err, doc) {
	    	returnResolve(doc.rows);
	  	});

	  	return new Promise(function(resolve, reject) {
			returnResolve = resolve;
		});
	}

	this.getUrlHistory = (url) => {
		return linktable.get(url);
	}

	this.getBucketFromUrl = (url) => {
		return buckettable.find({
			selector: {url: url},
		  })
	}

	function updateStorage() {
		// check if link already exists in table
		// if yes, update with new data
		// if no, add
	}

	function updateBucket() {

	}

	function updateLink() {

	}

}