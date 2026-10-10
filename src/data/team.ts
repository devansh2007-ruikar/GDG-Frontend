export interface TeamPillar {
  id: string;
  title: string;
  description: string;
  iconName: "lightbulb" | "rocket";
}

export interface TeamData {
  heading: string;
  description: string;
  pillars: TeamPillar[];
  photo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export const teamData: TeamData = {
  heading: "Meet the Google Developer Group Team",
  description:
    "Google Developer Groups (GDG) are open and volunteer-run communities for developers interested in Google technologies. Our team focuses on learning, networking, and collaboration through events and hands-on sessions.",
  pillars: [
    {
      id: "leaders",
      title: "Passionate Community Leaders",
      description:
        "Our organizers build an inclusive environment where developers can connect, share knowledge, and grow together.",
      iconName: "lightbulb",
    },
    {
      id: "developers",
      title: "Empowering Developers",
      description:
        "We host meetups and workshops to help developers stay current with modern tools and best practices.",
      iconName: "rocket",
    },
  ],
  photo: {
    src: "/team.webp",
    alt: "Google Developer Group RBU Team Members Group Photo",
    width: 424,
    height: 604,
  },
};
