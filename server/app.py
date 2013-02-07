#!/usr/bin/python
# -*- coding: utf-8 -*-

""" 
    A simple API server, 
    serving up movie information.

    Shreyans Bhansali, 6 February 2013
    Public domain

"""

import os
import ujson as json

from flask import Flask, render_template, request
from model import Movie

#
# set up the flask app
#

static_folder = os.path.abspath(os.path.join(__file__, "../..", "client"))
app = Flask(__name__, static_folder=static_folder)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def get_home(path):
    """ Return the base Ember template for '/' and all unknown routes
    """
    return render_template("ember.html")

#
# The API
#

@app.route("/api/movies", methods=["GET"])
def get_movie():
    """ Return a list of all movies, under the key 'movie'
    """
    movies = Movie.all()
    return json.dumps({ 'movies': movies }), 200

@app.route("/api/movies", methods=["POST"])
def post_movie():
    """ Add a movie to the database
    """
    data = json.loads(request.data)
    movie = data.get('movie')

    name, rating = movie.get("name"), movie.get("rating")
    if not (name and rating):
        return json_error("please pass in both a :name and a :rating")

    _id = Movie.create(name, rating)
    if not _id:
        return json_error("couldn't add movie")

    return json.dumps({
        'movie': { 'id': _id }
    }), 200

@app.route("/api/movies/<movie_id>", methods=["GET"])
def get_movie_by_id(movie_id):
    """ Return the data for a single movie
    """
    movie = Movie.find_by_id(movie_id)
    if not movie:
        return json_error("couldn't find %s" % movie_id)

    json.dumps({ 'movie': movie }), 200

def json_error(msg):
    return json.dumps({'error': msg}), 400


if __name__ == "__main__":
    """ start the app 
    """
    app.run(debug=True)
