#!/usr/bin/python3
""" Start Flask Web Application """
from models import storage
from models.state import State
from models.amenity import Amenity
from models.place import Place
import uuid
from flask import Flask, render_template
app = Flask(__name__)


@app.teardown_appcontext
def close_db(error):
    """ close SQLAlchemy Session """
    storage.close()


@app.route('/1-hbnb', strict_slashes=False)
def hbnb():
    """ wake hbnb """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    lista = []

    for state in states:
        lista.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)

    return render_template('1-hbnb.html',
                           states=lista,
                           amenities=amenities,
                           places=places,
                           cache_id=uuid.uuid4())


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
