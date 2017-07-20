const Component = require('./Component');

const events = {
	CLICK: 'click'
};

const types = {
	BASIC: 'basic',
	DEFAULT: 'default',
	INFO: 'info',
	SUCCESS: 'success',
	WARNING: 'warning',
	DANGER: 'danger',
};

/** Button Component */
class Button extends Component {

	onReady() {
		const target = this.container.querySelector('button');

		const eventData = {
			target,
			type: 'click',
			event: Button.events.CLICK,
			data: this.state,
			isPrevented: false,
			isCaptured: false,
		};

		this._setListener(eventData);
	}

	get template() {
		return `
			<button>{{label}}</button>
		`;
	}
}

Button.events = events;
Button.types = types;

module.exports = Button;
