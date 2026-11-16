# AccessNow — Accessibility-Aware Trip Planner

**AccessNow** is a responsive, civic-tech web application that helps people find routes suited to their mobility needs while transparently highlighting potential accessibility barriers such as broken elevators, blocked ramps, steep stairs, narrow pathways, and buckled pavement.

Unlike conventional navigation applications that solely optimize for travel speed, AccessNow prioritizes safety, step-free access, gentle grades, and community verification of urban obstacles.

---

## 🌟 Key Features

### 1. Welcoming Trip Planner Screen
- **Clear Civic Mission**: *"Plan a route that works for you."*
- **Origin & Destination Inputs**: Easily select landmarks or swap locations with one click.
- **Travel Modes**: Wheelchair-friendly, Walking, and Low-floor Transit.
- **Interactive Preference Chips**: Step-free route, Avoid stairs, Working elevators, Fewer obstacles, Gentle slopes / low incline, and Audio crosswalk signals.
- **1-Click Quick Demo Journeys**: Instantly simulate realistic routes such as *Central Station → Mercy Hospital* or *City Hall → Riverside Library*.

### 2. High-Fidelity Stylized District Map (No External API Keys Required)
- **Local SVG Vector Cartography**: Clean, stylized representation of the *Downtown & Civic Center District* complete with roads, river canal, piers, parks, crosswalks, tactile guidance markers, and landmark buildings.
- **Route Visualizations**: Glowing primary accessible route line and selectable dashed alternatives.
- **Interactive Barrier Markers**: Color-coded pins with radar pulses:
  - 🔴 **Urgent Barrier** (Red): Impassable obstacle requiring detour (e.g. delivery truck blocking curb cut).
  - 🟡 **Unverified Alert** (Amber): Fresh citizen report awaiting cross-verification.
  - 🟢 **Verified Barrier** (Teal): Confirmed by municipal DPW feed or transit audit.
  - ⚪ **Resolved Barrier** (Slate): Inspected and cleared.
- **Interactive Map Controls**: Zoom in/out, reset view, layer toggles (Barriers, Transit Line, Audio Crosswalks), and an expandable map legend.
- **Clickable Barrier Popovers**: Inspect report details, age, photos, and confirm or mark as resolved directly from the map.

### 3. Route Options & Step-by-Step Directions
- **Multiple Route Alternatives**: At least 3 generated routes with estimated duration, distance, step-free percentage, max slope/grade, and alert count.
- **Turn-by-Turn Directions**: Detailed maneuvers featuring accessibility callouts (e.g. push-button door entrances, 1:16 switchback ramps, tactile paving at curb cuts).
- **Interactive Navigation Simulator**: Step through turns with Next/Previous actions.
- **Community Uncertainty Notice**: Clear banner reminding travelers that urban conditions change rapidly and conditions should be verified before travel.

### 4. "Report an Issue" Interaction
- Accessible modal allowing users to report new obstacles.
- Supports 7 barrier types (broken elevators, blocked ramps, stairs, construction trenches, etc.).
- Location selector, severity toggles, detailed description, and anonymous reporting option.
- **Photo Attachment UI**: Drag-and-drop / file upload PLUS 1-click sample demo photos.
- Immediate browser state and `localStorage` persistence with celebratory confirmation.

### 5. Civic Community Feed & Audit Transparency
- Real-time list of neighborhood reports with category filters (All, Urgent, Unverified, Verified, Resolved) and search.
- Upvoting / confirmation interaction (*"Confirm still there"*).
- Ability to modify preferences and recalculate routes dynamically.
- High contrast accessibility mode toggle.

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Development
```bash
# Install dependencies
npm install

# Start Vite development server (runs on http://localhost:5173 by default)
npm run dev

# Run production build & type checks
npm run build

# Preview production build locally
npm run preview
```

---

## 📐 Architecture & Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State & Storage**: Reactive React state + `localStorage` for offline persistence across refreshes.
- **Cartography**: Self-contained SVG vector map engine guaranteeing zero external tile dependencies, instant rendering, and complete offline privacy.

---

## 🔍 Demo Data & Assumptions

- **District**: *Downtown Civic & Medical District* with 6 realistic landmark presets (Metro Central Station, City Hall, Mercy General Hospital, Union Market Square, Riverside Library, Innovation Tech Campus).
- **Civic Data Integrity**: Pre-loaded with realistic municipal DPW notices and commuter reports illustrating verified, unverified, and resolved barriers.
- **No External Integrations**: The application intentionally does not depend on paid Google Maps / Mapbox / OpenStreetMap API keys; all routing and cartography are bundled locally for deterministic, private, and reliable demonstration.
