const oneStar = document.getElementById("tone-btn-one");
const twoStar = document.getElementById("tone-btn-two");
const threeStar = document.getElementById("tone-btn-three");
const fourStar = document.getElementById("tone-btn-four");
const fiveStar = document.getElementById("tone-btn-five");


const boo1 = new Tone.Player("/assets/Booing.mp3").toDestination();
const crickets2 = new Tone.Player("/assets/Crickets.mp3").toDestination();
const yay3 = new Tone.Player("/assets/Yay.mp3").toDestination();
const laughTrack4 = new Tone.Player("/assets/sounds-crowd.mp3").toDestination();
const lmao5 = new Tone.Player("/assets/Lmao.mp3").toDestination();

const quackTrack = new Tone.Player("/assets/duck-quacking.mp3").toDestination();

function toneSound(soundlvl, sound) { //change values of soundlvl in evtlisteners if they are too quiet or loud
    if (Tone.context.state !== "running") {
        Tone.start();
    }
    let egg = Math.floor((Math.random() * 111) + 1)
    if (egg === 111) {
        quackTrack.volume.value = soundlvl;
        quackTrack.start();
    } else {
        sound.volume.value = soundlvl;
        sound.start();
    }
}

if (oneStar) {
    oneStar.addEventListener("click", () => {
        toneSound(-10, boo1);
    });
    twoStar.addEventListener("click", () => {
        toneSound(-8, crickets2);
    });
    threeStar.addEventListener("click", () => {
        toneSound(-5, yay3);
    });
    fourStar.addEventListener("click", () => {
        toneSound(-3, laughTrack4);
    });
    fiveStar.addEventListener("click", () => {
        toneSound(0, lmao5);
    });
}
