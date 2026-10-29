import type { Budget, Candidate, Expense, Participant, RankedCandidate } from '../types'

export const distanceKm = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const radians = (value: number) => value * Math.PI / 180
  const lat = radians(b.lat - a.lat)
  const lng = radians(b.lng - a.lng)
  const h = Math.sin(lat / 2) ** 2 + Math.cos(radians(a.lat)) * Math.cos(radians(b.lat)) * Math.sin(lng / 2) ** 2
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
}

export const rankCandidates = (people: Participant[], places: Candidate[]): RankedCandidate[] => places.map((candidate) => {
  const distances = people.map((person) => distanceKm(person, candidate))
  const totalDistance = distances.reduce((sum, distance) => sum + distance, 0)
  const averageDistance = people.length ? totalDistance / people.length : 0
  const maxDistance = distances.length ? Math.max(...distances) : 0
  const fairnessScore = people.length ? Math.max(0, Math.round(100 - (averageDistance * 4 + maxDistance * 2))) : 0
  return { ...candidate, distances, totalDistance, averageDistance, maxDistance, fairnessScore }
})

export const calculateBudget = (budget: Budget, peopleCount: number, transportPerPerson: number) => {
  const groupTarget = Math.max(0, budget.perPerson) * peopleCount
  const estimatedTotal = Math.max(0, budget.activity) + Math.max(0, budget.miscellaneous) + Math.max(0, transportPerPerson) * peopleCount
  return { groupTarget, estimatedTotal, perPerson: peopleCount ? estimatedTotal / peopleCount : 0, remaining: groupTarget - estimatedTotal }
}

export const splitEqual = (amount: number, ids: string[]) => {
  const result: Record<string, number> = {}
  if (!ids.length) return result
  const cents = Math.round(amount * 100)
  const base = Math.floor(cents / ids.length)
  let remainder = cents - base * ids.length
  ids.forEach((id) => { result[id] = (base + (remainder-- > 0 ? 1 : 0)) / 100 })
  return result
}

export const expenseShares = (expense: Expense) => expense.shares ?? splitEqual(expense.amount, expense.splitAmong)

export const calculateBalances = (people: Participant[], expenses: Expense[]) => {
  const balances: Record<string, number> = Object.fromEntries(people.map((person) => [person.id, 0]))
  expenses.forEach((expense) => {
    if (balances[expense.payer] === undefined) balances[expense.payer] = 0
    balances[expense.payer] += expense.amount
    Object.entries(expenseShares(expense)).forEach(([id, share]) => { balances[id] = (balances[id] ?? 0) - share })
  })
  return balances
}

export type Settlement = { from: string; to: string; amount: number }
export const calculateSettlements = (people: Participant[], expenses: Expense[]): Settlement[] => {
  const balances = calculateBalances(people, expenses)
  const debtors = Object.entries(balances).filter(([, amount]) => amount < -0.005).map(([id, amount]) => ({ id, amount: -amount })).sort((a, b) => b.amount - a.amount)
  const creditors = Object.entries(balances).filter(([, amount]) => amount > 0.005).map(([id, amount]) => ({ id, amount })).sort((a, b) => b.amount - a.amount)
  const result: Settlement[] = []
  let debtor = 0
  let creditor = 0
  while (debtor < debtors.length && creditor < creditors.length) {
    const amount = Math.round(Math.min(debtors[debtor].amount, creditors[creditor].amount) * 100) / 100
    if (amount > 0) result.push({ from: debtors[debtor].id, to: creditors[creditor].id, amount })
    debtors[debtor].amount -= amount
    creditors[creditor].amount -= amount
    if (debtors[debtor].amount < 0.005) debtor++
    if (creditors[creditor].amount < 0.005) creditor++
  }
  return result
}
