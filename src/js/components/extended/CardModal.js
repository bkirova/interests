const Modal = require('../basic/Modal');
const Input = require('../basic/Input');
const Button = require('../basic/Button');


class CardModal extends Modal {

	static events = {
		ADD: 'add'
	};

	/**
	 * @param {Object} data - component's data
	 */
	constructor(data) {
		super({data});

		this._render();
	}

	_render() {
		this._inputs.title = new Input({type: 'text', placeholder: 'Title'});
		this.contentContainer.appendChild(this._inputs.title.container);

		this._inputs.description = new Input({type: 'text', placeholder: 'Description'});
		this.contentContainer.appendChild(this._inputs.description.container);

		this._inputs.location = new Input({type: 'text', placeholder: 'Location'});
		this.contentContainer.appendChild(this._inputs.location.container);

		this._inputs.date = new Input({type: 'date', placeholder: 'Date'});
		this.contentContainer.appendChild(this._inputs.date.container);

		this._inputs.image = new Input({type: 'text', placeholder: 'Image Url'});
		this.contentContainer.appendChild(this._inputs.image.container);

		this._renderCancelAction();

		this._actions.add = new Button({label: 'Add', type:'dark'});
		this.actionsContainer.appendChild(this._actions.add.container);
		this._actions.add.on(Button.events.CLICK, () => {
			this.emit(CardModal.events.ADD, {
				title: this._inputs.title.value, 
				image: this._inputs.image.value,
				description: this._inputs.description.value,	
			});
		});
	}

}

module.exports = CardModal;
