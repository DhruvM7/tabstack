
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

	this.insertLink = (url,clickcount,scrollPos,activeTime,copied) => {
		var doc = {
			"_id": url,
			"url": url,
			"clickcount": clickcount,
			"scrollPos": scrollPos,
			"activeTime": activeTime,
			"copied": copied
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

	function updateBucket() {

	}

	function updateLink() {

	}

}