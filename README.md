# shoooter
✨ shoooter — v1.2.0

---

shoooter (made by SOU.) is a browser-based 3D pastel horizon arcade shooter built entirely in a single, zero-asset HTML file. Combining dreamy pastel geometry with Frosted Glassmorphism UI, players pilot a stylized Space Ranger along a defense track to hold off waves of incoming visitors across shifting biomes and dynamic day/night skies.

---

🌟 What's Included in This Release

1. 🎨 5 Dynamic Pastel Biomes: Cycle seamlessly between Grass, Ground, Rock, Underwater, and Sky worlds, each featuring procedural checkerboard tiles, custom atmospheric fog, and stylized 3D side scenery (trees, desert totems, hexagonal crystals, coral spires, cloud pedestals, and rising bubbles).
2. 👾 Dual Visitor Modes: Swap enemies on the fly between bouncy Pastel Zombies and hovering Macaron UFO Alien Ships, complete with 3D tumbling voxel particle explosions and expanding shockwave rings upon impact.
3. ☀️ Live Day/Night Sky Engine: Experience an orbiting pastel sun, a ringed moon, twinkling starfields, and drifting 3D fluffy clouds. Surviving into a new day awards bonus points, while nighttime triggers a Night Surge that accelerates enemy spawn rates.
4. 🌀 Portal Wall-Wrap & Auto-Pickups: Cross the left or right laser boundaries to teleport instantly to the opposite side of the lane. Touch glowing Lemon-Gold Energy Capsules on your track to auto-reload +20 Blaster Energy, or collect Pastel Peaches to restore shield health.
5. 🔊 Zero-Asset Web Audio Synthesizer: Features a custom-built procedural sound engine using the Web Audio API for laser sweeps, voxel crunch explosions, major-7th fruit chimes, dual-tone reloads, sunrise chords, and UI glass ticks—with a dedicated mute toggle.
6. 📱 Cross-Platform Adaptive Controls: Choose between Smartphone / Tablet mode (ergonomic on-screen multi-touch thumb pads and quick-action pills) and Laptop / Desktop mode (full keyboard bindings and clickable HUD dock) from the startup modal or top bar at any time.

---

🛡️ Shield & Scoring System

Pastel Shield (6 Hit Segments / 3.0 ♥): Taking direct contact from an enemy or letting one infiltrate past your defense line costs 1 hit segment (0.5 ♥) and automatically spawns a healing Pastel Fruit on your track. Taking a 6th hit respawns your ranger and resets the current run's score while preserving your all-time Best Score in localStorage.

Score Breakdown:
* Enemy Eliminated: +50 pts
* Pastel Fruit Eaten: +100 pts (and +0.5 ♥ restored)
* New Day Survived: +200 pts
* Blaster Bolt Fired: +5 pts

---

🛠️ Tech Stack & Quick Start

 * Rendering: Three.js (r128) with PCF soft shadows, ACES Filmic tone mapping, and procedural HTML5 Canvas textures.
 * Styling: Tailwind CSS + custom CSS variables for frosted glass (backdrop-filter) components.
 * Audio: Native browser AudioContext procedural oscillator and noise buffer synthesis.
 * How to Run: Download shoooter.html from the release assets below and open it directly in any modern desktop or mobile web browser—no build steps or local server required.
