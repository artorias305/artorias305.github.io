// app.js or a new script.js
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a");
  document.body.classList.remove("fade-out");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      // Prevent default navigation
      event.preventDefault();

      // Get the target URL
      const targetUrl = event.target.href;

      // Add fade-out class
      document.body.classList.add("fade-out");

      // Wait for the fade-out transition to complete, then navigate
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 500); // Match the transition duration in CSS
    });
  });
});
