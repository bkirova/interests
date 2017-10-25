const Component = require('../Component');
const template = require('../../../templates/components/basic/Button.hbs');

class Button extends Component {

	static events = {
		CLICK: 'click'
	};

	/**
	 * @param {Object} data - component's data
	 * @param {String} data.label
	 */
	constructor(data) {
		super({name: 'button', template, data});

		this.container.querySelector('.btn').addEventListener('click', (e) => {
			this.emit(Button.events.CLICK, e);
		});
	}
}

module.exports = Button;
