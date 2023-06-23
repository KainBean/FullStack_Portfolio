// blog.js

// Retrieve the form element
const form = document.querySelector('form');

// Add event listener to the form submission
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the form data
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  // Perform additional actions or validations if needed

  // Send the form data to the server using AJAX
  fetch('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  })
    .then((response) => response.text())
    .then((data) => {
      // Handle the response from the server
      console.log(data);
      // Perform any UI updates or redirects as needed
    })
    .catch((error) => {
      console.log('Error:', error);
    });
});


