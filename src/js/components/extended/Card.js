const Component = require('../Component');
const template = require('../../../templates/components/extended/Card.hbs');

const Button = require('../basic/Button');
const Tag = require('../basic/Tag');


class Card extends Component {

	static events = {
		EDIT: 'join'
	};

	_tags = [];

	/**
	 * @param {Object} data - component's data
	 */
	constructor(data) {
		super({name: 'card', template, data});

		this._data = data;

		if(data.tags) {
			data.tags.forEach((label) => {
				let tag = new Tag({label});
				this._tags.push(tag);
				this.tagsContainer.appendChild(tag.container);
			});
		}

		if(data.subscribers) {
			data.subscribers.forEach((data) => {
				// TODO need component for subscriber
				// let subscriber = new Tag({label: data.name});
				// this.subscribersContainer.appendChild(subscriber.container);
			});
		}

		this._buttonJoin = new Button({label: 'Join', type:'dark', icon: 'plus'});
		this.actionsContainer.appendChild(this._buttonJoin.container);

		this._buttonJoin.on(Button.events.CLICK, () => {
			this.emit(Card.events.JOIN, this._data);
		});
	}


	get tagsContainer() {
		return this.container.querySelector('.tags');
	}

	get subscribersContainer() {
		return this.container.querySelector('.subscribers');
	}

	get actionsContainer() {
		return this.container.querySelector('.actions');
	}

}

module.exports = Card;
