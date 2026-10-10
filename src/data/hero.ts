export interface HeroCTA {
  label: string;
  href: string;
  variant: "primary" | "outline";
}

export interface HeroData {
  heading: string;
  subheading: string;
  ctas: HeroCTA[];
  badge: {
    label: string;
    rotationDeg: number;
  };
  graphic: {
    alt: string;
    src: string;
    tagText: string;
  };
}

export const heroData: HeroData = {
  heading: "GOOGLE DEVELOPER GROUPS, RBU",
  subheading:
    "Empowering students with cutting-edge tech skills, community, and resources for a future in technology",
  ctas: [
    {
      label: "LEARN MORE",
      href: "#upcoming-event",
      variant: "outline",
    },
    {
      label: "JOIN US",
      href: "https://gdg.community.dev",
      variant: "outline",
    },
  ],
  badge: {
    label: "GDG • RBU",
    rotationDeg: -4,
  },
  graphic: {
    alt: "GDG Retro Terminal Graphic",
    src: "/hero-graphic.svg",
    tagText: "gdgrbu.app",
  },
};
