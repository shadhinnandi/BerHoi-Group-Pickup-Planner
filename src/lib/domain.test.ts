import { describe, expect, it } from 'vitest'
import { calculateBalances, calculateSettlements, distanceKm, rankCandidates, splitEqual } from './domain'
import type { Candidate, Expense, Participant } from '../types'

const people: Participant[] = [
  { id: 'a', name: 'A', origin: 'A', lat: 23.7, lng: 90.3, budget: 0, preference: '' },
  { id: 'b', name: 'B', origin: 'B', lat: 23.8, lng: 90.4, budget: 0, preference: '' },
]
const place: Candidate = { id: 'p', name: 'P', area: 'Dhaka', note: '', lat: 23.75, lng: 90.35, demo: true }

describe('planning calculations', () => {
  it('calculates haversine distance and candidate metrics', () => {
    expect(distanceKm(people[0], people[0])).toBe(0)
    const [ranked] = rankCandidates(people, [place])
    expect(ranked.totalDistance).toBeGreaterThan(0)
    expect(ranked.averageDistance).toBeCloseTo(ranked.totalDistance / 2)
  })
  it('allocates equal rounding remainders deterministically', () => {
    expect(splitEqual(10, ['a', 'b', 'c'])).toEqual({ a: 3.34, b: 3.33, c: 3.33 })
  })
  it('reconciles multiple expenses into settlements', () => {
    const expenses: Expense[] = [{ id: '1', title: 'meal', amount: 10, payer: 'a', splitAmong: ['a', 'b'] }]
    expect(calculateBalances(people, expenses)).toEqual({ a: 5, b: -5 })
    expect(calculateSettlements(people, expenses)).toEqual([{ from: 'b', to: 'a', amount: 5 }])
  })
  it('ignores deleted participant balances while preserving valid payers', () => {
    const expenses: Expense[] = [{ id: '1', title: 'old', amount: 10, payer: 'a', splitAmong: ['a', 'b'] }]
    expect(calculateSettlements([people[0]], expenses)).toEqual([{ from: 'b', to: 'a', amount: 5 }])
  })
})
