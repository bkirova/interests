const Modal = require('../basic/Modal');
const Input = require('../basic/Input');
const Button = require('../basic/Button');


class SettingsModal extends Modal {

	static events = {
		SUCCESS: 'success'
	};

	/**
	 * @param {Object} data - component's data
	 */
	constructor(data) {
		super({data});

		this._render();
	}

	_render() {
		this._inputs.password = new Input({type: 'password', placeholder: 'Password'});
		this.contentContainer.appendChild(this._inputs.password.container);

		this._renderCancelAction();

		this._actions.save = new Button({label: 'Save', type:'dark'});
		this.actionsContainer.appendChild(this._actions.save.container);
		this._actions.save.on(Button.events.CLICK, () => {
			this.emit(SettingsModal.events.SUCCESS);
		});
	}

}

module.exports = SettingsModal;
