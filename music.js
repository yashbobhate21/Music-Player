import {songs} from "./songs.js";

const music = document.querySelector("audio")
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const img = document.querySelector(".img")
const title = document.getElementById("title");
const artist = document.getElementById("artist");
let progress = document.getElementById("progress");
let total_duration = document.getElementById("duration")
let current_time = document.getElementById("current_time")
const Progress_div= document.getElementById("progress_div");
 

let isplaying = false;

const playmusic = () => {
    isplaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("anime");
};

const pausemusic = () => {
    isplaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    img.classList.remove("anime");
};

play.addEventListener("click",() => {
    if(isplaying){
        pausemusic();
    }else{
            playmusic();
        }
    });
const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = `songs/${songs.name}.mp3`;
    img.src = `images/${songs.name}.jpg`;
}
let Songindex = 0;

const nextSong = () => {
    Songindex = (Songindex + 1) % songs.length;
    loadSong(songs[Songindex]);
    playmusic();
};
const prevSong = () => {
    Songindex = (Songindex - 1 + songs.length) % songs.length;
    loadSong(songs[Songindex]);
    playmusic();
};
 
music.addEventListener("timeupdate", (event) => {
    const { currentTime, duration } = event.target; 
    
    let progress_time = (currentTime/duration)*100;
    progress.style.width = `${progress_time}%`;
    
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);  

    let tot_duration = `${min_duration}:${sec_duration}`;
    if(duration){
        total_duration.textContent = `${tot_duration}`
    }

    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);  

    if(sec_currentTime < 10){
      sec_currentTime = `0${sec_currentTime}`;
    }
    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
    current_time.textContent = `${tot_currentTime}`
    
});

Progress_div.addEventListener("click", (event) => {
    const { duration } = music; 
    let move_progress = (event.offsetX / event.target.clientWidth) * duration;
    music.currentTime = move_progress;
});

music.addEventListener("ended", nextSong)

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);

