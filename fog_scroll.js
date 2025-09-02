// fog_scroll.js

document.addEventListener("DOMContentLoaded", () => {
  const fogPulse = document.querySelector(".fog-pulse");
  const scrollContainers = document.querySelectorAll(".scroll-container");
  const audioTracks = document.querySelectorAll("audio");

  // 🔁 Sync fog pulse with audio play
  audioTracks.forEach((track) => {
    track.addEventListener("play", () => {
      fogPulse.classList.add("active");
      fogPulse.textContent = "🌫️ 🎶 🌫️";
    });

    track.addEventListener("pause", () => {
      fogPulse.classList.remove("active");
      fogPulse.textContent = "🌫️ 🌀 🌫️";
    });
  });

  // 🧭 Log scroll container entry
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        console.log(`🌀 Dispatch Entered: ${id} • ${new Date().toISOString()}`);
        fogPulse.className = `fog-pulse ${id}`; // Apply theme class
      }
    });
  }, {
    threshold: 0.5
  });

  scrollContainers.forEach((container) => observer.observe(container));
});
