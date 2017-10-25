const Component = require('../Component');
const template = require('../../../templates/components/basic/Logo.hbs');

class Logo extends Component {

	/**
	 * @param {Object} data - component's data
	 * @param {String} data.src
	 * @param {String} data.alt
	 */
	constructor(data) {
		super({name: 'logo', template, data});
	}
}

module.exports = Logo;
