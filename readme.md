# steam-user-inventory [![Build Status](https://travis-ci.org/steam-items/steam-user-inventory.svg?branch=master)](https://travis-ci.org/steam-items/steam-user-inventory)

> Get the items in user steam inventory.


## Install

```
$ npm install --save steam-user-inventory
```


## Usage

```js
var steamUserInventory = require('steam-user-inventory');
steamUserInventory('awtt').then(data => {
	// console.log(data);
});
```


## API

### steamUserInventory(user, game)
Return: `Promise that resolve to array of objects`

```
[
	{
		id
		name
		appid
		classid
		instanceid
		tradable
		marketable
		marketTradableRestriction
		link
		image
		category
		type
		exterior
		quality
	},
	...
]
```

#### user

Type: `String`

Steam username or profile ID.

#### game

Type: `String`

Default `730/2/` (csgo)

Steam game id.

## License

MIT © [Daniel Husar](https://github.com/danielhusar)
