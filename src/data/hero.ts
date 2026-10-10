import { linksConfig } from "@/config/links";

export interface HeroCTA {
  label: string;
  href: string;
  variant: "primary" | "outline";
  ariaLabel?: string;
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
      href: "#team",
      variant: "outline",
      ariaLabel: "Learn more about GDG RBU and the team",
    },
    {
      label: "JOIN",
      href: linksConfig.login,
      variant: "outline",
      ariaLabel: "Join GDG RBU: sign in to the events platform",
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
