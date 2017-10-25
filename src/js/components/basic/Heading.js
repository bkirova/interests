const Component = require('../Component');
const template = require('../../../templates/components/basic/Heading.hbs');

class Heading extends Component {

	/**
	 * @param {Object} data - component's data
	 * @param {String} data.title
	 * @param {String} data.subTitle
	 */
	constructor(data) {
		super({name: 'heading', template, data});
	}
}

module.exports = Heading;
