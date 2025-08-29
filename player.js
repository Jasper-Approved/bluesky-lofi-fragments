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
      const now = new Date();
      const timestamp = now.toLocaleString();
      console.log(
        `%c🕰️ Dispatch dropped at ${timestamp} for ${track.src}`,
        "color: #ffd580; font-weight: bold;"
      );

      // Reset and apply section class
      fogPulse.classList.remove("morning", "anime", "feline");
      fogPulse.classList.add("active", getSectionFromSrc(track.src));
    });

    track.addEventListener("pause", () => {
      fogPulse.classList.remove("active", "morning", "anime", "feline");
    });

    track.addEventListener("ended", () => {
      fogPulse.classList.remove("active", "morning", "anime", "feline");
    });
  });
});

