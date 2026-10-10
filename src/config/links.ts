/**
 * Centralized Configuration for External Platform & Navigation Links.
 * Connects this landing page directly to the live full-stack Event Management platform.
 * 
 * Target Platform: https://gdg-iota-inky.vercel.app
 * Architecture: Next.js Frontend + Express & PostgreSQL Backend
 */

export const DEFAULT_EVENTS_APP_URL = "https://gdg-iota-inky.vercel.app";

/**
 * Live Event Management App base URL loaded from environment with production fallback.
 */
export const EVENTS_APP_URL: string = (
  process.env.NEXT_PUBLIC_EVENTS_APP_URL || DEFAULT_EVENTS_APP_URL
).replace(/\/$/, "");

export const linksConfig = {
  /** Base URL of the Event Management Platform */
  eventsApp: EVENTS_APP_URL,
  /** Direct Authentication / Join link */
  login: `${EVENTS_APP_URL}/login`,
  /** Events Listing & Registration link */
  events: `${EVENTS_APP_URL}/events`,
  /** User Dashboard link */
  dashboard: `${EVENTS_APP_URL}/dashboard`,
} as const;

export type LinksConfig = typeof linksConfig;
