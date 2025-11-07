const gameSelector = document.getElementById('game')
const oddsDisplay = document.getElementById('shiny-odds')
const countUp = document.getElementById('counter')
const chainUp = document.getElementById('chain-counter')
const incrementButton = document.getElementById('increment-btn')
const decrementButton = document.getElementById('decrement-btn')
const resetButton = document.getElementById('reset-btn')
const incrementChain = document.getElementById('increment-chain-btn')
const decrementChain = document.getElementById('decrement-chain-btn')
const resetChain = document.getElementById('reset-chain-btn')
const radarOdds = document.getElementById('radar-odds')
const shinyCharmSection = document.getElementById('shiny-charm-section')
const shinyCharmCheckbox = document.getElementById('shiny-charm-checkbox')
const methodNone = document.getElementById('method-none')
const methodMasuda = document.getElementById('method-masuda')
const methodRadar = document.getElementById('method-radar')
const methodFishing = document.getElementById('method-fishing')
const pokemonSearch = document.getElementById('pokemon-search-field')
const searchButton = document.getElementById('search-button')
const searchResults = document.getElementById('search-results')
const suggestions = document.getElementById('suggestions')

let pokemonList = []
let gameData = {}

async function loadGameData() {
    const response = await fetch('gameData.json')
    gameData = await response.json()
}

let encounterCount = 0;

function incrementCounter() {
    encounterCount++
    countUp.textContent = encounterCount

    // If radar or fishing is active, also increment chain
    const selectedMethod = document.querySelector('input[name="hunting-method"]:checked').value
    const isRadarActive = selectedMethod === 'radar'
    const isFishingActive = selectedMethod === 'fishing'

    if (isRadarActive || isFishingActive) {
        chainCount++
        chainUp.textContent = chainCount
        updateGameInfo()  // Update odds display
    }
}

function decrementCounter() {
    if (encounterCount > 0) {
    encounterCount--
    countUp.textContent = encounterCount
    }
}

let chainCount = 0;

function incrementChainCounter() {
    chainCount++
    chainUp.textContent = chainCount
    updateGameInfo()
}

function decrementChainCounter() {
    if (chainCount > 0) {
    chainCount--
    chainUp.textContent = chainCount
    }
    updateGameInfo()
}

function resetCounter() {
    encounterCount = 0
    countUp.textContent = encounterCount
}

function resetChainCounter() {
    chainCount = 0
    chainUp.textContent = chainCount
    updateGameInfo()
}

function updateGameInfo() {
    const selectedGame = gameSelector.value
    const game = gameData[selectedGame]

    // Safety check - if game data hasn't loaded yet, exit early
    if (!game) {
        return
    }

    const isCharmActive = shinyCharmCheckbox.checked

    // Check which hunting method is selected
    const selectedMethod = document.querySelector('input[name="hunting-method"]:checked').value
    const isMasudaActive = selectedMethod === 'masuda'
    const isRadarActive = selectedMethod === 'radar'
    const isFishingActive = selectedMethod === 'fishing'
    
    console.log(gameData[selectedGame])

    if (isCharmActive && isMasudaActive) {
        oddsDisplay.textContent = game.masudaCharmOdds
    } else if (isMasudaActive) {
        oddsDisplay.textContent = game.masudaOdds
    } else if (isCharmActive) {
        oddsDisplay.textContent = game.charmOdds
    } else {
        oddsDisplay.textContent = game.odds
    }

// Chaining Methods

    if (isRadarActive || isFishingActive) {
        let odds;

        if (isFishingActive) {
            // Chain Fishing odds (Gen 6+)
            // each chain adds +2 bonus shiny rolls (max of +40 at chain 20)
            
        let bonusRolls = Math.min(chainCount * 2, 40)
        let charmBonus = isCharmActive ? 2 : 0
        let totalRolls = 1 + bonusRolls + charmBonus
    
        let denominator = Math.floor(4096 / totalRolls)
        odds = `1/${denominator}`
        }
        else {
            // Poke Radar odds based on chain length
            // Gen 6 (X/Y) has different odds than Gen 4
            const isGen6 = selectedGame === 'x' || selectedGame === 'y'

            if (isGen6) {
                // Gen 6 Poke Radar odds
                if (chainCount === 0) odds = '1/4096'
                else if (chainCount < 10) odds = '1/1024'
                else if (chainCount < 20) odds = '1/512'
                else if (chainCount < 30) odds = '1/341'
                else if (chainCount < 40) odds = '1/200'
                else odds = '1/99'
            } else {
                // Gen 4 Poke Radar odds
                if (chainCount === 0) odds = '1/8192'
                else if (chainCount < 10) odds = '1/3276'
                else if (chainCount < 20) odds = '1/1638'
                else if (chainCount < 30) odds = '1/1024'
                else if (chainCount < 40) odds = '1/528'
                else odds = '1/200'
            }
        }

        radarOdds.textContent = odds
    }

    // Show/hide method radio buttons based on game support
    if (game.hasMasuda) {
        methodMasuda.parentElement.style.display = 'block'
    } else {
        methodMasuda.parentElement.style.display = 'none'
        if (selectedMethod === 'masuda') methodNone.checked = true
    }

    if (game.hasRadar) {
        methodRadar.parentElement.style.display = 'block'
    } else {
        methodRadar.parentElement.style.display = 'none'
        if (selectedMethod === 'radar') methodNone.checked = true
    }

    if (game.hasFishing) {
        methodFishing.parentElement.style.display = 'block'
    } else {
        methodFishing.parentElement.style.display = 'none'
        if (selectedMethod === 'fishing') methodNone.checked = true
    }

    // Show/hide radar odds display based on selected method
    const radarOddsSection = document.querySelector('.radar-odds-display')
    if (isRadarActive || isFishingActive) {
    radarOddsSection.style.display = 'block'
    } else {
    radarOddsSection.style.display = 'none'
    }

    if (game.hasCharm) {
        shinyCharmSection.style.display = 'block'
    } else {
        shinyCharmSection.style.display = 'none'
    }

}

