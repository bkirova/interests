const Component = require('../Component');
const template = require('../../../templates/components/basic/Input.hbs');

class Input extends Component {

	/**
	 * @param {Object} data - component's data
	 * @param {String} data.type
	 * @param {String} data.label
	 * @param {String} data.value
	 */
	constructor(data) {
		super({name: 'input', template, data});
	}

}

module.exports = Input;
