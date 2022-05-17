// Songs
const songs = [
    {
        img: "https://www.rafaelalucas.com/dailyui/9/covers/jain.jpg",
        artistName: "Jain",
        songName: "Makeba",
        song: "https://www.rafaelalucas.com/dailyui/9/songs/song1.mp3",
        color: "#f5c63d"
    },
    {
        img: "https://www.rafaelalucas.com/dailyui/9/covers/ohland.jpg",
        artistName: "Oh Land",
        songName: "Postpone the Bad",
        song: "https://www.rafaelalucas.com/dailyui/9/songs/song2.mp3",
        color: "#afc5c3"
    },
    {
        img: "https://www.rafaelalucas.com/dailyui/9/covers/angele.jpg",
        artistName: "Angèle",
        songName: "La Loi de Murphy",
        song: "https://www.rafaelalucas.com/dailyui/9/songs/song3.mp3",
        color: "#74c2dd"
    },
    {
        img: "https://www.rafaelalucas.com/dailyui/9/covers/broods.jpg",
        artistName: "Broods",
        songName: "Bridges",
        song: "https://www.rafaelalucas.com/dailyui/9/songs/song1.mp3",
        color: "#a3b8b0"
    },
    {
        img: "https://www.rafaelalucas.com/dailyui/9/covers/alice.jpg",
        artistName: "Alice Phoebe Lou",
        songName: "Orbit",
        song: "https://www.rafaelalucas.com/dailyui/9/songs/song2.mp3",
        color: "#38736d"
    },
    {
        img: "https://www.rafaelalucas.com/dailyui/9/covers/feist.jpg",
        artistName: "Feist",
        songName: "The Bad in Each Other",
        song: "https://www.rafaelalucas.com/dailyui/9/songs/song3.mp3",
        color: "#a4b1b2"
    },

    {
        img: "https://www.rafaelalucas.com/dailyui/9/covers/dagny.jpg",
        artistName: "Dagny",
        songName: "Ultraviolet",
        song: "https://www.rafaelalucas.com/dailyui/9/songs/song1.mp3",
        color: "#8098ce"
    },
    {
        img: "https://www.rafaelalucas.com/dailyui/9/covers/sigrid.jpg",
        artistName: "Sigrid",
        songName: "Dynamite",
        song: "https://www.rafaelalucas.com/dailyui/9/songs/song2.mp3",
        color: "#1a91bd"
    }
];

// Music Groups
const groups = [
    {
        title: "Songs",
        img: "https://www.rafaelalucas.com/dailyui/9/covers/img06.jpg"
    },
    {
        title: "Artists",
        img: "https://www.rafaelalucas.com/dailyui/9/covers/img07.jpg"
    },
    {
        title: "Playlists",
        img:
            "https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=400"
    },
    {
        title: "Favourites",
        img: "https://www.rafaelalucas.com/dailyui/9/covers/img10.jpg"
    }
];

// Playlists
const playlists = [
    {
        title: "Pop Music",
        img:
            "https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=400"
    },
    {
        title: "On the road!",
        img:
            "https://images.pexels.com/photos/3049327/pexels-photo-3049327.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=400"
    },
    {
        title: "Christmas Songs",
        img:
            "https://images.pexels.com/photos/1661905/pexels-photo-1661905.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=400"
    },
    {
        title: "Rainy days",
        img:
            "https://images.pexels.com/photos/216657/pexels-photo-216657.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=400"
    }
];

const audio = document.querySelector('.audio');
const volume = document.querySelector('.volume');
const progress = document.querySelector('.progress');
const progressRange = document.querySelector('.player input');
const play_pause = document.querySelector('.play_pause');
const currentTime = document.querySelector('.player span')
const endTime = document.querySelector('.player span:last-child')

const song_list = document.querySelector('.song_list');

(() => {
    let html = ""
    songs.forEach(song => {
        html += `
        <div class="song" data-song=${song.song}>
            <h6>${song.songName}</h6>
        </div>
        `
    })
    song_list.innerHTML = html;
})();

const allSongs = document.querySelectorAll('.song');

allSongs.forEach(song => {
    song.addEventListener('click', (e) => {
        allSongs.forEach(song => song.classList.remove('selected_song'))
        song.classList.add('selected_song')
        changeSong(song.getAttribute('data-song'));
    })
})

let is_playing = false;

const playPause = () => {
    if (is_playing) {
        // pause
        audio.pause();
        is_playing = false;
        play_pause.innerHTML = 'Play';
    } else {
        // play
        audio.play()
        is_playing = true;
        play_pause.innerHTML = 'Pause';
    }
}

play_pause.addEventListener('click', playPause)

//format current/duration time
const timeFormat = (time) => {
    return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
}

// Set Start and end time 
audio.addEventListener('loadedmetadata', () => {
    endTime.innerHTML = timeFormat(audio.duration)
    currentTime.innerHTML = timeFormat(audio.currentTime)
    progressRange.setAttribute('max', audio.duration)
})

// Update progress
const updateProgress = () => {
    progress.style.left = `
        ${(audio.currentTime / audio.duration) * 100}% 
    `
}

// Update current time
audio.addEventListener('timeupdate', () => {
    currentTime.innerHTML = timeFormat(audio.currentTime)
    updateProgress()
})

// Update volume
volume.addEventListener('change', (e) => {
    audio.volume = e.target.value / 100;
})

// Seek audio
progressRange.addEventListener('change', (e) => {
    audio.currentTime = e.target.value
})

const changeSong = (src) => {
    audio.src = src;
    progressRange.setAttribute('value', 0)
    is_playing = false;
    playPause();
}