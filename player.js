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
  const audioTracks = document.querySelectorAll("audio");
  const previewTrack = audioTracks[Math.floor(Math.random() * audioTracks.length)];
  const fogPulse = document.getElementById("fogPulse");

  // Auto-play preview track
  previewTrack.volume = 0.4;
  previewTrack.play().catch(() => {});

  // Helper: get section from src
  function getSectionFromSrc(src) {
    if (src.includes("morning-coffee")) return "morning";
    if (src.includes("anime-lyric-loops")) return "anime";
    if (src.includes("steampunk-feline")) return "feline";
    return "";
  }

  // Timestamp logger + fog pulse activation
  audioTracks.forEach(track => {
    track.addEventListener("play", () => {
      const src = track.src.split("/").pop(); // get filename
      const bpm = bpmMap[src] || 70; // default if unknown
      const pulseDuration = (60 / bpm) * 2; // double beat cycle
      const now = new Date();
      const timestamp = now.toLocaleString();
      console.log(
        `%c🕰️ Dispatch dropped at ${timestamp} for ${track.src}`,
        "color: #ffd580; font-weight: bold;"
      fogPulse.style.animationDuration = `${pulseDuration}s`;
      fogPulse.classList.add("active", getSectionFromSrc(track.src));
      );

      // Reset and apply section class
      fogPulse.classList.remove("morning", "anime", "feline");
      fogPulse.classList.add("active", getSectionFromSrc(track.src));
    });

    track.addEventListener("pause", () => {
      fogPulse.classList.remove("active", "morning", "anime", "feline");
      fogPulse.style.animationDuration = "";
    });

    track.addEventListener("ended", () => {
      fogPulse.classList.remove("active", "morning", "anime", "feline");
    });
  });
});

