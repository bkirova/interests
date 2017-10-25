const Client = require('./Client');
const template = require('../templates/App.hbs');
const TopBar = require('./components/extended/TopBar');
const Board = require('./components/extended/Board');
const BottomBar = require('./components/extended/BottomBar');
const Modal = require('./components/basic/Modal');
const SignInModal = require('./components/extended/SignInModal');
const RegisterModal = require('./components/extended/RegisterModal');
const CardModal = require('./components/extended/CardModal');
const SettingsModal = require('./components/extended/SettingsModal');

class App {

	components = {
		modals: {},
		contents: {}
	};

	constructor() {
		this._client = new Client({});

		this._render();
		this._init();
	}

	_render() {
		this._renderTemplate();
		this._registerComponents();
		this._appendComponents();
		this._suscribeComponents();
	}

	_init(logged) {
		let response = this._client.get('settings');

		//if(response.success) {
		if(logged) {	
			this._data = response.data;
			this._updateContents();
			this.signInModal.hide();
			this._showContents();
		} else {
			this._reset();
			this.signInModal.show();
		}
	}

	_renderTemplate() {
		this.container = document.createElement('div');
		this.container.className = 'app-container';
		this.container.innerHTML = template();
	}

	_registerComponents() {
		this.components.modals.signIn = new SignInModal({title: 'SignIn', hasOverlay: true});
		this.components.modals.register = new RegisterModal({title: 'Register'});
		this.components.modals.card = new CardModal({title: 'Card'});
		this.components.modals.settings = new SettingsModal({title: 'Settings'});
		this.components.modals.notification = new Modal({data: {title: 'Notification'}});
		this.components.contents.topBar = new TopBar({});
		this.components.contents.board = new Board({});
		this.components.contents.bottomBar = new BottomBar({});
	}

	_appendComponents() {
		Object.keys(this.components.modals).forEach((key) => {
			let component = this.components.modals[key];
			this.modalsContainer.appendChild(component.container);
			component.hide();
		});

		Object.keys(this.components.contents).forEach((key) => {
			let component = this.components.contents[key];
			this.contentsContainer.appendChild(component.container);
			component.hide();
		});
	}

	_suscribeComponents() {
		this.signInModal.on(SignInModal.events.SUCCESS, () => {
			this._init(true);
		});

		this.cardModal.on(CardModal.events.ADD, (data) => {
			this._client.post('add_event', data);
			this.cardModal.hide();
			this._init(true);
		});

		this.topBar.on(TopBar.events.NEW, () => {
			this.cardModal.show();
		});

		this.topBar.on(TopBar.events.SIGNOUT, () => {
			this._signout();
		});

		this.topBar.on(TopBar.events.SETTINGS, () => {
			this.settingsModal.show();
		});

		this.board.on(Board.events.JOIN, (data) => {
			this._client.post('join_event', {card: data, user: this._data.user});
			this._init(true);
			this.notifictionModal.update({title: 'sussecesss'});
			this.notifictionModal.show();
		});

		this.board.on(Board.events.EDIT, () => {
			this.cardModal.show();
		});
	}

	_reset() {
		this._data = {};
	}

	_signout() {
		this._reset();
		this._hideContents();
		this.signInModal.show();
	}

	_updateContents(data) {
		this.topBar.update({user:this._data.user});
		this.board.update({cards:this._data.cards});
	}

	_showContents() {
		this.topBar.show();
		this.board.show();
		this.bottomBar.show();
	}

	_hideContents() {
		this.topBar.hide();
		this.board.hide();
		this.bottomBar.hide();
	}

	get topBar() {
		return this.components.contents.topBar;
	}

	get board() {
		return this.components.contents.board;
	}

	get bottomBar() {
		return this.components.contents.bottomBar;
	}

	get signInModal() {
		return this.components.modals.signIn;
	}

	get registerModal() {
		return this.components.modals.register;
	}

	get cardModal() {
		return this.components.modals.card;
	}

	get settingsModal() {
		return this.components.modals.settings;
	}

	get notifictionModal() {
		return this.components.modals.notification;
	}

	get contentsContainer() {
		return this.container.querySelector('.content');
	}

	get modalsContainer() {
		return this.container.querySelector('.modals');
	}
}

module.exports = App;
