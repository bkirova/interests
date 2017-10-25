const Component = require('../Component');
const template = require('../../../templates/components/basic/Icon.hbs');

class Icon extends Component {

	static events = {
		CLICK: 'click'
	};

	/**
	 * @param {Object} data - component's data
	 * @param {String} data.name
	 */
	constructor(data) {
		super({name: 'icon', template, data});

		this.container.querySelector('.icon').addEventListener('click', (e) => {
			this.emit(Icon.events.CLICK, e);
		});
	}
}

module.exports = Icon;
