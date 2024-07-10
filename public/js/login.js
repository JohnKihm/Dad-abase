async function loginFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (name && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
}

async function signupFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (name && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#login').addEventListener('submit', loginFormHandler);
document.querySelector('#signup').addEventListener('submit', signupFormHandler);