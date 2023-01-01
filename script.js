const img = $('img');
const title = $('#title');
const artist = $('#artist');
const music = $("audio");
const prevBtn = $('#prev');
const playBtn = $('#play');
const nextBtn = $('#next');
const progressContainer = $("#progress-container");
const progress = $("#progress");
const currentTimeSpan = $("#current-time");
const durationSpan = $('#duration');

// music array
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill',
        artist: 'some one'
    },
    {
        name: 'jacinto-2',
        displayName: 'Electric Chill2',
        artist: 'some one2'
    },
    {
        name: 'jacinto-3',
        displayName: 'Electric Chill3',
        artist: 'some one'
    },
    {
        name: 'metric-1',
        displayName: 'Electric Chill4',
        artist: 'some one'
    }
];

let isPlaying = false;
//play song func
function playSong() {
    isPlaying = true;
    playBtn.addClass('fa-pause').removeClass('fa-play');
    music.trigger('play');
}
function pauseSong() {
    isPlaying = false;
    playBtn.addClass('fa-play').removeClass('fa-pause');
    music.trigger('pause');
}

// adding eventlistener for the pause and play 
playBtn.click(() => (isPlaying ? pauseSong() : playSong()));

//update dom 
function loadSong(songs) {
    title.html(songs.displayName);
    artist.html(songs.artist);
    music.attr('src', `music/${songs.name}.mp3`);
    img.attr('src', `img/${songs.name}.jpg`);
}

let songIndex = 0;

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.currentTarget;
        // console.log(duration,currentTime);
        const progressPercent = (currentTime / duration) * 100;
        progress.css('width', `${progressPercent}%`);
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        if (durationSeconds) {
            durationSpan.html(`${durationMinutes}:${durationSeconds}`);
        }
        // current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        if (currentSeconds) {
            currentTimeSpan.html(`${currentMinutes}:${currentSeconds}`);
        }
    }
}
function setProgressBar(e) {
    const width = this.clientWidth;
    // console.log(width);
    const clickX = e.offsetX;
    const { duration } = music[0];
    // console.log(clickX/width);
    music[0].currentTime = ((clickX / width) * duration);
}
prevBtn.click(prevSong);
nextBtn.click(nextSong);
music.bind('timeupdate', updateProgressBar);
music.bind('ended', nextSong);
progressContainer.click(setProgressBar);