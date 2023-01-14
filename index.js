let timerEl = document.getElementById("timer")
let startEl = document.getElementById("start-btn")
let periodInfoEl = document.getElementById("period-info")

let homeScoreEl = document.getElementById("home-score")
let guestScoreEl = document.getElementById("guest-score")
let homeScore = 0
let guestScore = 0

const TOTAL_GAME_SECONDS = 3
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
    currentSeconds = TOTAL_GAME_SECONDS
    startEl.textContent = "START GAME"
    timerEl.textContent = "00:00"
    clearInterval(timerInterval)

    homeScore = 0
    guestScore = 0
    homeScoreEl.textContent = homeScore
    guestScoreEl.textContent = guestScore

    resetPeriod()
}

function resetPeriod() {
    period = 1
    periodInfoEl.textContent = "PERIOD " + period
}

function addHome(number) {
    homeScore += number
    homeScoreEl.textContent = homeScore
}

function addGuest(number) {
    guestScore += number
    guestScoreEl.textContent = guestScore
}