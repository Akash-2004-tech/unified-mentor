
console.log("welcome to our web music app");

// Initialize variables
let songindex = 0;
let audioelement = new Audio('songs/gorila-315977.mp3');

let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let songitems = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    { songname: "salam-e-ishq", filepath: "songs/gorila-315977.mp3", coverpath: "covers/img2.jpg" },
    { songname: "rabbba ne bana di jodi", filepath: "songs/song1.mp3", coverpath: "covers/img3.avif" },
    { songname: "kacha badam", filepath: "songs/song4.mp3", coverpath: "covers/img4.jpeg" },
    { songname: "rabate", filepath: "songs/gorila-315977.mp3", coverpath: "covers/img5.webp" },
    { songname: "chickni chameli", filepath: "songs/song1.mp3", coverpath: "covers/img2.jpg" },
    { songname: "friends", filepath: "songs/song2.mp3", coverpath: "covers/img6.webp" },
    { songname: "jai mata di", filepath: "songs/gorila-315977.mp3", coverpath: "covers/img7.jpeg" },
    { songname: "like jenny", filepath: "songs/song3.mp3", coverpath: "covers/img8.webp" },
    { songname: "kill this love", filepath: "songs/song4.mp3", coverpath: "covers/img9.jpg" },
    { songname: "fakelove", filepath: "songs/song5.mp3", coverpath: "covers/img10.jpeg" }
];

// Update UI with song names and images
songitems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
});

// Handle play/pause click
masterplay.addEventListener('click', () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
    } else {
        audioelement.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play');
    }
});

// Listen to audio time update to sync progress bar
audioelement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
    myprogressbar.value = progress;
});

// Seek functionality
myprogressbar.addEventListener('change', () => {
    audioelement.currentTime = myprogressbar.value * audioelement.duration / 100;
});
const makeallplays=()=>{
    
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}
Array.from(document.getElementsByClassName('songitemplay')).forEach((el) => {
    el.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);

        if (clickedIndex === songindex) {
            if (audioelement.paused) {
                audioelement.play();
                e.target.classList.remove('fa-play');
                e.target.classList.add('fa-pause');
                masterplay.classList.remove('fa-play');
                masterplay.classList.add('fa-pause');
            } else {
                audioelement.pause();
                e.target.classList.remove('fa-pause');
                e.target.classList.add('fa-play');
                masterplay.classList.remove('fa-pause');
                masterplay.classList.add('fa-play');
            }
        } else {
            makeallplays();
            songindex = clickedIndex;
            audioelement.src = songs[songindex].filepath;
            audioelement.currentTime = 0;
            audioelement.play();
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            masterplay.classList.remove('fa-play');
            masterplay.classList.add('fa-pause');
        }
    });
});
document.getElementById('next').addEventListener('click',()=>{
    if(songindex>=10){
        songindex=0;
    }
    else{
        songindex+=1;
    }
    audioelement.src = songs[songindex].filepath;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<0){
        songindex=0;
    }
    else{
        songindex=1;
    }
    audioelement.src = songs[songindex].filepath;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})