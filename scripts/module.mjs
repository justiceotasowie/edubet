import { texts } from "/text-data/data.js";

const divContainer = document.querySelector("#divContainer");

// 1. Render all sections
texts.forEach(text => {
    const swipeText = document.createElement("section");
    swipeText.innerHTML = text;
    divContainer.appendChild(swipeText);
});

// 2. Create shuffled playlist
let playlist = [];
let currentIndex = 0;

function shuffleArray(arr) {
    const newArr = [...arr]; // copy so we don't mess up original
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]]; // swap
    }
    return newArr;
}

function refillPlaylist() {
    // Create array of indexes: [0, 1, 2, 3...]
    const indexes = [...Array(texts.length).keys()];
    playlist = shuffleArray(indexes);
    currentIndex = 0;
}

function showNextSlide() {
    // If we ran out, reshuffle and start over
    if (currentIndex >= playlist.length) {
        refillPlaylist();
    }

    const slideIndex = playlist[currentIndex];

    divContainer.scrollTo({
        left: divContainer.clientWidth * slideIndex,
        behavior: 'smooth'
    });

    currentIndex++;
}

// Initial shuffle + start timer
refillPlaylist();
showNextSlide(); // show first one immediately
setInterval(showNextSlide, 5000);