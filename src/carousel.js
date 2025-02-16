async function getHtmlContent(url) {
  try {
    // Make a fetch request to the provided URL
    const response = await fetch(url);

    // Check if the response was successful (status 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Read the response as text (HTML content)
    const htmlContent = await response.text();
    return htmlContent;
  } catch (error) {
    console.error('Error fetching HTML content:', error);
    return null;
  }
}

// Example usage:
getHtmlContent('helloworld.html').then(html => {
  console.log(html);  // Logs the HTML content as a string
});

getHtmlContent('helloworld.html').then(html => {
  document.getElementById('hero_content').innerHTML = html;
});

