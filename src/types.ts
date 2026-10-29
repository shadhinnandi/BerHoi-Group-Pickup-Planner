export type Participant = {
  id: string
  name: string
  origin: string
  lat: number
  lng: number
  budget: number
  preference: string
}

export type Candidate = {
  id: string
  name: string
  area: string
  note: string
  lat: number
  lng: number
  demo: boolean
}

export type Expense = {
  id: string
  title: string
  amount: number
  payer: string
  splitAmong: string[]
  shares?: Record<string, number>
}

export type TransportOption = {
  mode: string
  icon: string
  fare: string
  duration: string
  detail: string
  source: string
  minFare: number
  maxFare: number
  minutesPerKm: number
}

export type Budget = {
  perPerson: number
  activity: number
  miscellaneous: number
}

export type Plan = {
  version: 1
  outingName: string
  date: string
  isDemo?: boolean
  participants: Participant[]
  candidates?: Candidate[]
  selectedCandidateId: string
  expenses: Expense[]
  budget: Budget
}

export type RankedCandidate = Candidate & {
  distances: number[]
  averageDistance: number
  maxDistance: number
  totalDistance: number
  fairnessScore: number
}
