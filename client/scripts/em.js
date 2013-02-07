window.App = Ember.Application.create();

App.Router = Ember.Router.extend({
    location: 'history',
});

App.Router.map(function() {
	this.route('movies');
})