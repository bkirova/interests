const Config = require('./Config');


class Client {

	constructor() {
		
	}

	get(url) {
		let data = {};

		switch(url) {
			case 'settings':
				data = {
					success: false,
					data: {
						user: Config.user,
						cards: Config.cards,
						tags: Config.tags,
					}
				};
				break;
			case 'cards':
				data = {
					cards: Config.cards
				};
				break;
			case 'tags':
				data = {
					tags: Config.tags,
				};
				break;		
		}
		
		return data;
	}

	post(url, data) {
		switch(url) {
			case 'settings':
				Config.user = data;
				break;
			case 'add_event':
				Config.cards.push(data);
				break;
			case 'join_event':
				let event = Config.cards.find((card) => {
					return card.id===data.card.id;
				});

				event.subscribers.push(data.user);
				break;	
			case 'add_tag':
				Config.tags.push(data.tag);
				break;		
		}
	}

}

module.exports = Client;
