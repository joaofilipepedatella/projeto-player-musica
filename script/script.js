const songName = document.querySelector("#song-name")
const bandName = document.querySelector("#band-name")
const song = document.querySelector("#audio")
const cover = document.querySelector("#cover")
const likeButton = document.querySelector("#like")
const play = document.querySelector("#play")
const next = document.querySelector("#next")
const previous = document.querySelector("#previous")
const currentProgress = document.querySelector("#current-progress")
const progressContainer = document.querySelector("#progress-container")
const shuffleButton = document.querySelector("#shuffle")
const repeatButton = document.querySelector("#repeatBtn")
const songTime = document.querySelector("#song-time")
const totalTime = document.querySelector("#total-time")



const asYouWere = {
    songName: "As You Were",
    artist: "TrackTribe",
    file: "as_you_were",
    liked: false
}
const boomBapFlick = {
    songName: "Boom Bap Flick",
    artist: "Quincas Moreira",
    file: "boom_bap_flick",
    liked: false
}
const cantHide = {
    songName: "Can't Hide", /* 'can\'t hide'  => caso de aspas simples*/
    artist: "Otis McDonald",
    file: "cant_hide",
    liked: false
}
const lazyWalk = {
    songName: "Lazy Walk",
    artist: "Cheel",
    file: "Cheel_Lazy_Walk",
    liked: false
}
const caballero = {
    songName: "Caballero",
    artist: "Ofshane",
    file: "Ofshane_Caballero",
    liked: false
}


let isPlaying = false
let isShuffle = false
let repeatOn = false

const originalPlaylist = JSON.parse(localStorage.getItem("playlist")) ?? [asYouWere, boomBapFlick, cantHide, lazyWalk, caballero]
let sortedPlaylist = [...originalPlaylist]

let index = 0




function likeButtonRender() {
    if (sortedPlaylist[index].liked === true) {
        likeButton.querySelector(".bi").classList.remove("bi-heart")
        likeButton.classList.remove("light-color")
        likeButton.querySelector(".bi").classList.add("bi-heart-fill")
        likeButton.classList.add("button-active")
    } else {
        likeButton.querySelector(".bi").classList.remove("bi-heart-fill")
        likeButton.querySelector(".bi").classList.add("bi-heart")
        likeButton.classList.add("light-color")
        likeButton.classList.remove("button-active")
    }
}

function likeButtonClicked() {
    if (sortedPlaylist[index].liked === false) {
        sortedPlaylist[index].liked = true
    } else {
        sortedPlaylist[index].liked = false
    }
    likeButtonRender()
    localStorage.setItem('playlist', JSON.stringify(originalPlaylist))
}

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
    likeButtonRender()
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

function updateProgress() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`)
    songTime.innerText = toHHMMSS(song.currentTime)

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

function nextOrRepeat() {
    if (repeatOn === false) {
        nextSong()
    } else {
        playSong()
    }
}

function toHHMMSS(originalNumber) {
    let hours = Math.floor(originalNumber / 3600)
    let min = Math.floor((originalNumber - hours * 3600) / 60)
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60)

    return `${hours !== 0 ? hours.toString().padStart(2, '0') + ":" : ""}${min
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

}

function upgradeTotalTime() {
    totalTime.innerText = toHHMMSS(song.duration)
}



initializeSong()



likeButton.addEventListener('click', likeButtonClicked)
play.addEventListener('click', playPauseDecider)
previous.addEventListener('click', previousSong)
next.addEventListener('click', nextSong)
song.addEventListener('timeupdate', updateProgress)
song.addEventListener('ended', nextOrRepeat)
song.addEventListener('loadedmetadata', upgradeTotalTime)
progressContainer.addEventListener('click', jumpTo)
shuffleButton.addEventListener('click', shuffleButtonClicked)
repeatButton.addEventListener('click', repeatButtonClicked)