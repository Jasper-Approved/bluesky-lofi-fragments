document.addEventListener("DOMContentLoaded", () => {
  const audioTracks = document.querySelectorAll("audio");
  const previewTrack = audioTracks[Math.floor(Math.random() * audioTracks.length)];
  const fogPulse = document.getElementById("fogPulse");

  // Auto-play preview track (muted for gentle intro)
  previewTrack.volume = 0.4;
  previewTrack.play().catch(() => {
    // Autoplay might be blocked—no worries
  });

  // Timestamp logger + fog pulse activation
  audioTracks.forEach(track => {
    track.addEventListener("play", () => {
      const now = new Date();
      const timestamp = now.toLocaleString();
      console.log(
        `%c🕰️ Dispatch dropped at ${timestamp} for ${track.src}`,
        "color: #ffd580; font-weight: bold;"
      );
      fogPulse.classList.add("active");
    });

    track.addEventListener("pause", () => {
      fogPulse.classList.remove("active");
    });

    track.addEventListener("ended", () => {
      fogPulse.classList.remove("active");
    });
  });
});
