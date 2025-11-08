# Shiny Suite

A web-based shiny hunting assistant that helps track encounters and calculate Shiny Pokémon odds across multiple games and hunting methods.

## Features

- **Multi-Generation Support**: Track shiny hunts across games from Gen 2 (Gold/Silver/Crystal) through Gen 9 (Scarlet/Violet)
- **Multiple Hunting Methods**:
  - Standard encounters
  - Masuda Method 
  - Poké Radar chaining
  - Chain Fishing
  - SOS Chaining
  - Chain Catching (Let's Go!)
- **Automatic Chain Tracking**: Chain counter automatically increments with encounters using chaining methods
- **Shiny Charm Support**: Toggle Shiny Charm for games that support it to modify odds
- **Pokémon Search**: Look up any Pokémon and view their shiny sprites, including gender differences and back sprites, as well as their type
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
   cd shiny-suite
   ```

3. Install Flask:
   ```bash
   pip3 install flask flask-cors
   ```

### Running the Application

You need to run two servers:

1. **Flask backend**:
   ```bash
   python3 backend/app.py
   ```
   This runs on `http://localhost:5001`

2. **HTTP frontend**:
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
   - SOS Chaining: For chaining SOS calls (Gen 7)
   - Chain Catching: Repeatedly catching the same Pokémon (Let's Go)
3. **Toggle Shiny Charm** if you have it (only available for supported games)
4. **Track your encounters**: Click the + button to increment your encounter count
   - For Radar and Fishing methods, the chain counter will automatically increment with encounters
5. **Reset chain** if your chain breaks (the encounter counter will continue)
6. **Search for Pokémon** to view their shiny forms and see where they can be found

## Planned Features

- More hunting methods!
- Location data with game-specific filtering
- Interactive game maps with spawn locations
- Session history and statistics
- Export hunt data
