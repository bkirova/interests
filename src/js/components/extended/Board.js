const Component = require('../Component');
const template = require('../../../templates/components/extended/Board.hbs');

const Card = require('./Card');

class Board extends Component {

	static events = {
		JOIN: 'join'
	};

	_cards = [];

	/**
	 * @param {Object} data - component's data
	 */
	constructor(data) {
		super({name: 'board', template, data});
	}

	//override!!!
	update(data) {
		this.resetInnerContainer();

		data.cards.forEach((cardData) => {
			let card = new Card(cardData);
			this.innerContainer.appendChild(card.container);

			card.on(Card.events.JOIN, (data) => {
				this.emit(Board.events.JOIN, data);
			});

			this._cards.push(card);
		});

	}

	join(data) {
		let card = this._cards.find((item) => {
			return item.data.id = data.id;
		});

		card && card.join();
	}

}

module.exports = Board;
