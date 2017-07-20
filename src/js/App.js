const Button = require('./components/Button.js');

class App {

	constructor() {
		this._button = new Button('button', {label:'Test'});
		this._button.render();
	
		this._render();
		this._subscribe();
	}

	_render() {
		this.container = document.createElement('div');
	 	this.container.appendChild(this._button.container);
	}

	_subscribe() {

		this._button.on(Button.events.CLICK, (data) => {
			alert('Test');
		});
	}
}

module.exports = App;
