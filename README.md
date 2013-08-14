piTemp
======

Description
------------
This is a two-part NodeJS server that runs a local webpage (```webDisplay_server.js```) and collects temperature data (```tempLog_server.js```) 
of the RaspberryPi.

The webpage runs on the local IP (127.0.0.1) on port 80 so you can access the webpage by typing in your RaspberryPi's 
IP address into a web browser. Most of the file control is done through NodeJS by breaking the HTML file and putting 
the data in a hidden div. Then by using ChartJS and Twitter's Bootstrap it displays the data in a very general line 
chart with the the current temp in the top panel.

The temperature logging puts a new temp every 3600000 milliseconds (1 hour) and current date into a ```data-log.csv```.

Setup
------
* Raspbian “wheezy” from [here](http://www.raspberrypi.org/downloads)
* NodeJS from [here](http://nodejs.org/dist/v0.10.13/node-v0.10.13-linux-arm-pi.tar.gz)
  * **Note:** NodeJS will have to be a part of .bashrc for the ```start_server.sh``` to work.

Extras
-------
Running ```start-server.sh``` will run the web server and the hourly temperature logging on two different screens.  
