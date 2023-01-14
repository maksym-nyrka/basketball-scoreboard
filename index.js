let timerEl = document.getElementById("timer")
let startEl = document.getElementById("start-btn")
let periodInfoEl = document.getElementById("period-info")

let homeScoreEl = document.getElementById("home-score")
let guestScoreEl = document.getElementById("guest-score")
let homeScore = 0
let guestScore = 0

const TOTAL_GAME_SECONDS = 12*60
let currentSeconds = TOTAL_GAME_SECONDS

let period = 1

function renderGame() {
    renderTimer()
    renderPeriod()
}

function renderTimer() {
    currentSeconds --
    let minutes = Math.floor(currentSeconds / 60)
    let seconds = currentSeconds % 60

    if(minutes < 10) {
        minutes = "0" + minutes
    }
    if(seconds < 10) {
        seconds = "0" + seconds
    }

    timerEl.textContent = minutes + ":" + seconds
}

function renderPeriod() {
    if(currentSeconds == 0) {
        if (period <=3) {
            period++
            clearInterval(timerInterval)
            startEl.textContent = "RESUME PERIOD " + period
            currentSeconds = TOTAL_GAME_SECONDS
        } else if (period == 4) {
            startEl.textContent = "GAME IS OVER"
            clearInterval(timerInterval)
        }
    }
}

let timerInterval
function manageGame() {
    if(startEl.textContent == "START GAME") {
        timerInterval = setInterval(renderGame, 1000)
        startEl.textContent = "PAUSE"
    } else if(startEl.textContent == "PAUSE") {
        clearInterval(timerInterval)
        startEl.textContent = "RESUME"
    } else if(startEl.textContent == "RESUME") {
        timerInterval = setInterval(renderGame, 1000)
        startEl.textContent = "PAUSE"
    } else if(startEl.textContent.startsWith("RESUME PERIOD")) {
        timerInterval = setInterval(renderGame, 1000)
        startEl.textContent = "PAUSE"
        periodInfoEl.textContent = "PERIOD " + period
    }   
}

function reset() {
    resetTimer()
    resetScores()
    resetPeriod()
    resetFouls()
}

function resetTimer() {
    currentSeconds = TOTAL_GAME_SECONDS
    startEl.textContent = "START GAME"
    timerEl.textContent = "00:00"
    clearInterval(timerInterval)
}

function resetPeriod() {
    period = 1
    periodInfoEl.textContent = "PERIOD " + period
}

function resetScores() {
    homeScore = 0
    guestScore = 0
    homeScoreEl.textContent = homeScore
    guestScoreEl.textContent = guestScore
}

function addHome(number) {
    homeScore += number
    homeScoreEl.textContent = homeScore
}

function addGuest(number) {
    guestScore += number
    guestScoreEl.textContent = guestScore
}

class Player {
    PFCount = 0
    TFCount = 0
    docId

    constructor(docId) {
        this.docId = docId;
      }

    get docEl() {
        return document.getElementById(this.docId)
    }

    addFoul(foulType) {
        if(foulType == 'PF') {
            this.PFCount++
        } else if (foulType == 'TF') {
            this.TFCount++
        }
    }

    isPlayerOut() {
        return (this.PFCount + this.TFCount) == 6 || this.TFCount == 2
    }
}

let players = [new Player("player0-info"),
                 new Player("player1-info"),
                 new Player("player2-info"),
                 new Player("player3-info"),
                 new Player("player4-info"),
                 new Player("player5-info"),
                 new Player("player6-info"),
                 new Player("player7-info"),
                 new Player("player8-info"),
                 new Player("player9-info")]

function addFoul(playerIndex, foulType) {
    let player = players[playerIndex]

    if(player.isPlayerOut()) {
        return
    }
    
    player.addFoul(foulType)
    player.docEl.textContent = " has " + player.PFCount + " PF" + ", " + player.TFCount + " TF"

    if(player.isPlayerOut()) {
        player.docEl.textContent = "Player is out."
    }
}

function resetFouls() {
    players.forEach((player) => {
        player.PFCount = 0
        player.TFCount = 0
        player.docEl.textContent = ""
    })
}