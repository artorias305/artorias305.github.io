// Function to check if an element is in the viewport
function isInViewport(element, buffer = 100) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -buffer &&
    rect.left >= -buffer &&
    rect.bottom <=
      (window.innerHeight + buffer ||
        document.documentElement.clientHeight + buffer) &&
    rect.right <=
      (window.innerWidth + buffer ||
        document.documentElement.clientWidth + buffer)
  );
}

// Function to handle the fade-in and fade-out effect
function handleScrollAnimations() {
  const fadeElements = document.querySelectorAll(".fade-in");

  fadeElements.forEach((element) => {
    if (isInViewport(element)) {
      element.classList.add("visible");
    } else {
      element.classList.remove("visible");
    }
  });
}

// Attach the handleScrollAnimations function to the scroll event
window.addEventListener("scroll", handleScrollAnimations);

// Initial check on page load
handleScrollAnimations();
