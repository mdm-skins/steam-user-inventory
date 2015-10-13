'use strict';

const got = require('got');

module.exports = function (user, game) {
	if (!user) {
		throw new TypeError('Please provide a user');
	}

	game = game || '730/2/';
	const URL = `http://steamcommunity.com/id/${user}/inventory/json/${game}`;
	let response = [];

	return got(URL).then(res => {
		let items;

		try {
			items = JSON.parse(res.body).rgDescriptions;
		} catch (e) {
			items = [];
		}

		if (!items) {
			return response;
		}

		Object.keys(items).forEach(key => {
			let item = items[key];
			let data = {
				id: key,
				name: item.name,
				appid: item.appid,
				link: item.actions ? item.actions[0].link : null,
				image: `http://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url_large}`,
				category: null,
				type: null,
				exterior: null,
				quality: null
			};

			item.tags.forEach(tag => {
				if (tag.category === 'Type') {
					data.category = tag.name;
				}
				if (tag.category === 'Weapon') {
					data.type = tag.name;
				}
				if (tag.category === 'Quality') {
					data.quality = tag.name;
				}
				if (tag.category === 'Exterior') {
					data.exterior = tag.name;
				}
			});

			response.push(data);
		});

		return response;
	});
};
