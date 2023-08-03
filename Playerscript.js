const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const likeButton = document.getElementById('like');
const currentprogress = document.getElementById('current-progress');
const progresscontainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');


const Shivers = {
    songName : 'Shivers',
    artist : 'Ed Sheeran',
    coverFile: 'Shivers.jpg',
    songFile: 'Shivers.mp3',
    liked : false,
}

const ThatsWhatILike = {
    songName : 'That \'s What I Like',
    artist : ' Bruno Mars',
    coverFile: 'ThatsWhatILike.jpg',
    songFile: 'ThatsWhatILike.mp3',
    liked : false,
}

const Starboy = {
    songName : 'Starboy',
    artist : 'The Weeknd',
    coverFile: 'Starboy.jpg',
    songFile: 'Starboy.mp3',
    liked : false,
}

const HighHopes = {
    songName : 'High Hopes',
    artist: 'Panic! at the Disco',
    coverFile: 'HighHopes.jpg',
    songFile: 'HighHopes.mp3',
    liked : false,
}

const Congratulations = {
    songName : 'Congratulations',
    artist: 'Post Malone',
    coverFile: 'Congratulations.jpg',
    songFile: 'Congratulations.mp3',
    liked : false,
}

let isPlaying = false;
let isShuffled = false;
const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [Shivers, ThatsWhatILike, Starboy, HighHopes, Congratulations];
let sortedPlaylist = [...originalPlaylist];
let index = 0;
let repeatOn = false;

function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider() {
    if(isPlaying === true){
        pauseSong();
    }
    else {
        playSong();
    }
}

function likeButtonRender() {
    if (sortedPlaylist[index].liked === true) {
      likeButton.querySelector('.bi').classList.remove('bi-heart');
      likeButton.querySelector('.bi').classList.add('bi-heart-fill');
      likeButton.classList.add('button-active');
    } else {
      likeButton.querySelector('.bi').classList.add('bi-heart');
      likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
      likeButton.classList.remove('button-active');
    }
  }

function initializeSong() {
    cover.src = `Images/Covers/${sortedPlaylist[index].coverFile}`;
    song.src = `Songs/${sortedPlaylist[index].songFile}`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    likeButtonRender();
}

function previousSong() {
    if(index === 0) {
    index = sortedPlaylist.length - 1;
    }
    else {
        index -= 1
    }
    initializeSong()
    playSong()
}

function nextSong() {
    if(index === sortedPlaylist.length - 1) {
        index = 0;
        }
        else {
            index += 1
        }
        initializeSong()
        playSong()
}

function updateProgress() {
    const barwidth = (song.currentTime/song.duration)*100;
    currentprogress.style.setProperty('--progress', `${barwidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event) {
    const width = progresscontainer.clientWidth;
    const clickposition = event.offsetX;
    const junpToTime = (clickposition/width)* song.duration;
    song.currentTime = junpToTime;
}

function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random()*size);
        let aux = preShuffleArray[currentIndex]
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleButtonClicked
() {
    if(isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    }
    else {
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active');
    }
}

function repeatButtonClicked() {
    if(repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add('button-active');
    }
    else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }
}

function nextOrRepeat() {
    if(repeatOn === false){
        nextSong();
    }
    else{
        playSong();
    }
}

function toHHMMSS(originalNumber) {
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - hours * 3600) / 60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours !== 0 ? hours.toString().padStart(2, '0') + ":" : ""}${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTotalTime() {
    totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonClicked() {
    if (sortedPlaylist[index].liked === false) {
      sortedPlaylist[index].liked = true;
    } else {
      sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist', JSON.stringify(originalPlaylist));
  }

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong)
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progresscontainer.addEventListener('click',jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);