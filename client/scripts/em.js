window.App = Ember.Application.create();

// Use the history api so we don't need to include # in urls
App.Router = Ember.Router.extend({
    location: 'history',
});

// Use ember-data's RESTAdapter to sync with backend
// prefix all routes with 'api'
App.Store = DS.Store.extend({
    revision: 11,
    adapter: DS.RESTAdapter.create({
        namespace: 'api'
    })    
});

App.Movie = DS.Model.extend({
	name: DS.attr('string'),
	rating: DS.attr('number'),

	mustSee: function() {
		return (rating == 5)
	}.property('rating')

});

App.Router.map(function() {
	this.route('movies');
});
