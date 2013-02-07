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
		return (rating == 5);
	}.property('rating')

});

App.Router.map(function() {
	this.route('movies');
	this.route('movie', { path: '/movies/:movie_id' });
});

App.MoviesController = Ember.ArrayController.extend({});

App.MoviesRoute = Ember.Route.extend({
  model: function() {
  	return App.Movie.find();  // Return all movies when you go to the movies route
  },
  renderTemplate: function() {
	  this.render('movies');
	  this.render('createMovie', {into: 'movies', outlet:'createMovie'});
  }
});

App.MovieRoute = Ember.Route.extend({
  model: function(params) {
  	return App.Movie.find(params.movie_id);  // Return the specific movie
  }
});
