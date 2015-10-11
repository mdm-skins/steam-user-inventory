'use strict';

// http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09uknYaNnvnLP7LWnn9u5MRjjeyPp9mgilDs-BU4YG3wcdedJw5qaVyB-wW7kufrjJO16J2by3Qw63ZzsGGdwUIIJNFlNw/330x192
// "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09uknYaNnvnLP7LWnn8fupAkiO2Zporx2wDnrhJkNmGnLILEc1I7MlHU81S3le69h5Dv7cuYnGwj5HeWs6qHHw"
// "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09uknYaNnvnLP7LWnn9u5MRjjeyPp9mgilDs-BU4YG3wcdedJw5qaVyB-wW7kufrjJO16J2by3Qw63ZzsGGdwUIIJNFlNw"


const got = require('got');

function a(user, game) {
	if (!user) {
		throw new TypeError('Please provide a user');
	}

	game = game || '730/2/'; // CSGO
	const URL = `http://steamcommunity.com/id/${user}/inventory/json/${game}`;
	let response = [];

	return got(URL, {json: true}).then(res => {
		const items = res.body.rgDescriptions;

		if (!items) {
			return [];
		}

		Object.keys(items).forEach(key => {
			let item = items[key];
			let data = {
				id: key,
				name: item.name,
				appid: item.appid,
				link: item.actions ? item.actions[0].link : null,
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

a('awtt').then(console.log);

