import { createRequire } from 'module'
import path from 'path'

const requireScript = createRequire(path.join(process.cwd(), 'package.json'))
const { classifyDonationResponse } = requireScript('./scripts/classify-donation-response.cjs')

const block = {
  provider: 'zeffy',
  status: 403,
  server: 'cloudflare',
  body: '<title>Attention Required! | Cloudflare</title><h1>Sorry, you have been blocked</h1>',
}

describe('donation response classification', () => {
  it('reports the exact observed Zeffy challenge as unverified by automation', () => {
    expect(classifyDonationResponse(block)).toBe('automation-blocked')
  })
  // What Node's fetch (the smoke test's client) actually receives from Zeffy:
  // Cloudflare's managed challenge, flagged by the cf-mitigated header.
  const challenge = {
    provider: 'zeffy',
    status: 403,
    server: 'cloudflare',
    mitigated: 'challenge',
    body: '<title>Just a moment...</title>',
  }
  it("reports Cloudflare's managed challenge (cf-mitigated: challenge) as unverified", () => {
    expect(classifyDonationResponse(challenge)).toBe('automation-blocked')
  })
  it.each([
    { ...challenge, provider: 'paypal' },
    { ...challenge, status: 404 },
    { ...challenge, server: 'nginx' },
    { ...challenge, mitigated: '' },
    { ...challenge, mitigated: 'block' },
  ])('keeps a challenge-like response that is not from Zeffy on Cloudflare a failure: %j', (r) => {
    expect(classifyDonationResponse(r)).toBe('unreachable')
  })
  it.each([
    { ...block, provider: 'paypal' },
    { ...block, status: 404 },
    { ...block, server: 'nginx' },
    { ...block, body: 'Forbidden' },
    { ...block, body: '<h1>Sorry, you have been blocked</h1>' },
  ])('keeps ordinary errors as failures: %j', (response) => {
    expect(classifyDonationResponse(response)).toBe('unreachable')
  })
  it('accepts a successful provider response', () => {
    expect(classifyDonationResponse({ provider: 'zeffy', status: 200 })).toBe('reachable')
  })
  it('keeps connection failures as failures', () => {
    expect(classifyDonationResponse({ provider: 'zeffy', status: 0 })).toBe('unreachable')
  })
})
