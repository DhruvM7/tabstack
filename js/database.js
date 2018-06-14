var Database = new function() {
	var buckettable;
	var linktable;
	var bucketcount = 0;
	var linkcount = 0;

	buckettable = new PouchDB("Buckets");
	linktable = new PouchDB("Links");

	this.insertBucket = function(bucketObject) {
		var doc = {
			"_id": bucketcount++,
			"relevantTopics": bucketObject.topics,
			"queryStrings": bucketObject.queries,
			"linklist": bucketObject.linklist,
			"timeStamp": bucketObject.timestamp,
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
			"title": linkObject.title,
			"clickcount": linkObject.clickcount,
			"maxScrollHeight": linkObject.maxScrollHeight,
			"lastScrollHeight": linkObject.lastScrollHeight,
			"startTime": linkObject.startTime,
			"totalTime": linkObject.totalTime,
			"copycount": linkObject.copycount

		};
		return linktable.put(doc, function callback(err, result) {
	    	if (!err) {
	      		console.log('Successfully inserted a Link!');
	      	}
  		});
	}

	this.getAllLinks = () => {
		var returnResolve;

		linktable.allDocs({include_docs: true, descending: true}, function(err, doc) {
	    	returnResolve(doc.rows);
	  	});

	  	return new Promise(function(resolve, reject) {
			returnResolve = resolve;
		});
	}

	this.getAllBuckets = () => {
		var returnResolve;

		buckettable.allDocs({include_docs: true, descending: true}, function(err, doc) {
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

	this.updateBucket = (bucketObject, linkObject) => {
		//bucketObject will be fetched once before while matching
		//correletions
		//Thus we will get the bucket object relevant to the linkObject
		// No need to get the object
		buckettable.put({
			"_id": bucketObject.url,
			"queryStrings": bucketObject.queryStrings.push(""),
			"linklist": bucketObject.linklist.push(linkObject._id),
		}).then(function(response){
			
		}).catch(function(err){
		}); 
	}

	this.updateLink = (linkObject) => {
		linktable.get(linkObject.url).then(function(doc){
			return linktable.put({
				"_id":doc.url,
				_rev: doc._rev,
				"title": linkObject.title,
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