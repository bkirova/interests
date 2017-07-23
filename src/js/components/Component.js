const EventEmitter = require('events').EventEmitter;

class Component extends EventEmitter {


	constructor(name, data) {
		super();

        this.name = name;
        this.data = data;


        /*
        * Check if user exist
        */
        _getUser() {
            /* check database for currentUser */
        }

        /*
        * Login User
        */
        _logIn() {
                /*
                * use this._getUser()
                * if exist redirect to user Account page
                * else _this._register()
                */
            }
        }

        /*
        * Register User
        */
        _register() {
            /*
            * I think we need to create Form Component and use it here
            */
        }

        /*
        * Get user data
        */
        _getUserData() {
            /*
            * Check database for currentUser data and render this data
            */
        }

        /*
        * Get user interests
        */
        _getInteresets() {

        }

        /*
        * Create new interest
        */
        _setInterest() {

        }

        /*
        * Get All latest interesets that match users inteterests
        */
        _getLatestInterest() {
            /*
            * Check database for latest interesets that matched users interesets
            * this._getInteresets() usage here
            */
        }

        /*
        * Update state
        */
        _setState() {

        }

        /*
        * Render User
        */
        _render() {

        }



	}


}

module.exports = Component;
