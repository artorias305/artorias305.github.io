// smooth-transitions.js
document.addEventListener("DOMContentLoaded", function () {
  // Check if a link with the class "transition-link" is clicked
  document.querySelectorAll(".transition-link").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default link behavior

      // Fade out the current content
      document.querySelector("body").style.opacity = 0;

      // Wait for a short duration for the fade-out transition to complete
      setTimeout(function () {
        // Load the new content using the link's href attribute
        window.location.href = link.getAttribute("href");
      }, 500); // Adjust the duration to match your transition time
    });
  });

  // Fade in the content after the page has loaded
  document.querySelector("body").style.opacity = 1;
});
