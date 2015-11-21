'use strict';

var fs = require('fs');
var http = require('http');

var file = fs.createWriteStream('./fixtures/success');
var request = http.get('http://steamcommunity.com/id/awtt/inventory/json/730/2/', res => {
  res.pipe(file);
});
