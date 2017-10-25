const EventEmitter = require('events').EventEmitter;

class Component extends EventEmitter {

	constructor(params) {
		super();

		this._name = params.name;
		this._template = params.template;
		this._data = params.data;

		this.container = null;
		this.innerContainer = null;

		this._sanitizeName();
		this._setContainer();

		this.render();
	}

	/**
	 * Checks if component's name is sanitized
	 * @private
	 * @returns {boolean} An error or true.
	 */
	_sanitizeName() {
		if (this._name.toLowerCase() !== this._name) {
			return console.error('The component name must be all lower case separated with dashes');
		}

		return true;
	}

	/**
	 * Set main component container from component's name
	 * @private
	 */
	_setContainer() {
		this.container = document.createElement('div');
		this.container.className = `${this._name}-component-container`;
	}

	render(data) {
		this.container.innerHTML = this._template(data || this._data);

		this.innerContainer = this.container.querySelector(`.${this._name}-component`);

		if(!this.innerContainer) console.warn(`No innerContainer found in the ${this._name} template`);
	}

	update(data) {
		if(data) {
			this._data = Object.assign(this._data, data);
		}

		this.container.innerHTML = this._template(this._data);
	}

	show() {
		this.container.style.display = 'block';
	}

	hide() {
		this.container.style.display = 'none';
	}

	resetInnerContainer() {
		this.innerContainer.innerHTML = '';
	}

}

module.exports = Component;
