var Database = new function() {
	var buckettable;
	var linktable;
	var bucketcount = 0;
	var linkcount = 0;

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
	      		console.log('Successfully inserted a Bucket!');
	      	}
  		});
	}

	this.insertLink = (linkObject) => {
		var doc = {
			"_id": linkObject.url,
			"url": linkObject.url,
			"clickcount": linkObject.clickcount,
			"maxScrollHeight": linkObject.maxScrollHeight,
			"lastScrollHeight": linkObject.lastScrollHeight,
			"activeTime": linkObject.activeTime,
			"copycount": linkObject.copycount
		};
		return linktable.put(doc, function callback(err, result) {
	    	if (!err) {
	      		console.log('Successfully inserted a Link!');
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

	this.updateStorage = (data) => {
		updateLink(data)
	}

	this.updateBucket = () => {

	}

	this.updateLink = (linkObject) => {
		linktable.get(linkObject.url).then(function(doc){
			return linktable.put({
				"_id": linkObject.url,
				_rev: doc._rev,
				"url": linkObject.url,
				"clickcount": linkObject.clickcount + doc.clickcount,
				"maxScrollHeight": doc.maxScrollHeight > linkObject.maxScrollHeight ? doc.maxScrollHeight: linkObject.maxScrollHeight,
				"lastScrollHeight": linkObject.lastScrollHeight,
				"activeTime": linkObject.activeTime + doc.activeTime,
				"copycount": linkObject.copycount + doc.copycount

			});
		}).then(function(response){

		}).catch(function(err){
			linktable.insertLink(linkObject);
		});
	}

}