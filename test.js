'use strict';

const fs = require('fs');
const assert = require('assert');
const proxyquire = require('proxyquire');
const _ = require('lodash');
const inventory = proxyquire('./index', {got: gotStub});

function gotStub() {
	return new Promise(resolve => {
		resolve({
			body: fs.readFileSync('./fixtures/success').toString()
		});
	});
}

it('Returnin item attributes', () => {
	return inventory('fooo').then(data => {
		let awp = _.find(data, item => {
			return item.id === '310918879_480995726';
		});

		assert.equal(awp.name, 'StatTrak™ AWP | Redline');
		assert.equal(awp.link, 'steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S%owner_steamid%A%assetid%D7795427765223739405');
		assert.equal(awp.image, 'http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJB496klb-GkvP9JrbummpD78A_3LGXrI-i31fm_Uc5MW_3I4LDelc2YQmF-FPtl7_uh8PtupTMn3pnvD5iuyj-_v0pRA');
		assert.equal(awp.category, 'Sniper Rifle');
		assert.equal(awp.type, 'AWP');
		assert.equal(awp.exterior, 'Field-Tested');
		assert.equal(awp.quality, 'StatTrak™');
	});
});

// it('Return empty array for private user', () => {
// 	return inventory('234234234').then(data => {
// 		assert.equal(data.length, 0);
// 	});
// });

it('Username is mandatory', () => {
	assert.throws(() => {
		inventory();
	});
});
