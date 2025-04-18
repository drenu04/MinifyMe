document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('shorten-form');
    const urlInput = document.getElementById('url');
    const shortcodeInput = document.getElementById('shortcode');
    const shortenedUrlsContainer = document.getElementById('shortened-urls');

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check if dark mode is enabled from localStorage
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from refreshing the page

        const url = urlInput.value;
        const shortcode = shortcodeInput.value;

        // Send data to backend using fetch API
        fetch('/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `longUrl=${encodeURIComponent(url)}&shortUrl=${encodeURIComponent(shortcode)}`
            })
            .then(response => response.text())
            .then(data => {
                // Display the shortened URL on the page
                shortenedUrlsContainer.innerHTML = data;
            })
            .catch(error => console.error('Error:', error));

        // Clear input fields after submission
        urlInput.value = '';
        shortcodeInput.value = '';
    });
});