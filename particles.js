const numParticles = 10;
for (let i = 0; i < numParticles; i++) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.width = `${Math.random() * 5 + 5}px`;
  particle.style.height = particle.style.width;
  particle.style.top = `${Math.random() * 100}vh`;
  particle.style.left = `${Math.random() * 100}vw`;
  particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
  particle.style.animationDelay = `${Math.random() * 5}s`;
  document.body.appendChild(particle);
}
