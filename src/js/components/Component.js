const EventEmitter = require('events').EventEmitter;
const intraHTML = require('intrahtml');
const Handlebars = require('handlebars');

const events = {
	SHOW_START: 'show_start',
	SHOW_END: 'show_end',
	HIDE_START: 'hide_start',
	HIDE_END: 'hide_end',
	READY: 'ready',
	UPDATE_STATE: 'update_state',
};

/** Component abstraction */
class Component extends EventEmitter {

	/**
	 * @param {Object} params - component's parameters
	 * @param {String} params.name - this will be added as a class name to the main container `${name}-component-container`
	 * @param {Function} params.template - component's template
	 */
	constructor(name, data) {
		super();

		this._state = {};
		this._defaults = {};
		this._name = name;
		this._data = data;
	}

	render() {
		if(!this.template) {
			console.error('Please define a template!');
		}
		this._template = Handlebars.compile(this.template);
		this._sanitizeName();
		this._setContainer();
		this._bindState();
	}

	/**
	 * Default component's show function.
	 */
	show() {
		this.container.style.display = 'block';
	}

	/**
	 * Default component's hide function.
	 */
	hide() {
		this.container.style.display = 'none';
	}

	/**
	 * Changes the component state and re-renders affected elements
	 * @param {Object} newState - new state to be merged with the old one
	 */
	setState(newState = {}, callback) {
		// TODO:: merge nested objects
		Object.assign(this._state, newState);

		this._binding.update(this._template(this._state));
		this.emit(Component.events.UPDATE_STATE, newState);

		callback && callback()
	}

	/**
	 * Set default values.
	 * @private
	 * @param {Object} data - object with default values
	 */
	_setDefaults(data = {}) {
		Object.keys(this._defaults).forEach((key) => {
			if (data[key] === undefined) {
				data[key] = this._defaults[key];
			}
		});

		return data;
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

	/**
	 * Binds component's container to the state using the intraHtml updater
	 * @private
	 */
	_bindState() {
		this._binding = intraHTML.updater(this.container);
		this.setState(this._data, () => {
			this.emit(Component.events.READY);
			this.onReady();
		});
	}

	/**
	 * Set an event listener on a target
	 * and emit a custom event.
	 * @private
	 * @param {Object} params - listener parameters
	 */
	_setListener(params) {
		params.target.addEventListener(params.type, (e) => {
			if (params.isPrevented) {
				e.stopPropagation();
			}

			if (params.callback) {
				params.callback(e);
			}

			this.emit(params.event, params.data);
		}, params.isCaptured);
	}

	/**
	 * Appends a component container to the current component
	 */
	appendComponent(selector, component) {
		const target = this.container.querySelector(selector);

		target.appendChild(component.container);
	}

	/**
	 * @return {Object} - current state
	 */
	get state() {
		return this._state;
	}

	/**
	 * @return {string} - current name
	 */
	get name() {
		return this._name;
	}

	/**
	 * @return {string} - default values
	 */
	get defaults() {
		return this._defaults;
	}

}

Component.events = events;

module.exports = Component;
