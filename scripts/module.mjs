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


// import { texts } from "/text-data/data.js";

// const divContainer = document.querySelector("#divContainer");

// // 1. Render all sections
// texts.forEach(text => {
//     const section = document.createElement("section");
//     section.innerHTML = text;
//     divContainer.appendChild(section);
// });

// // 2. Auto swipe logic
// const sections = divContainer.querySelectorAll("section");
// let currentIndex = 0;
// const total = sections.length;
// const swipeInterval = 4000; // 4 seconds

// function autoSwipe() {
//     currentIndex = (currentIndex + 1) % total; // loop back to 0

//     // Scroll to the section. scrollIntoView works with your scroll-snap setup
//     sections[currentIndex].scrollIntoView({
//         behavior: "smooth",
//         inline: "start",
//         block: "nearest"
//     });
// }

// let intervalId = setInterval(autoSwipe, swipeInterval);

// // 3. Pause on hover/touch so it doesn't fight the user
// divContainer.addEventListener("pointerdown", () => clearInterval(intervalId));
// divContainer.addEventListener("pointerup", () => {
//     intervalId = setInterval(autoSwipe, swipeInterval);
// });

// // Optional: pause when tab is hidden
// document.addEventListener("visibilitychange", () => {
//     if (document.hidden) {
//         clearInterval(intervalId);
//     } else {
//         intervalId = setInterval(autoSwipe, swipeInterval);
//     }
// });