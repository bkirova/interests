const Component = require('../Component');
const template = require('../../../templates/components/extended/BottomBar.hbs');

class BottomBar extends Component {

	/**
	 * @param {Object} data - component's data
	 */
	constructor(data) {
		super({name: 'bottombar', template, data})
	}

}

module.exports = BottomBar;