async function searchPokemon() {
    const pokemonName = pokemonSearch.value
    const response = await fetch(`http://localhost:5001/api/pokemon/${pokemonName}`)
    const data = await response.json()
    console.log(data)

    let html = `<h3>${data.name}</h3>`
    if (data.shiny_sprite) {
    html += `<img src="${data.shiny_sprite}" alt="Shiny Front">`
    }
    if (data.back_sprite) {
    html += `<img src="${data.back_sprite}" alt="Shiny Back">`
    }

    if (data.shiny_female_sprite) {
    html += `<img src="${data.shiny_female_sprite}" alt="Shiny Female Front">`
    }
    if (data.female_back_sprite) {
    html += `<img src="${data.female_back_sprite}" alt="Shiny Female Back">`
    }

// Type Sprite

    if (data.types && data.types.length > 0) {
    html += `<div class="types">`
    data.types.forEach(type => {
        html += `<img src="https://www.serebii.net/pokedex-bw/type/${type}.gif" alt="${type}" class="type-sprite">`
    })
    html += `</div>`
}


    searchResults.innerHTML = html
}

incrementButton.addEventListener('click', incrementCounter)
decrementButton.addEventListener('click', decrementCounter)
resetButton.addEventListener('click', resetCounter)
incrementChain.addEventListener('click', incrementChainCounter)
decrementChain.addEventListener('click', decrementChainCounter)
resetChain.addEventListener('click', resetChainCounter)
gameSelector.addEventListener('change', updateGameInfo)
shinyCharmCheckbox.addEventListener('change', updateGameInfo)
methodNone.addEventListener('change', updateGameInfo)
methodMasuda.addEventListener('change', updateGameInfo)
methodRadar.addEventListener('change', updateGameInfo)
methodFishing.addEventListener('change', updateGameInfo)
searchButton.addEventListener('click', searchPokemon)
pokemonSearch.addEventListener('input', showSuggestions)

async function pokemonSuggest() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1500')
    const data = await response.json()
    console.log(data)
    pokemonList = data.results.map(pokemon => pokemon.name)
}

// TO DO // make this only show up when something is actually typed

function showSuggestions() {
    const userInput = pokemonSearch.value.toLowerCase()
    const filtered = pokemonList.filter(pokemon => {
        return pokemon.startsWith(userInput)
    })
    const limitedResults = filtered.slice(0, 10)
    console.log(limitedResults)
    suggestions.innerHTML = limitedResults.map(pokemon => {
    return `<div class="suggestion-item" onclick="selectPokemon('${pokemon}')">${pokemon}</div>`
}).join('')
}

function selectPokemon(name) {
    pokemonSearch.value = name
    suggestions.innerHTML = ''
    searchPokemon()
}

async function initialize() {
    await loadGameData()
    pokemonSuggest()
    updateGameInfo()
}

initialize()
