'use strict';

const fs = require('fs');
const assert = require('assert');
const proxyquire = require('proxyquire');
const _ = require('lodash');

let stub = {};
['success', 'private', 'error'].forEach(item => {
	stub[item] = function () {
		return new Promise(resolve => {
			resolve({
				body: fs.readFileSync(`./fixtures/${item}`).toString()
			});
		});
	};
});

const inventory = proxyquire('./index', {got: stub.success});
const inventory2 = proxyquire('./index', {got: stub.private});
const inventory3 = proxyquire('./index', {got: stub.error});

it('Returnin item attributes', () => {
	return inventory('fooo').then(data => {
		let awp = _.find(data, item => {
			return item.id === '310918879_482180940';
		});

		assert.equal(awp.name, 'StatTrak™ AWP | Redline');
		assert.equal(awp.link, 'steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S%owner_steamid%A%assetid%D9972282529465922217');
		assert.equal(awp.image, 'http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJB496klb-GkvP9JrbummpD78A_3LGXrI-i31fm_Uc5MW_3I4LDelc2YQmF-FPtl7_uh8PtupTMn3pnvD5iuyj-_v0pRA');
		assert.equal(awp.category, 'Sniper Rifle');
		assert.equal(awp.type, 'AWP');
		assert.equal(awp.exterior, 'Field-Tested');
		assert.equal(awp.quality, 'StatTrak™');
	});
});

it('Return empty array for private user', () => {
	return inventory2('234234234').then(data => {
		assert.equal(data.length, 0);
	});
});

it('Return empty array for non existing user', () => {
	return inventory3('234234234').then(data => {
		assert.equal(data.length, 0);
	});
});

it('Username is mandatory', () => {
	assert.throws(() => {
		inventory();
	});
});
