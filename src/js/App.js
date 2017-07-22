class App {

	constructor() {
		this._render();
	}

	_render() {
		this.container = document.createElement('div');

	 	let heading = document.createElement('h1');
	 	heading.textContent = 'Interests';

	 	this.container.appendChild(heading);
	}

}

module.exports = App;
