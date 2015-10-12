'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire');
const _ = require('lodash');
const data = require('./fixture.json');
const inventory = proxyquire('./index', {got: gotStub});

function gotStub() {
	return new Promise(resolve => {
		resolve({
			body: data
		});
	});
}

it('Returning item attributes should work', () => {
	return inventory('fooo').then(data => {
		let awp = _.find(data, item => {
			return item.id === '310918879_480995726';
		});

		assert(awp.name, 'StatTrak™ AWP | Redline');
		assert(awp.link, 'steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S%owner_steamid%A%assetid%D7795427765223739405');
		assert(awp.image, 'http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJB496klb-GkvP9JrbummpD78A_3LGXrI-i31fm_Uc5MW_3I4LDelc2YQmF-FPtl7_uh8PtupTMn3pnvD5iuyj-_v0pRA');
		assert(awp.category, 'Sniper Rifle');
		assert(awp.type, 'AWP');
		assert(awp.exterior, 'Field-Tested');
		assert(awp.quality, 'StatTrak™');
	});
});
