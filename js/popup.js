var data = {
	items: [{url: 'https://google.com', title: 'Google'},
			{url: 'https://yahoo.com', title: 'Yahoo'},
			{url: 'https://en.wikipedia.org/wiki/Windows_10', title: 'Windows 10 - Wikipedia'}]
}

var vue = new Vue({
	el: '#currentbucket',
	data: data
})
console.log('hi');


Database = chrome.extension.getBackgroundPage().Database;

Database.getBucketFromUrl(document.location.href).then((bucket) => {
	// render ui for this bucket
}, () => {
	// no bucket found
});