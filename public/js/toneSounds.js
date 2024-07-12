const oneStar = document.getElementById("tone-btn-one");
const twoStar = document.getElementById("tone-btn-two");
const threeStar = document.getElementById("tone-btn-three");
const fourStar = document.getElementById("tone-btn-four");
const fiveStar = document.getElementById("tone-btn-five");

const synth = new Tone.Synth().toDestination();

function toneSound(soundlvl) { //change values of soundlvl in evtlisteners if they are too quiet or loud
    if (Tone.context.state !== "running") {
        Tone.start();
    }
    synth.volume.value = soundlvl;
    synth.triggerAttackRelease("C3", "8n");
}
oneStar.addEventListener("click", () => {
    toneSound(-4);
});
twoStar.addEventListener("click", () => {
    toneSound(-2);
});
threeStar.addEventListener("click", () => {
    toneSound(0);
});
fourStar.addEventListener("click", () => {
    toneSound(2);
});
fiveStar.addEventListener("click", () => {
    toneSound(4);
});