document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a");
  const FADE_DURATION = 500;

  function navigate(url) {
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = url;
    }, FADE_DURATION);
  }

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetUrl = event.target.href;
      navigate(targetUrl);
    });
  });

  window.addEventListener("popstate", () => {
    document.body.classList.add("fade-out");
    setTimeout(() => {
      document.body.classList.remove("fade-out");
    }, FADE_DURATION);
  });
});
