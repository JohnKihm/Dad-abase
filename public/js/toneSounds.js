const oneStar = document.getElementById("tone-btn-one");
const twoStar = document.getElementById("tone-btn-two");
const threeStar = document.getElementById("tone-btn-three");
const fourStar = document.getElementById("tone-btn-four");
const fiveStar = document.getElementById("tone-btn-five");

const laughTrack = new Tone.Player("/assets/sounds-crowd.mp3").toDestination();
const quackTrack = new Tone.Player("/assets/duck-quacking.mp3").toDestination();

function toneSound(soundlvl) { //change values of soundlvl in evtlisteners if they are too quiet or loud
    if (Tone.context.state !== "running") {
        Tone.start();
    }
    let egg = Math.floor((Math.random() * 1111) + 1)
    if (egg === 111) {
        quackTrack.volume.value = soundlvl;
        quackTrack.start();
    } else {
        laughTrack.volume.value = soundlvl;
        laughTrack.start();
    }
}
oneStar.addEventListener("click", () => {
    toneSound(-15);
});
twoStar.addEventListener("click", () => {
    toneSound(-11);
});
threeStar.addEventListener("click", () => {
    toneSound(-7);
});
fourStar.addEventListener("click", () => {
    toneSound(-3);
});
fiveStar.addEventListener("click", () => {
    toneSound(0);
});
