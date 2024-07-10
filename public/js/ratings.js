const stars = document.querySelectorAll('.star');
const rating = document.getElementById('rating');

stars.forEach((star) => {
    star.addEventListener('click', () => {
        const value = parseInt(star.getAttribute('data-value'));
        rating.innerText = value;
    });
});