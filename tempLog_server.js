var fs = require('fs');

var intervalId = setInterval(function() {
    fs.readFile('/sys/class/thermal/thermal_zone0/temp', function(err, data) {
        var date = new Date();
        var temp = data / 1000;
        var newData = date + ',' + temp + '\n';
        fs.appendFile('./data-log.csv', newData, function(err) {
            console.log('File Appended: ' + date + ' at ' + temp);
            if (err) throw err;
            count++;
        });
    });
}, 3600000);
