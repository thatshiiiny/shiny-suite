from flask import Flask
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/pokemon/<name>')

def pokemon(name):
    response = requests.get(f'https://pokeapi.co/api/v2/pokemon/{name}')

    if response.status_code != 200:
        return {'error': 'Pokemon not found'}, 404
    else:
        data = response.json() 
        return {
        'name': data['name'],
        'shiny_sprite': data['sprites']['front_shiny'],
        'back_sprite': data ['sprites']['back_shiny'],
        'shiny_female_sprite': data['sprites']['front_shiny_female'],
        'female_back_sprite': data['sprites']['back_shiny_female'],
        'types': [t['type']['name'] for t in data['types']] #list comprehension
        }

if __name__ == '__main__':
    app.run(debug=True, port=5001)
