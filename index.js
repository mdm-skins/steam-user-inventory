'use strict';

const got = require('got');
let URL;

module.exports = function (user, game) {
	if (!user) {
		throw new TypeError('Please provide a user');
	}

	game = game || '730/2/';

	if (isNaN(Number(user))) {
		URL = `http://steamcommunity.com/id/${user}/inventory/json/${game}`;
	} else {
		URL = `http://steamcommunity.com/profiles/${user}/inventory/json/${game}`;
	}

	let response = [];

	return got(URL).then(res => {
		let items;
		let desc;

		try {
			desc = JSON.parse(res.body).rgDescriptions;
			items = JSON.parse(res.body).rgInventory;
		} catch (e) {
			items = [];
			desc = {};
		}

		if (!items) {
			return response;
		}

		Object.keys(items).forEach(key => {
			let temp = items[key];
			let item = desc[`${temp.classid}_${temp.instanceid}`];

			if (!item) {
				return response.push({error: true});
			}

			let data = {
				id: temp.id,
				amount: temp.amount,
				pos: temp.pos,
				name: item.name,
				appid: item.appid,
				classid: item.classid,
				instanceid: item.instanceid,
				tradable: item.tradable,
				marketable: item.marketable,
				marketTradableRestriction: item.market_tradable_restriction,
				link: item.actions ? item.actions[0].link : null,
				image: `http://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url_large || item.icon_url}`,
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
