const songName = document.querySelector("#song-name")
const bandName = document.querySelector("#band-name")
const song = document.querySelector("#audio")
const cover = document.querySelector("#cover")
const play = document.querySelector("#play")
const next = document.querySelector("#next")
const previous = document.querySelector("#previous")

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

const playlist = [asYouWere, boomBapFlick, cantHide]

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

function initializeSong(){
    cover.src = `imagens/${playlist[index].file}.webp`
    song.src = `songs/${playlist[index].file}.mp3`
    songName.innerText = playlist[index].songName
    bandName.innerText = playlist[index].artist
}

function previousSong() {
    if( index === 0){
        index = playlist.length - 1
    } else {
        index -= 1
    }

    initializeSong()
    playSong()
}

function nextSong() {
    if( index === playlist.length - 1){
        index = 0
    } else {
        index += 1
    }

    initializeSong()
    playSong()
}
initializeSong()

play.addEventListener('click', playPauseDecider)
previous.addEventListener('click', previousSong)
next.addEventListener('click', nextSong)