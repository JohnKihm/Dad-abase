const stars = document.querySelectorAll('.star');
const rating = document.getElementById('rating');
const joke_id = document.getElementById('joke_id').getAttribute('data-value');

stars.forEach((star) => {
    star.addEventListener('click', async () => {
        const value = parseInt(star.getAttribute('data-value'));
        rating.innerText = value;

        const response = await fetch('/api/ratings', {
            method: 'POST',
            body: JSON.stringify({ value, joke_id }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            alert(response.statusText);
        }
    });
});