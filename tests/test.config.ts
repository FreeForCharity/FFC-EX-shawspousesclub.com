/**
 * Test Configuration for Template Customization
 *
 * This file contains all content-specific values used in E2E tests.
 * When customizing this template for a new organization, update these
 * values to match your content instead of modifying individual test files.
 *
 * This makes it easy to:
 * 1. Identify what needs to change when using the template
 * 2. Keep tests working with customized content
 * 3. Maintain a single source of truth for test expectations
 */

import { analyticsConfig, isConfigured } from '../src/lib/analytics.config'
import { isSupportingOrgSite, siteConfig } from '../src/lib/site.config'
import { results } from '../src/data/results'
import { configuredTestimonials } from '../src/data/testimonials'

export const testConfig = {
  /**
   * What this build renders, so specs about content a site may not have skip
   * instead of failing. A provisioned charity site has none of the supporting
   * organization's own content (mission video, application form) and may have
   * no results or testimonials yet; those sections then self-hide.
   */
  site: {
    isSupporter: isSupportingOrgSite(),
    hasResults: results.stats.length > 0,
    testimonialCount: configuredTestimonials.length,
  },

  /**
   * Mission Video Configuration
   * Used in: tests/mission-video.spec.ts
   */
  missionVideo: {
    ariaLabel: 'Free For Charity mission video',
    playLabel: 'Play the Free For Charity mission video',
    title: "Learn about Free For Charity's mission to help nonprofits reduce costs",
  },

  /**
   * Application Form Configuration
   * Used in: tests/application-form.spec.ts
   */
  applicationForm: {
    buttonText: 'Apply to Become a Supported Charity',
    modalTitle: 'Charity Application Form',
    loadingText: 'Loading application form...',
    closeButtonAriaLabel: 'Close application form',
  },

  /**
   * Events Section Configuration
   * Used in: tests/events.spec.ts
   */
  events: {
    sectionId: 'events',
    heading: 'Upcoming Events',
    footerLinkText: 'Events',
    facebookLinkText: 'View all events on Facebook',
    // Sourced from siteConfig so the expected link always matches what the
    // Events component renders (single source of truth).
    facebookUrl: siteConfig.integrations.eventsFacebookPageUrl,
    descriptionText: 'volunteer opportunities',
    emptyStateHeading: 'No upcoming events right now',
    emptyStateButton: 'Follow us on Facebook',
  },

  /**
   * Social Media Links Configuration
   * Used in: tests/social-links.spec.ts
   */
  // Sourced from siteConfig.social (links with an href), the list the footer
  // renders; each link's aria-label is its label.
  socialLinks: siteConfig.social.filter((link) => link.href.trim()),

  /**
   * Copyright Configuration
   * Used in: tests/copyright.spec.ts
   */
  copyright: {
    text: `All Rights Are Reserved by ${siteConfig.name} ${siteConfig.taxStatusLabel}`.trim(),
    searchText: 'All Rights Are Reserved',
    // The permanent "Supported by" attribution (FFC footer standard) — sourced
    // from siteConfig.supportedBy, which is required and always rendered.
    supportedByUrl: siteConfig.supportedBy.url,
    supportedByText: siteConfig.supportedBy.name,
    // Sourced from siteConfig so the parent-org link expectations track the
    // footer (which now shows the org name, not the raw URL, as link text).
    linkUrl: siteConfig.parentOrg?.url ?? '',
    linkText: siteConfig.parentOrg?.name ?? siteConfig.name,
  },

  /**
   * Animated Numbers Configuration
   * Used in: tests/animated-numbers.spec.ts
   */
  // Sourced from src/data/results.ts, which the Results section renders.
  animatedNumbers: {
    sectionHeading: results.heading,
    statistics: results.stats.map((stat) => ({ description: stat.label, value: stat.value })),
  },

  /**
   * Google Tag Manager Configuration
   * Used in: tests/google-tag-manager.spec.ts
   *
   * Sourced from the same src/lib/analytics.config.ts the component reads, so
   * the expected ID always matches what the build embedded. A charity site's
   * id is empty until its own container is provisioned; the site then renders
   * no tag, and the specs that need the tag itself skip (the consent test,
   * which needs only the dataLayer, still runs). `configured` uses the same
   * isConfigured() test the loader does.
   */
  googleTagManager: {
    id: analyticsConfig.gtmId.trim(),
    configured: isConfigured(analyticsConfig.gtmId),
  },

  /**
   * Logo Configuration
   * Used in: tests/logo.spec.ts
   */
  logo: {
    // The header logo's alt text is the site name (src/components/header).
    headerAlt: siteConfig.name,
    heroAlt: 'Hero image',
    navBarAriaLabel: `${siteConfig.name} home`,
  },

  /**
   * Cookie Consent Configuration
   * Used in: tests/cookie-consent.spec.ts
   */
  cookieConsent: {
    bannerHeading: 'We Value Your Privacy',
    modalHeading: 'Cookie Preferences',
    buttons: {
      acceptAll: 'Accept All',
      declineAll: 'Decline All',
      customize: 'Customize',
      savePreferences: 'Save Preferences',
      cancel: 'Cancel',
    },
  },
}
