const newJokeFormHandler = async (event) => {
    event.preventDefault();
  
    const joke = document.querySelector('#joke-content').value.trim();
  
    if (joke) {
      const response = await fetch('/api/jokes/newjoke', {
        method: 'POST',
        body: JSON.stringify({ joke }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect to their profile page
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };

  document.querySelector('.new-joke-form').addEventListener('submit', newJokeFormHandler);