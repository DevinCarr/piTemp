#!/bin/bash

screen -S tempLog node tempLog_server.js
screen -S webDisplay node webDisplay_server.js
