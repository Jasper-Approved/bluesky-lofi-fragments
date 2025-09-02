// fog_scroll.js

const bpmMap = {
  "loop-drops-with-soul.mp3": 70,
  "same-old-story.mp3": 70,
  "shadowproof-ritual.mp3": 70,
  "speak-with-heat.mp3": 70,
  "encrypted-cafe-menu.mp3": 80,
  "etched-beneath-lanterns.mp3": 80,
  "shadowed-corners.mp3": 72,
  "sketching-every-route.mp3": 72,
  "they-cannot-silence-the-ritual.mp3": 80,
  "you-are-the-channel.mp3": 72,
  "encrypted-delights.mp3": 72,
  "espressos-brew-best-under-pressure.mp3": 74,
  "fog-messenger.mp3": 70
};

document.addEventListener("DOMContentLoaded", () => {
  const fogPulse = document.querySelector(".fog-pulse");
  const scrollContainers = document.querySelectorAll(".scroll-container");
  const audioTracks = document.querySelectorAll("audio");

  function getSectionFromSrc(src) {
  if (src.includes("feline") || src.includes("shadow")) return "feline";
  if (src.includes("anime") || src.includes("heat")) return "anime";
  return "morning"; // default
}

  // Fog pulse sync per track
  audioTracks.forEach(track => {
    track.addEventListener("play", () => {
      const src = track.src.split("/").pop();
      const bpm = bpmMap[src] || 70;
      const pulseDuration = (60 / bpm) * 2;
      const sectionClass = getSectionFromSrc(track.src);
      const timestamp = new Date().toLocaleString();

      console.log(
        `%c🕰️ Dispatch dropped at ${timestamp} for ${track.src} · BPM: ${bpm}`,
        "color: #ffd580; font-weight: bold"
      );

      fogPulse.classList.remove("active", "morning", "anime", "feline");
      fogPulse.style.animationDuration = `${pulseDuration}s`;
      fogPulse.classList.add("active", sectionClass);
      fogPulse.textContent = "🌫️ 🎶 🌫️"; // inside play event
    });

    ["pause", "ended"].forEach(event => {
      track.addEventListener(event, () => {
        fogPulse.classList.remove("active", "morning", "anime", "feline");
        fogPulse.style.animationDuration = "";
        fogPulse.textContent = "🌫️ 🌀 🌫️"; // inside pause/ended event
      });
    });
  });

  // 🧭 Log scroll container entry
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        console.log(`🌀 Dispatch Entered: ${id} • ${new Date().toISOString()}`);
        fogPulse.className = `fog-pulse active ${sectionClass} ${id}`; // Apply theme class
      }
    });
  }, {
    threshold: 0.5
  });

  scrollContainers.forEach((container) => observer.observe(container));
});

