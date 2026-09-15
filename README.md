# ROAB Foundation — Interactive ARG Website

A complete, fully functional **two-phase interactive ARG website** for the fictional **ROAB Foundation** (Research Of Abnormal Behaviour).

## Overview

This is an immersive ARG experience that begins as a professional research organization website, then transforms into a restricted internal archive after discovering a hidden password.

### Phase 1: Public Website
A clean, believable, professional website presenting ROAB as a legitimate research foundation. Features include:
- Organization information and mission
- Department descriptions
- Research overview
- Personnel profiles
- Public archives with research documents
- Subtle anomalies hidden in personnel records

### Phase 2: Restricted Internal Archive
A completely transformed interface unlocked through a hidden password (`THE GAP`). Features include:
- Trial database (4 Trials: Morrow, Fallen Knight, Final Vow, False Shepherd)
- The Gap — dimensional anomaly documentation
- Universe Merger Events
- Universe Records showing contradictory realities
- Incident Reports
- Professor Research Logs (tragic storyline)
- Personnel records with classified information
- Recovered Files with fragmented lore

## Features

✅ **Two Distinct Phases** — Phase 1 and Phase 2 are visually and structurally different
✅ **Password-Protected Access** — Hidden password: `THE GAP`
✅ **Persistent State** — Phase 2 persists across page refreshes using localStorage
✅ **Typewriter Aesthetic** — Courier New monospace font throughout
✅ **Government/Archival Style** — Inspired by classified documents and early internet
✅ **Interactive Archives** — Clickable documents and records
✅ **Handwritten Notes** — Easter eggs from Emily Enferd
✅ **Redacted Text** — Classified information styling
✅ **Responsive Design** — Works on desktop, tablet, and mobile
✅ **Development Reset** — Secret reset button for testing

## How to Use

### Opening the Website

1. Clone or download this repository
2. Open `index.html` in a web browser
3. Explore Phase 1 as a normal website

### Discovering Phase 2

1. Navigate to the **ARCHIVES** page
2. At the bottom, you'll see a note mentioning "THE GAP"
3. Click on **"THE GAP"** (it's underlined)
4. A password terminal will appear
5. Enter the password: **`THE GAP`**
6. The website will transform into Phase 2

### Phase 1 Navigation

- **ABOUT** — Organization overview
- **DEPARTMENTS** — Description of ROAB departments
- **RESEARCH** — Research areas and methodologies
- **PERSONNEL** — Meet the four ROAB staff members
- **CONTACT** — General inquiry information
- **ARCHIVES** — Public research documents (contains hidden password trigger)

### Phase 2 Navigation

- **TRIALS** — Database of four known Trials
- **THE GAP** — Information about the dimensional breach
- **MERGER EVENTS** — Universe merger documentation
- **UNIVERSE RECORDS** — Contradictory records across realities
- **INCIDENT REPORTS** — Classified incidents
- **PROFESSOR LOGS** — Recovered research logs (tragic storyline)
- **PERSONNEL** — Internal staff records
- **RECOVERED FILES** — Fragmented lore and hidden information

## Lore Overview

### The Four Trials

1. **MORROW** — A puppet-like entity controlled by the Parasite
2. **FALLEN KNIGHT** — A warrior with catastrophic combat abilities
3. **FINAL VOW** — A mysterious figure connected to the Gap
4. **FALSE SHEPHERD** — An unknown entity with cooperative tendencies

### Key Characters

- **Ivo Newton** — Founder of ROAB
- **Emily Enferd** — Researcher with handwritten notes throughout archives
- **The Professor** — Senior researcher who becomes infected (tragic storyline)
- **Matteo Simmons** — Head of Security

### Hidden Lore Elements

- **The Parasite** — An entity that infects and transforms its hosts
- **The Gap** — A dimensional fracture causing realities to merge
- **The Collapse** — A catastrophic event that damaged The Gap
- **Parralexs** — An AI entity within The Gap (discovered through recovered files)
- **Corvo** — The Voice of The Gap (hidden reference)

## Development Mode

### Accessing the Dev Reset Button

The reset button is hidden by default. To enable it:

1. Add `?dev=true` to the URL: `index.html?dev=true`
2. A red "DEV: Reset ARG" button will appear in the bottom-right corner
3. Click it to return to Phase 1 (will reload the page)

### Configuration

Edit `script.js` to change the password or behavior:

```javascript
const CONFIG = {
    correctPassword: 'THE GAP',  // Change password here
    storageKey: 'roabPhase',      // localStorage key
    developmentMode: false        // Enable dev features
};
```

## File Structure

```
roab-foundation-arg/
├── index.html      # Main HTML structure
├── styles.css      # All styling (Phase 1 & 2)
├── script.js       # Complete interactivity
└── README.md       # This file
```

## Styling Details

### Colors

- **Phase 1** — Light background, black text, professional look
- **Phase 2** — Dark background (#0a0a0a), green terminal text (#00ff00), red warnings (#ff3333)

### Typography

All text uses `"Courier New", Courier, monospace` for authentic typewriter aesthetic.

### Effects

- Terminal scanline effect in password interface
- Green text glow in Phase 2
- Red warning panel borders
- Subtle CRT flicker animations
- Handwritten note styling

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Tips for Playing

1. **Read Carefully** — Important lore is hidden in document text
2. **Check Personnel Records** — Status changes between Phase 1 and Phase 2
3. **Read Professor Logs in Order** — They tell a tragic story
4. **Look for Contradictions** — Universe Records show conflicting information
5. **Investigate Handwritten Notes** — Emily Enferd's annotations are clues
6. **Explore Recovered Files** — They contain the deepest lore

## Password

The password to unlock Phase 2 is: **`THE GAP`**

(This is intentionally visible in these instructions for initial exploration)

## Credits

Created as an immersive ARG experience. All content, design, and functionality created specifically for this project.

## License

This project is provided as-is for educational and entertainment purposes.

---

**Enjoy exploring the ROAB Foundation archives. Remember: not all records can be trusted.**
