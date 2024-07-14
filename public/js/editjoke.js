const editJokeFormHandler = async (event) => {
    event.preventDefault();
  
    const joke = document.querySelector('#joke-edit').value.trim();
    const joke_id = document.querySelector('.joke_id').textContent;

    console.log(joke_id);
  
    if (joke) {
      const response = await fetch(`/api/jokes/${joke_id}`, { //insert the jokes id here
        method: 'PUT',
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

  document.querySelector('.edit-joke-form').addEventListener('submit', editJokeFormHandler);