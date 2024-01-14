const songName = document.querySelector("#song-name")
const bandName = document.querySelector("#band-name")
const song = document.querySelector("#audio")
const cover = document.querySelector("#cover")
const play = document.querySelector("#play")
const next = document.querySelector("#next")
const previous = document.querySelector("#previous")
const currentProgress = document.querySelector("#current-progress")
const progressContainer = document.querySelector("#progress-container")
const shuffleButton = document.querySelector("#shuffle")
const repeatButton = document.querySelector("#repeatBtn")





const asYouWere = {
    songName: "As You Were",
    artist: "TrackTribe",
    file: "as_you_were"
}
const boomBapFlick = {
    songName: "Boom Bap Flick",
    artist: "Quincas Moreira",
    file: "boom_bap_flick"
}
const cantHide = {
    songName: "Can't Hide", /* 'can\'t hide'  => caso de aspas simples*/
    artist: "Otis McDonald",
    file: "cant_hide"
}

let isPlaying = false
let isShuffle = false
let repeatOn = false

const originalPlaylist = [asYouWere, boomBapFlick, cantHide]
let sortedPlaylist = [...originalPlaylist]

let index = 0



function playSong() {
    play.querySelector(".bi").classList.remove("bi-play-circle-fill")
    play.querySelector(".bi").classList.add("bi-pause-circle-fill")
    song.play()
    isPlaying = true
}

function pauseSong() {
    play.querySelector(".bi").classList.remove("bi-pause-circle-fill")
    play.querySelector(".bi").classList.add("bi-play-circle-fill")
    song.pause()
    isPlaying = false
}

function playPauseDecider() {
    if (isPlaying === true) {
        pauseSong()
    } else {
        playSong()
    }
}

function initializeSong() {
    cover.src = `imagens/${sortedPlaylist[index].file}.webp`
    song.src = `songs/${sortedPlaylist[index].file}.mp3`
    songName.innerText = sortedPlaylist[index].songName
    bandName.innerText = sortedPlaylist[index].artist
}

function previousSong() {
    if (index === 0) {
        index = sortedPlaylist.length - 1
    } else {
        index -= 1
    }

    initializeSong()
    playSong()
}

function nextSong() {
    if (index === sortedPlaylist.length - 1) {
        index = 0
    } else {
        index += 1
    }

    initializeSong()
    playSong()
}

function updateProgressBar() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`)
}

function jumpTo(event) {
    const clickPosition = event.offsetX
    const width = progressContainer.clientWidth
    const jumpToTime = (clickPosition / width) * song.duration
    song.currentTime = jumpToTime
}

function shufflePlaylist(preShufflePlaylist) {
    const size = preShufflePlaylist.length
    let currentIndex = size - 1
    while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random() * size)
        let aux = preShufflePlaylist[currentIndex]
        preShufflePlaylist[currentIndex] = preShufflePlaylist[randomIndex]
        preShufflePlaylist[randomIndex] = aux
        currentIndex -= 1
    }
}

function shuffleButtonClicked() {
    if (isShuffle === false) {
        isShuffle = true
        shufflePlaylist(sortedPlaylist)
        shuffleButton.classList.add("button-active")
    } else {
        isShuffle = false
        sortedPlaylist = [...originalPlaylist]
        shuffleButton.classList.remove("button-active")
    }
}

function repeatButtonClicked() {
    if (repeatOn === false) {
        repeatOn = true
        repeatButton.classList.add("button-active")
    } else {
        repeatOn = false
        repeatButton.classList.remove("button-active")
    }
}

function nextOrRepeat(){
    if(repeatOn === false){
        nextSong()
    } else {
        playSong()
    }
}



initializeSong()



play.addEventListener('click', playPauseDecider)
previous.addEventListener('click', previousSong)
next.addEventListener('click', nextSong)
song.addEventListener('timeupdate', updateProgressBar)
song.addEventListener('ended', nextOrRepeat)
progressContainer.addEventListener('click', jumpTo)
shuffleButton.addEventListener('click', shuffleButtonClicked)
repeatButton.addEventListener('click', repeatButtonClicked)