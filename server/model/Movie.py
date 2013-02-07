# -*- coding: utf-8 -*-

"""
    The model, the layer between the API server and the database.
    Connect to a local MongoDB instance, and perform operations
    on the collection 'movie' in the database 'movie'.

    Shreyans Bhansali, 6 February 2012
    Public domain

"""

from bson.objectid import ObjectId
from pymongo import MongoClient

conn = MongoClient()
db = conn.movie.movie

def all():
    movies= db.find()
    return [for_client(m) for m in movies]

def find_by_id(movie_id):
    spec = {'_id': ObjectId(movie_id)}
    return db.find_one(spec)

def create(movie):
    movie_id = db.insert(movie)
    if movie_id:
        return str(movie_id)
    return None

def for_client(movie):
    """ convert Mongo's ObjectId '_id' to a string 'id',
    so it's json 
    """
    if '_id' in movie:
        movie['id'] = str(movie.pop('_id'))
    return movie
