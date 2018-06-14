var data = {
	items: [{url: 'https://google.com', title: 'Google'}]
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