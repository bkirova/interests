const Component = require('../Component');
const template = require('../../../templates/components/basic/Tag.hbs');

class Tag extends Component {

	/**
	 * @param {Object} data - component's data
	 * @param {String} data.label
	 */
	constructor(data) {
		super({name: 'tag', template, data});
	}
}

module.exports = Tag;
