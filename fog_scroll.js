
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

let isSequencePlaying = false;
const fogPulse = document.querySelector(".fog-pulse");
window.sectionTracks = {
  morning: [],
  anime: [],
  feline: []
};

function getSectionFromSrc(src) {
  if (!src) return "morning";
  if (src.includes("feline") || src.includes("shadow")) return "feline";
  if (src.includes("anime") || src.includes("heat")) return "anime";
  return "morning";
}

function playAllTracks(tracks) {
  if (isSequencePlaying) {
    console.warn("⚠️ A sequence is already playing.");
    return;
  }

  // Stop all current audio
  Object.values(window.sectionTracks).flat().forEach(track => {
    track.pause();
    track.currentTime = 0;
  });

  let index = 0;
  if (!tracks.length) return;

  const section = getSectionFromSrc(tracks[0].src);
  isSequencePlaying = true;

  fogPulse.classList.remove("active", "morning", "anime", "feline", "sequence");
  fogPulse.classList.add("active", "sequence", section);
  fogPulse.textContent = `🌫️ ${section.toUpperCase()} SEQUENCE 🌫️`;

  console.log(`🌫️ Playing ${section} scrolls in sequence · ${tracks.length} fragments`);

  const playNext = () => {
    if (index >= tracks.length) {
      isSequencePlaying = false;
      fogPulse.classList.remove("sequence", section);
      fogPulse.textContent = "🌫️ 🌀 🌫️";
      return;
    }
    const currentTrack = tracks[index];
    currentTrack.play();
    currentTrack.addEventListener("ended", () => {
      index++;
      playNext();
    }, { once: true });
  };

  playNext();
}

function pauseAll() {
  Object.values(window.sectionTracks).flat().forEach(track => {
    if (!track.paused) track.pause();
  });
  isSequencePlaying = false;
  fogPulse.classList.remove("active", "morning", "anime", "feline", "sequence");
  fogPulse.textContent = "🌫️ ⏸️ Dispatch Paused";
}

function stopAll() {
  Object.values(window.sectionTracks).flat().forEach(track => {
    track.pause();
    track.currentTime = 0;
  });
  isSequencePlaying = false;
  fogPulse.classList.remove("active", "morning", "anime", "feline", "sequence");
  fogPulse.textContent = "🌫️ ⏹️ Dispatch Stopped";
}

document.addEventListener("DOMContentLoaded", () => {
  const scrollContainers = document.querySelectorAll(".scroll-container");
  const audioTracks = document.querySelectorAll("audio");

  audioTracks.forEach(track => {
    const section = getSectionFromSrc(track.src);
    window.sectionTracks[section].push(track);

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
      fogPulse.textContent = `🌫️ ${sectionClass.toUpperCase()} SEQUENCE 🌫️`;
    });

    ["pause", "ended"].forEach(event => {
      track.addEventListener(event, () => {
        fogPulse.classList.remove("active", "morning", "anime", "feline");
        fogPulse.style.animationDuration = "";
        fogPulse.textContent = "🌫️ 🌀 🌫️";
      });
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const sectionClass = getSectionFromSrc(id);
        console.log(`🌀 Dispatch Entered: ${id} • ${new Date().toISOString()}`);
        fogPulse.className = `fog-pulse active ${sectionClass} ${id}`;
      }
    });
  }, {
    threshold: 0.5
  });

  scrollContainers.forEach((container) => observer.observe(container));
});



