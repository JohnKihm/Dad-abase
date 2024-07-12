const stars = document.querySelectorAll('.star');
const rating = document.getElementById('rating');
const joke_id = document.getElementById('joke_id').getAttribute('data-value');
const newJokeButton = document.getElementById('another-one');
let value;

stars.forEach((star) => {
    star.addEventListener('click', async () => {
        value = parseInt(star.getAttribute('data-value'));
        rating.innerText = value;

        stars.forEach((s, index) => {
            s.classList.remove('colored');
            if (index < value) {
                s.classList.add('colored')
            }
        });
    });
});

async function getNewJoke() {
    if (!value) {
        document.location.reload();
    } else {
        const response = await fetch('/api/ratings', {
            method: 'POST',
            body: JSON.stringify({ value, joke_id }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

newJokeButton.addEventListener('click', getNewJoke);