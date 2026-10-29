import type { Plan } from '../types'

const STORAGE_KEY = 'ber-hoi-plan-v1'
const isPlan = (value: unknown): value is Plan => {
  if (!value || typeof value !== 'object') return false
  const plan = value as Partial<Plan>
  return plan.version === 1 && typeof plan.outingName === 'string' && Array.isArray(plan.participants) && Array.isArray(plan.expenses) && typeof plan.selectedCandidateId === 'string'
}

export const loadPlan = (): Plan | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return isPlan(parsed) ? parsed : null
  } catch {
    return null
  }
}

export const savePlan = (plan: Plan) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan))
    return true
  } catch {
    return false
  }
}

const encode = (value: string) => btoa(unescape(encodeURIComponent(value))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
const decode = (value: string) => decodeURIComponent(escape(atob(value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - value.length % 4) % 4))))

export const planToUrl = (plan: Plan) => `${window.location.origin}${window.location.pathname}#plan=${encode(JSON.stringify(plan))}`
export const planFromUrl = (): Plan | null => {
  try {
    const value = new URLSearchParams(window.location.hash.slice(1)).get('plan')
    if (!value || value.length > 12000) return null
    const parsed: unknown = JSON.parse(decode(value))
    return isPlan(parsed) ? parsed : null
  } catch {
    return null
  }
}
export { isPlan }
