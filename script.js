const Shivers = {
    id: '0',
    songName: 'Shivers',
    artist: 'Ed Sheeran',
    album: '=',
    coverFile: 'Shivers.jpg',
    songFile: 'Shivers.mp3',
    liked: false
};
const ThatsWhatILike = {
    id: '1',
    songName: "That's What I Like",
    artist: 'Bruno Mars',
    album: '24K Magic',
    coverFile: 'ThatsWhatILike.jpg',
    songFile: 'ThatsWhatILike.mp3',
    liked: false
};
const Starboy = {
    id: '2',
    songName: 'Starboy',
    artist: 'The Weeknd',
    album: 'Starboy',
    coverFile: 'Starboy.jpg',
    songFile: 'Starboy.mp3',
    liked: false
};
const HighHopes = {
    id: '3',
    songName: 'High Hopes',
    artist: 'Panic! at the Disco',
    album: 'Pray for the Wicked',
    coverFile: 'HighHopes.jpg',
    songFile: 'HighHopes.mp3',
    liked: false
};
const Congratulations = {
    id: '4',
    songName: 'Congratulations',
    artist: ' Post Malone',
    album: 'Stoney',
    coverFile: 'Congratulations.jpg',
    songFile: 'Congratulations.mp3',
    liked: false
};


const musicLibrary = [Shivers, ThatsWhatILike, Starboy, HighHopes, Congratulations];

let songs = [...musicLibrary];

let playlist = JSON.parse(localStorage.getItem('playlist')) ?? [Shivers, ThatsWhatILike, HighHopes];

const pageBody = document.getElementById('page-body');
const searchTerm = document.getElementById('search-term');
const searchButton = document.getElementById('search-button');
const playlistElement = document.getElementById('playlist');
const startPlayerButton = document.getElementById('start-player');

function loadLibrary(){
    pageBody.innerHTML = '';
    for(let index = 0; index < musicLibrary.length; index++){
        pageBody.innerHTML += `<div class="card d-flex flex-column align-items-center" style="width: 18rem; height: 30rem;">
        <img src="Images/Covers/${songs[index].coverFile}" class="card-img-top" alt="cover"/>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${songs[index].songName}</h5>
          <p class="card-text">${songs[index].album}</p>
          <p class="card-text">${songs[index].artist}</p>
          <button class="btn btn-outline-success" onclick ="addToPlaylist('${songs[index].id}')"><i class="bi bi-plus-circle"></i></button>
        </div>
      </div>
      `;
    }
}

function loadPlaylist(){
    playlistElement.innerHTML = '';
        for (let index = 0; index < playlist.length; index++){
            playlistElement.innerHTML  += `<p id = ${playlist[index].id} class="d-flex justify-content-between border-top border-bottom align-items-center">${playlist[index].songName} - ${playlist[index].artist} <button class = "btn btn-outline-danger" onclick = "removeFromPlaylist('${playlist[index].id}')"><i class="bi bi-trash-fill"></i></button></p>`;
        }
}

function searchClick(){
    if( searchTerm === '' )return;
    songs = songs.filter((song) => song.songName.includes(searchTerm.value));
    loadLibrary();
}

function resestFilter() {
    if ( searchTerm.value !== '' ) return;
    songs = [...musicLibrary];
    loadLibrary();
}

function removeFromPlaylist(songID){
    playlist = playlist.filter(song => song.id !== songID);
    document.getElementById(songID).remove();
    updateLocalStorage();
}

function addToPlaylist(songID){
    if(playlist.find(song => song.id === songID)) return;
    const songToAdd = songs.find(x => x.id === songID);
    playlist.push(songToAdd);
    playlistElement.innerHTML  += `<p id = ${songToAdd.id} class="d-flex justify-content-between border-top border-bottom align-items-center">${songToAdd.songName} - ${songToAdd.artist} <button class = "btn btn-outline-danger" onclick = "removeFromPlaylist('${songToAdd.id}')"><i class="bi bi-trash-fill"></i></button></p>`;
    updateLocalStorage();
}

function updateLocalStorage(){
    localStorage.setItem('playlist', JSON.stringify(playlist));
}

function startPlayer(){
    location.href = 'Playerindex.html';
}

searchButton.addEventListener('click', searchClick);
searchButton.addEventListener('click', resestFilter);
startPlayerButton.addEventListener('click', startPlayer);

loadLibrary();
loadPlaylist();