# Ber Hoi

## Plan a better Dhaka hangout

Ber Hoi is a frontend-first group hangout planner for friends who want to agree on a fair meetup point, compare practical ways to get there, and settle shared costs without a long message thread.

It is designed for quick, mobile-friendly planning around Dhaka neighborhoods. The app works without an account, backend, database, API key, or paid service.

## Product showcase

### MeetPoint

Turn a group chat decision into a transparent comparison:

- Add, edit, and remove participants.
- Set each person's starting neighborhood and budget.
- Add custom meetup candidates alongside the curated Dhaka demo locations.
- Compare average distance, longest individual distance, total distance, and fairness score.
- Sort candidates by fairness, average distance, longest trip, or total distance.
- Select a meetup point and see the participant markers update on the Leaflet map.
- Use the visible map zoom controls and OpenStreetMap attribution.

Distance values are neighborhood-level straight-line approximations. They are intentionally not presented as road distance, travel time, or a live routing result.

### Getting There

Compare planning assumptions for the selected participant and destination:

- Metro, bus, CNG, rickshaw, and walking options where demo assumptions are available.
- Indicative fare ranges per person.
- Group-level fare ranges based on the current participant count.
- Broad duration assumptions derived from distance and transport mode.
- Clear labels showing that values are illustrative rather than live fares or traffic data.

The transport section is structured so a future routing adapter can replace local assumptions without changing the planning workflow.

### Split the Bill

Keep the money side of the outing auditable:

- Set a per-person target budget.
- Add food/activity and miscellaneous budget amounts.
- Add expenses with a title, amount, payer, and sharing participants.
- Split expenses equally or enter validated custom share JSON.
- Edit the current plan inputs and delete expenses.
- Review total cost, target budget, remaining budget, individual balances, and suggested repayments.
- Use deterministic cent-level rounding so equal splits add back to the original amount.

Settlement suggestions are calculated from the actual recorded payer and each participant's share. No payment is initiated and no transfer is implied.

## Plan controls

- **Start a new plan** clears the demo data after confirmation.
- **Try demo plan** loads an explicit, labelled Dhaka example.
- Plan name and date/time are editable.
- The active plan is automatically saved to versioned browser storage.
- Invalid or outdated stored data is ignored safely instead of breaking the app.
- JSON export/import is available for backup and manual sharing.
- Snapshot share URLs are compactly encoded and include the current plan state.

Share URLs are snapshots, not collaborative rooms. Editing one copy does not update another person's copy.

## Tech stack

- React 18
- TypeScript with strict compiler settings
- Vite
- Leaflet and React Leaflet
- OpenStreetMap tiles
- Lucide React icons
- Vitest for domain calculation tests

## Project structure

```text
src/
├── App.tsx              # Application shell and connected workflows
├── data.ts              # Curated Dhaka locations and demo assumptions
├── types.ts             # Shared domain types
├── lib/
│   ├── domain.ts        # Distance, budget, splitting, and settlement logic
│   ├── domain.test.ts   # Core calculation tests
│   └── storage.ts       # Versioned persistence and snapshot URLs
├── main.tsx             # React entry point
└── styles.css           # Design system and responsive layout
```

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Test and build

```bash
# Core domain tests
npm test

# Type-check and production bundle
npm run build

# Optional production preview
npm run preview
```

## Deploy to Vercel

Import the project into Vercel with these settings:

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |
| Environment variables | None required |

Ber Hoi is a static frontend, so no server-side routes or database setup is needed.

## Data limitations

This version deliberately does **not** claim to provide:

- Live traffic or road routing
- Transit schedules or route availability
- Current official Dhaka fares
- Browser geocoding for arbitrary addresses
- Real-time collaboration
- Payments or money transfers

The map uses OpenStreetMap tiles, while travel fares and durations use clearly labelled local planning assumptions. Core planning, calculations, persistence, and expense settlement continue to work when external map tiles are unavailable.
