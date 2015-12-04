var influx = require('influx');
var client = influx({host:'10.254.0.4', port:8086, database:'hamster-test', username:'test', password:'test123'});

var data = {};

setInterval(function() {

	randomWalk('request_count', 1000, 100);
	randomWalk('request_count2', 1000, 100);
	randomWalk('request_count3', 1000, 100);

	randomWalk('request_time', 10, 5);
	randomWalk('request_time2', 10, 5);

}, 10000);

function randomWalk(name, start, variation) {
	if (!data[name]) {
		data[name] = start;
	}

	data[name] += (Math.random() * variation) - (variation / 2);

	console.log('Writing ' + name + " :" + data[name]);

	client.writePoint(name, { time: new Date(), value: data[name] }, { foo: 'bar', foobar: 'baz'}, function(err) {
		if (err) {
			console.log('InfluxDB Error', err);
		}
	});
}
