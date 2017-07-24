const EventEmitter = require('events').EventEmitter;

class Component extends EventEmitter {

	constructor(name, data) {
		super();

        this.name = name;
        this.data = data;
	}

    _render() {
        
    }
}

module.exports = Component;
