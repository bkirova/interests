const Component = require('../Component');
const template = require('../../../templates/components/extended/TopBar.hbs');

const Logo = require('../basic/Logo');
const Heading = require('../basic/Heading');
const Icon = require('../basic/Icon');


class TopBar extends Component {

	static events = {
		NEW: 'new',
		SIGNOUT: 'signout',
		SETTINGS: 'settings'
	};

	/**
	 * @param {Object} data - component's data
	 */
	constructor(data) {
		super({name: 'topbar', template, data});

		this._left = this.container.querySelector('.left');
		this._right = this.container.querySelector('.right');

		this._logo = new Logo({src: 'assets/images/logo-light.png'});
		this._userInfo = new Heading({});
		this._newIcon = new Icon({name: 'plus'});
		this._settingsIcon = new Icon({name: 'cog'});
		this._signOutIcon = new Icon({name: 'sign-out'});

		this._left.appendChild(this._logo.container);
		//this._right.appendChild(this._userInfo.container);
		this._right.appendChild(this._newIcon.container);
		this._right.appendChild(this._settingsIcon.container);
		this._right.appendChild(this._signOutIcon.container);

		this._newIcon.on(Icon.events.CLICK, () => {
			this.emit(TopBar.events.NEW);
		});

		this._signOutIcon.on(Icon.events.CLICK, () => {
			this.emit(TopBar.events.SIGNOUT);
		});

		this._settingsIcon.on(Icon.events.CLICK, () => {
			this.emit(TopBar.events.SETTINGS);
		});
	}

	update(data) {
		this._userInfo.update({title: data.user.name, subTitle: data.user.position});
	}

}

module.exports = TopBar;
