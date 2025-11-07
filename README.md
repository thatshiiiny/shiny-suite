# Shiny Suite

A web-based shiny hunting assistant that helps track encounters and calculate Shiny Pokémon odds across multiple games and hunting methods.

## Features

- **Multi-Generation Support**: Track shiny hunts across games from Gen 2 (Gold/Silver/Crystal) through Gen 9 (Scarlet/Violet)
- **Multiple Hunting Methods**:
  - Standard encounters
  - Masuda Method
  - Poké Radar chaining
  - Chain Fishing
- **Automatic Chain Tracking**: Chain counter automatically increments with encounters for radar and fishing methods
- **Shiny Charm Support**: Toggle Shiny Charm for games that support it, with automatic odds calculation
- **Pokémon Search**: Look up any Pokémon and view their shiny sprites, including gender differences and back sprites, as well as their type.
- **Real-time Odds Calculation**: Odds update automatically based on selected game, method, charm status, and chain length

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python, Flask
- **API**: PokeAPI for Pokémon data
- **Data Storage**: JSON for game configuration

## Setup Instructions

### Prerequisites
- Python 3.x installed on your system

### Installation

1. Clone or download this repository

2. Navigate to the project directory:
   ```bash
   cd ShinySuite
   ```

3. Install Flask (if not already installed):
   ```bash
   pip3 install flask flask-cors
   ```

### Running the Application

You need to run two servers:

1. **Start the Flask backend** (in one terminal window):
   ```bash
   python3 backend/app.py
   ```
   This runs on `http://localhost:5001`

2. **Start the HTTP server** (in a second terminal window):
   ```bash
   python3 -m http.server 8000
   ```

3. **Open your browser** and go to:
   ```
   http://localhost:8000
   ```

## How to Use

1. **Select your game** from the dropdown menu
2. **Choose a hunting method**:
   - None: Standard encounters
   - Masuda Method: For breeding hunts
   - Poké Radar: For chaining encounters (Gen 4 and Gen 6)
   - Chain Fishing: For fishing chains (Gen 6+)
3. **Toggle Shiny Charm** if you have it (only available for supported games)
4. **Track your encounters**: Click the + button to increment your encounter count
   - For Radar and Fishing methods, the chain counter will automatically increment with encounters
5. **Reset chain** if your chain breaks (the encounter counter will continue)
6. **Search for Pokémon** to view their shiny forms and see where they can be found

## Project Structure

```
ShinySuite/
├── index.html          # Main HTML structure
├── style.css           # Styling
├── script.js           # Frontend JavaScript logic
├── gameData.json       # Game odds and feature data
├── backend/
│   └── app.py         # Flask API server
└── README.md          # This file
```

## Planned Features

- More hunting methods
- Location data with game-specific filtering
- Interactive game maps with spawn locations
- Session history and statistics
- Export hunt data


## Notes

- Make sure both servers are running for full functionality
- The Flask backend handles Pokemon API requests
- The HTTP server serves the frontend files and allows proper JSON loading
