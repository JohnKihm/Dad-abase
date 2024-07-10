const newJokeFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#joke-content').value.trim();
  
    if (content) {
      const response = await fetch('/api/jokes/newjoke', {
        method: 'POST',
        body: JSON.stringify({ content }),
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