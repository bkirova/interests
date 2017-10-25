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

		this._cards = data.cards.map((cardData) => {
			let card = new Card(cardData);
			this.innerContainer.appendChild(card.container);

			card.on(Card.events.JOIN, (data) => {
				this.emit(Board.events.JOIN, data);
			});

			return card;
		});
	}

}

module.exports = Board;
