import type { Candidate, Participant, TransportOption } from './types'

export const demoParticipants: Participant[] = [
  { id: 'mira', name: 'Mira', origin: 'Mirpur 10', lat: 23.8068, lng: 90.3687, budget: 350, preference: 'Keep it affordable' },
  { id: 'rayan', name: 'Rayan', origin: 'Uttara Sector 7', lat: 23.8759, lng: 90.3795, budget: 500, preference: 'Avoid long rides' },
  { id: 'safin', name: 'Safin', origin: 'Dhanmondi 27', lat: 23.7516, lng: 90.3746, budget: 400, preference: 'Metro if possible' },
]

export const candidates: Candidate[] = [
  { id: 'farmgate', name: 'Farmgate', area: 'Tejgaon', note: 'Central transit hub with food and coffee nearby.', lat: 23.7578, lng: 90.3897, demo: true },
  { id: 'shahbagh', name: 'Shahbagh', area: 'Central Dhaka', note: 'A balanced midpoint for this group.', lat: 23.7389, lng: 90.3958, demo: true },
  { id: 'dhanmondi', name: 'Dhanmondi Lake', area: 'Dhanmondi', note: 'Relaxed walkable area; easier for Safin.', lat: 23.7461, lng: 90.3742, demo: true },
]

export const transportByPerson: Record<string, TransportOption[]> = {
  mira: [
    { mode: 'Metro + walk', icon: 'M', fare: '৳60–80', duration: '35–45 min', detail: 'Approx. 1 transfer · comfortable option', source: 'Illustrative demo assumption', minFare: 60, maxFare: 80, minutesPerKm: 5 },
    { mode: 'CNG', icon: 'C', fare: '৳180–260', duration: '30–50 min', detail: 'Direct ride · traffic can change duration', source: 'Illustrative demo assumption', minFare: 180, maxFare: 260, minutesPerKm: 4 },
    { mode: 'Bus', icon: 'B', fare: '৳30–50', duration: '45–70 min', detail: 'Route availability varies by time', source: 'Illustrative demo assumption', minFare: 30, maxFare: 50, minutesPerKm: 7 },
  ],
  rayan: [
    { mode: 'Metro + walk', icon: 'M', fare: '৳80–100', duration: '40–55 min', detail: 'Approx. 1 transfer · recommended', source: 'Illustrative demo assumption', minFare: 80, maxFare: 100, minutesPerKm: 5 },
    { mode: 'CNG', icon: 'C', fare: '৳250–350', duration: '35–60 min', detail: 'Direct ride · traffic can change duration', source: 'Illustrative demo assumption', minFare: 250, maxFare: 350, minutesPerKm: 4 },
    { mode: 'Bus', icon: 'B', fare: '৳40–70', duration: '60–85 min', detail: 'Route availability varies by time', source: 'Illustrative demo assumption', minFare: 40, maxFare: 70, minutesPerKm: 7 },
  ],
  safin: [
    { mode: 'Rickshaw', icon: 'R', fare: '৳50–80', duration: '15–25 min', detail: 'Short direct connection', source: 'Illustrative demo assumption', minFare: 50, maxFare: 80, minutesPerKm: 7 },
    { mode: 'CNG', icon: 'C', fare: '৳120–180', duration: '15–30 min', detail: 'Direct ride · traffic can change duration', source: 'Illustrative demo assumption', minFare: 120, maxFare: 180, minutesPerKm: 4 },
    { mode: 'Walk', icon: 'W', fare: 'Free', duration: '35–50 min', detail: 'Best for a short, active journey', source: 'Straight-line approximation', minFare: 0, maxFare: 0, minutesPerKm: 12 },
  ],
}
