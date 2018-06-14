console.log('MainPage');

var data = {
	buckets: [
		{
			title: 'Bucket 1',
			topics: ['Mughal Emperors', 'Akbar'],
			searches: ['akbar life', 'akbar art'],
			items: [{url: 'https://google.com', title: 'Google', timestamp: '6pm today', timeSpent: '10', copy: '2', clicks: '5', scroll: '100'},
					{url: 'https://google.com', title: 'Google', timestamp: '6pm today', timeSpent: '5', copy: '4', clicks: '7', scroll: '145'},
					{url: 'https://google.com', title: 'Google', timestamp: '6pm today', timeSpent: '7', copy: '1', clicks: '2', scroll: '270'}
			]
		},
		{
			title: 'Bucket 2',
			topics: ['C#', 'Azure API'],
			items: [{url: 'https://yahoo.com', title: 'Yahoo', timestamp: '6pm today', timeSpent: '10', copy: '2', clicks: '5', scroll: '100'},
					{url: 'https://yahoo.com', title: 'Yahoo', timestamp: '6pm today', timeSpent: '5', copy: '4', clicks: '7', scroll: '180'},
					{url: 'https://yahoo.com', title: 'Yahoo', timestamp: '6pm today', timeSpent: '7', copy: '1', clicks: '2', scroll: '263'}
			]
		}
	]
}

var vue = new Vue({
	el: '#content',
	data: data,
	methods: {
		sortByNumeric: function (key, increasing) {
			data.items.sort(function (a, b) {
  				if(increasing)
  					return a[key] - b[key];
  				else
  					return b[key] - a[key];
			})
		}
	}
})