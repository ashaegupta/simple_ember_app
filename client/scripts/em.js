// SETUP

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


// ROUTER

App.Router.map(function() {
	this.route('movies');
	this.route('movie', { path: '/movies/:movie_id' });
});

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


// MODEL

App.Movie = DS.Model.extend({
	name: DS.attr('string'),
	rating: DS.attr('string'),

	mustSee: function() {
		return (Number(this.get('rating')) == 5);
	}.property('rating')

});


// CONTROLLERS

App.MoviesController = Ember.ArrayController.extend({});

App.CreateMovieController = Ember.Controller.extend({
	submit: function(){
		var movie = App.Movie.createRecord(this);
    movie.get('transaction').commit();
	}
});