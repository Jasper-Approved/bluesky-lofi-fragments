document.addEventListener("DOMContentLoaded", () => {
  const audioTracks = document.querySelectorAll("audio");
  const previewTrack = audioTracks[Math.floor(Math.random() * audioTracks.length)];

  // Auto-play preview track (muted for gentle intro)
  previewTrack.volume = 0.4;
  previewTrack.play().catch(() => {
    // Autoplay might be blocked—no worries
  });

  // Timestamp logger
  audioTracks.forEach(track => {
    track.addEventListener("play", () => {
      const now = new Date();
      const timestamp = now.toLocaleString();
      console.log(`🕰️ Dispatch dropped at ${timestamp} for ${track.src}`);
    });
  });
});
