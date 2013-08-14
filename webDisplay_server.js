var http = require('http');
var fs = require('fs');
var count = 0;

http.createServer(function (req, res) {
    var date = new Date();
    console.log('>> New Client at: ' + date);
    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('./index.html', function(err, html) {
            fs.readFile('/sys/class/thermal/thermal_zone0/temp', function(err, data) {
                console.log('Client called: ' + req.url);
                if (err) throw err;
                var temp = data / 1000 + "C";
                var htmlNew = fillData(temp, 'tempSpot">', html.toString());
                fs.readFile('./data-log.csv', function(err, log) {
                	if (err) throw err;
                	var parsedData = parseData(log.toString());
                	htmlNew = fillData(parsedData.time, 'timeData">', htmlNew);
                	var htmlFinal = fillData(parsedData.temp, 'tempData">', htmlNew);
					res.write(htmlFinal);
                	res.end();
                });
            });
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        fs.readFile('.'+req.url, function(err, data) {
            console.log('Client called: ' + req.url);
            if (err) {
                console.log('error: ' + err);
                res.end();
            } else {
                res.write(data);
                res.end();
            }
        });
    }
}).listen(80);

console.log('Server running at http://127.0.0.1:80/');

function fillData(data, position, html) {
	var a = html.indexOf(position) + position.length;
	var b = html.substring(0, a) + data + html.substring(a);
	return b;
}

function parseData(log) {
	var timeData = '';
	var tempData = '';
	var posTemp = 0;
	var numData = log.split('\n').length - 1;
	for (var i = 0; i < numData; i++) {
		var posC = log.indexOf(',', posTemp);
		var posN = log.indexOf('\n', posC);

		var time = log.substring(posTemp, posC-15);
		var temp = log.substring(posC+1, posN);

		if (i === 0) {
			timeData = time;
			tempData = temp;
		} else {
			timeData += ',' + time;
			tempData += ',' + temp;
		}
		posTemp = posN;
	}
	return {time: timeData, 
			temp: tempData};
}
