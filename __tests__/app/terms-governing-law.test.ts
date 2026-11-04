/**
 * @jest-environment node
 */
import fs from 'node:fs'
import path from 'node:path'

// The club is at Shaw AFB, South Carolina (PO Box 52337, Shaw AFB, SC 29152);
// the template's default governing-law state must not come back on a merge.
describe('Terms of Service governing law', () => {
  const src = fs.readFileSync(
    path.join(__dirname, '..', '..', 'src', 'app', 'terms-of-service', 'page.tsx'),
    'utf8'
  )

  it('names South Carolina', () => {
    expect(src).toMatch(/State of South Carolina/)
  })

  it('no longer names the template default, North Carolina', () => {
    expect(src).not.toMatch(/North Carolina/)
  })
})
