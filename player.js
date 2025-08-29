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
  const fogPulse = document.getElementById("fogPulse");

  if (!fogPulse || audioTracks.length === 0) return;

  // Auto-play preview track
  const previewTrack = audioTracks[Math.floor(Math.random() * audioTracks.length)];
  previewTrack.classList.add("preview-track");
  previewTrack.volume = 0.4;
  previewTrack.addEventListener("click", () => {
  previewTrack.play();
  });

  // Helper: get section from src
  const getSectionFromSrc = (src) => {
    if (src.includes("morning-coffee")) return "morning";
    if (src.includes("anime-lyric-loops")) return "anime";
    if (src.includes("steampunk-feline")) return "feline";
    return "";
  };

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
    });

    ["pause", "ended"].forEach(event => {
      track.addEventListener(event, () => {
        fogPulse.classList.remove("active", "morning", "anime", "feline");
        fogPulse.style.animationDuration = "";
      });
    });
  });
});


