const Component = require('../Component');
const template = require('../../../templates/components/extended/SideBar.hbs');

class SideBar extends Component {


	/**
	 * @param {Object} data - component's data
	 */
	constructor(data) {
		super({name: 'sidebar', template, data});

	}

}

module.exports = SideBar;
