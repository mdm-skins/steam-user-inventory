'use strict';

const got = require('got');

module.exports = function (user, game) {
	game = game || '730/2/';
	const URL = `http://steamcommunity.com/id/${user}/inventory/json/${game}`;

	return got(URL).then(response => {
		console.log(response);
	});
};

