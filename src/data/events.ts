export interface UpcomingEventData {
  sectionTitle: string;
  orientationCard: {
    tag: string;
    title: string;
    description: string;
    actionHref: string;
  };
  featuredCard: {
    badge: string;
    title: string;
    dateLabel: string;
    date: string;
    time: string;
    ctaText: string;
    ctaHref: string;
  };
}

export const upcomingEventData: UpcomingEventData = {
  sectionTitle: "Upcoming Event",
  orientationCard: {
    tag: "GDG ORIENTATION",
    title: "GDG ORIENTATION",
    description:
      "Google Developer Groups (GDG) - Student Chapter is a community of students passionate about technology, innovation, and learning. We bring students together to learn, build, and grow through technical workshops, hands-on sessions, hackathons, projects, and networking.",
    actionHref: "#team",
  },
  featuredCard: {
    badge: "FEATURED",
    title: "New Event",
    dateLabel: "DATE & TIME",
    date: "Oct 7, 2024",
    time: "3:00 PM",
    ctaText: "Register Now",
    ctaHref: "https://gdg.community.dev/events",
  },
};
