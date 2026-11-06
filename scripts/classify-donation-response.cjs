/**
 * A provider challenge means automation could not verify the form, not that it works.
 *
 * Zeffy sits behind Cloudflare, which answers an automated probe in one of two
 * ways, both HTTP 403 from a `server: cloudflare` response:
 *   - a block page: "Attention Required! | Cloudflare" / "Sorry, you have been
 *     blocked" (seen from curl); or
 *   - a managed challenge: "Just a moment..." with the `cf-mitigated: challenge`
 *     header (seen from Node's fetch, which is what the smoke test uses).
 * Either one is reported as 'automation-blocked' (a warning, not a pass). Any
 * other non-2xx/3xx answer, including a plain 403, stays 'unreachable'.
 */
function classifyDonationResponse({ provider, status, server = '', body = '', mitigated = '' }) {
  const fromCloudflare = provider === 'zeffy' && status === 403 && /cloudflare/i.test(server)
  const blockPage =
    /Attention Required!\s*(?:&#124;|\|)\s*Cloudflare/i.test(body) &&
    /Sorry, you have been blocked/i.test(body)
  const managedChallenge = /^challenge$/i.test(String(mitigated).trim())
  if (fromCloudflare && (blockPage || managedChallenge)) return 'automation-blocked'
  return status >= 200 && status < 400 ? 'reachable' : 'unreachable'
}

module.exports = { classifyDonationResponse }
