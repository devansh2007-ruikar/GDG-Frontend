export interface NavItem {
  id: string;
  label: string;
  href: string;
  colorVariant: "pill-blue" | "pill-red" | "pill-yellow" | "pill-green" | "pill-purple" | "pill-cyan";
  ariaLabel: string;
}

export interface NavigationData {
  logo: {
    src: string;
    alt: string;
    href: string;
  };
  items: NavItem[];
}

export const navigationData: NavigationData = {
  logo: {
    src: "/gdg-logo.svg",
    alt: "Google Developer Groups RBU Logo",
    href: "#hero",
  },
  items: [
    {
      id: "home",
      label: "Home",
      href: "#hero",
      colorVariant: "pill-blue",
      ariaLabel: "Navigate to Home section",
    },
    {
      id: "team",
      label: "Team",
      href: "#team",
      colorVariant: "pill-red",
      ariaLabel: "Navigate to Meet the Team section",
    },
    {
      id: "events",
      label: "Events",
      href: "#upcoming-event",
      colorVariant: "pill-yellow",
      ariaLabel: "Navigate to Upcoming Event section",
    },
    {
      id: "gallery",
      label: "Gallery",
      href: "#team",
      colorVariant: "pill-green",
      ariaLabel: "Navigate to Gallery & Team section",
    },
    {
      id: "portfolio",
      label: "Portfolio",
      href: "#upcoming-event",
      colorVariant: "pill-purple",
      ariaLabel: "Navigate to Project Portfolio",
    },
    {
      id: "more",
      label: "More",
      href: "#faqs",
      colorVariant: "pill-blue",
      ariaLabel: "Explore More and FAQs",
    },
  ],
};
