const Modal = require('../basic/Modal');
const Input = require('../basic/Input');
const Button = require('../basic/Button');


class SignInModal extends Modal {

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
		this._inputEmail = new Input({type: 'email', placeholder: 'Email'});
		this._inputPassword = new Input({type: 'password', placeholder: 'Password'});
		this._buttonSignIn = new Button({label: 'Sign In', type:'dark'});

		let container = this.container.querySelector('.modal-content');
		container.appendChild(this._inputEmail.container);
		container.appendChild(this._inputPassword.container);
		container.appendChild(this._buttonSignIn.container);

		this._buttonSignIn.on(Button.events.CLICK, () => {
			this.emit(SignInModal.events.SUCCESS);
		});
	}

}

module.exports = SignInModal;
