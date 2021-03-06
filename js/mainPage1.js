Database = chrome.extension.getBackgroundPage().Database;
Database.insertLink("https://github.com/Mahak-10",4,6,2,6);

Database.getAllBuckets().then((rows) => {
	console.log(rows);
});

var currentSort = {
	sortKey: 'none',
	sortedIncreasing: false
}
var optionalItemKeys = [
	{keyName: 'timestamp', uiName: 'Time Stamp', show: true, numericSort: false},
	{keyName: 'timeSpent', uiName: 'Time Spent', show: true, numericSort: true},
	{keyName: 'copy', uiName: 'Copy', show: true, numericSort: true},
	{keyName: 'clicks', uiName: 'Clicks', show: true, numericSort: true},
	{keyName: 'scroll', uiName: 'Scroll', show: true, numericSort: true}
];

var data = {
	optionalItemKeys: optionalItemKeys,
	buckets: []
}

// var data = {
// 	optionalItemKeys: optionalItemKeys,
// 	buckets: [
// 		{
// 			title: 'Bucket 1',
// 			topics: ['Mughal Emperors', 'Akbar'],
// 			searches: ['akbar life', 'akbar art'],
// 			items: [{url: 'https://google.com', title: 'Google', timestamp: '6pm today', timeSpent: '10', copy: '2', clicks: '5', scroll: '100'},
// 					{url: 'https://google.com', title: 'Google', timestamp: '6pm today', timeSpent: '5', copy: '4', clicks: '7', scroll: '145'},
// 					{url: 'https://google.com', title: 'Google', timestamp: '6pm today', timeSpent: '7', copy: '1', clicks: '2', scroll: '270'}
// 			],
// 			expanded: true
// 		},
// 		{
// 			title: 'Bucket 2',
// 			topics: ['C#', 'Azure API'],
// 			items: [{url: 'https://yahoo.com', title: 'Yahoo', timestamp: '6pm today', timeSpent: '10', copy: '2', clicks: '5', scroll: '100'},
// 					{url: 'https://yahoo.com', title: 'Yahoo', timestamp: '6pm today', timeSpent: '5', copy: '4', clicks: '7', scroll: '180'},
// 					{url: 'https://yahoo.com', title: 'Yahoo', timestamp: '6pm today', timeSpent: '7', copy: '1', clicks: '2', scroll: '263'}
// 			],
// 			expanded: true
// 		},
// 		{
// 			title: 'Bucket 3',
// 			topics: ['C#', 'Azure API'],
// 			items: [{url: 'https://yahoo.com', title: 'Yahoo', timestamp: '6pm today', timeSpent: '10', copy: '2', clicks: '5', scroll: '100'},
// 					{url: 'https://yahoo.com', title: 'Yahoo', timestamp: '6pm today', timeSpent: '5', copy: '4', clicks: '7', scroll: '180'},
// 					{url: 'https://yahoo.com', title: 'Yahoo', timestamp: '6pm today', timeSpent: '7', copy: '1', clicks: '2', scroll: '263'}
// 			],
// 			expanded: true
// 		},
// 		{
// 			title: 'Bucket 4',
// 			topics: ['C#', 'Azure API'],
// 			items: [{url: 'https://yahoo.com', title: 'Yahoo', timestamp: '6pm today', timeSpent: '10', copy: '2', clicks: '5', scroll: '100'},
// 					{url: 'https://yahoo.com', title: 'Yahoo', timestamp: '6pm today', timeSpent: '5', copy: '4', clicks: '7', scroll: '180'},
// 					{url: 'https://yahoo.com', title: 'Yahoo', timestamp: '6pm today', timeSpent: '7', copy: '1', clicks: '2', scroll: '263'}
// 			],
// 			expanded: true
// 		}
// 	]
// }

var bucket1 = {
    "topics": ["Neural Networks", "Machine learning"],
    "searches": ["Relevance of Neural Nets in Machine Learning"],
    "linklist": [1,4,6],
    "timeStamp": Date.now(),
    "expanded": false
}

var bucket2 = {
    "topics": ["Neural Networks", "Machine learning"],
    "searches": ["Relevance of Neural Nets in Machine Learning"],
    "linklist": [1,4,6],
    "timeStamp": Date.now(),
    "expanded": false
}

function getAllBuckets() {
	data.buckets = [];
	data.buckets.push(bucket1);
	data.buckets.push(bucket2);
}

getAllBuckets();

function getLinks(bucket) {
	console.log("Getting Links from bucket", bucket);
	var links =	[
		{url: 'https://yahoo.com', title: 'Yahoo', timestamp: '6pm today', timeSpent: '10', copy: '2', clicks: '5', scroll: '100'},
		{url: 'https://yahoo.com', title: 'Yahoo', timestamp: '6pm today', timeSpent: '5', copy: '4', clicks: '7', scroll: '180'},
		{url: 'https://yahoo.com', title: 'Yahoo', timestamp: '6pm today', timeSpent: '7', copy: '1', clicks: '2', scroll: '263'}
	];
	console.log(links);
	return links;
}

var contentVM = new Vue({
	el: '#content',
	data:  data,
	methods: {
		resolveLinks: function(bucket) {
			bucket.items = getLinks(bucket);
			console.log("Resolving links for bucket", bucket);
		},

		clickHandler(bucket) {
			this.resolveLinks(bucket);
			bucket.expanded = !bucket.expanded;
			console.log("Click Handler for bucket", bucket);
		}
	}
})

var headerVM = new Vue({
	el: '#header',
	data: { 
		optionalItemKeys: optionalItemKeys,
		currentSort: currentSort
	},
	methods: {
		sortByNumeric: function (key) {
			currentSort.sortedIncreasing = !currentSort.sortedIncreasing;
			var increasing = currentSort.sortedIncreasing;
			currentSort.sortKey = key;
			for(var i=0; i<data.buckets.length; i++) {
				data.buckets[i].items.sort(function (a, b) {
					
	  				if(increasing)
	  					return a[key] - b[key];
	  				else
	  					return b[key] - a[key];
				});
			}
			console.log("sorted by " + key + ", increasing: " + increasing)
		}
	}
})