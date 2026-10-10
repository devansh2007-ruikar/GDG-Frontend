import { linksConfig } from "@/config/links";

export interface UpcomingEventData {
  sectionTitle: string;
  orientationCard: {
    tag: string;
    title: string;
    description: string;
    actionHref: string;
    actionAriaLabel?: string;
  };
  featuredCard: {
    badge: string;
    title: string;
    dateLabel: string;
    date: string;
    time: string;
    ctaText: string;
    ctaHref: string;
    ctaAriaLabel?: string;
  };
  viewAllLink: {
    text: string;
    href: string;
    ariaLabel: string;
  };
}

export const upcomingEventData: UpcomingEventData = {
  sectionTitle: "Upcoming Event",
  orientationCard: {
    tag: "GDG ORIENTATION",
    title: "GDG ORIENTATION",
    description:
      "Google Developer Groups (GDG) - Student Chapter is a community of students passionate about technology, innovation, and learning. We bring students together to learn, build, and grow through technical workshops, hands-on sessions, hackathons, projects, and networking.",
    actionHref: linksConfig.events,
    actionAriaLabel: "Explore and register for GDG RBU events on the platform",
  },
  featuredCard: {
    badge: "FEATURED",
    title: "New Event",
    dateLabel: "DATE & TIME",
    date: "Oct 7, 2024",
    time: "3:00 PM",
    ctaText: "Register Now",
    ctaHref: linksConfig.events,
    ctaAriaLabel: "Register for GDG RBU events: view upcoming schedule and RSVP",
  },
  viewAllLink: {
    text: "View all events →",
    href: linksConfig.events,
    ariaLabel: "View all upcoming and past GDG RBU events on the platform",
  },
};
