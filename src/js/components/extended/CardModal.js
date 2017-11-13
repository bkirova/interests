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

		this._renderCancelAction();

		this._actions.add = new Button({label: 'Add', type:'dark'});
		this.actionsContainer.appendChild(this._actions.add.container);
		this._actions.add.on(Button.events.CLICK, () => {
			this.emit(CardModal.events.ADD, {
				title: 'static example card', 
				image: 'https://www.residentadvisor.net/images/events/flyer/2016/2/it-0211-803721-front.jpg',
				description: 'I love working on fresh designs that. To that end, I need to freshen up my portfolio here because it does exactly the opposite.',	
			});
		});
	}

}

module.exports = CardModal;
