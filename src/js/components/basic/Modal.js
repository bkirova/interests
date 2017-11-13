const Component = require('../Component');
const template = require('../../../templates/components/basic/Modal.hbs');
const Icon = require('./Icon');
const Button = require('./Button');

class Modal extends Component {

	_inputs = {};

	_actions = {};

	/**
	 * @param {Object} data - component's data
	 */
	constructor(params) {
		super(Object.assign(params, {template, name:'modal'}));

		this._hasOverlay = (this._data.hasOverlay===true);

		let closeButton = new Icon({name:'times'});

		this.container.querySelector('.close').appendChild(closeButton.container);

		closeButton.on(Icon.events.CLICK, () => {
			this.hide();
		});
	}

	_renderCancelAction() {
		this._actions.cancel = new Button({label: 'Cancel', type:'dark'});
		this.actionsContainer.appendChild(this._actions.cancel.container);
		this._actions.cancel.on(Button.events.CLICK, () => {
			this.hide();
		});
	}


	show() {
		super.show();

		this._hasOverlay && document.body.querySelector('.overlay').classList.remove('hidden');
	}

	hide() {
		super.hide();

		document.body.querySelector('.overlay').classList.add('hidden');
	}

	get contentContainer() {
		return this.container.querySelector('.modal-content');
	}

	get actionsContainer() {
		return this.container.querySelector('.actions');
	}
}

module.exports = Modal;
