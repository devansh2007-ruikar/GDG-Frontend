export interface SocialLink {
  id: string;
  name: string;
  href: string;
  icon: "instagram" | "linkedin" | "twitter";
  colorClass: string;
  ariaLabel: string;
}

export interface FooterData {
  title: string;
  subtitle: string;
  address: {
    institution: string;
    location: string;
  };
  contact: {
    email: string;
    mailto: string;
  };
  socials: {
    title: string;
    links: SocialLink[];
  };
  credit: {
    text: string;
    author: string;
    profileUrl: string;
  };
  shapesBannerSrc: string;
}

export const footerData: FooterData = {
  title: "Google Developer Groups",
  subtitle: "On Campus • Ramdeobaba University",
  address: {
    institution: "Ramdeobaba University",
    location: "Ramdeo Tekdi, Gittikhadan, Katol Road, Nagpur-440013",
  },
  contact: {
    email: "gdg@rknec.edu",
    mailto: "mailto:gdg@rknec.edu",
  },
  socials: {
    title: "Follow Us:",
    links: [
      {
        id: "instagram",
        name: "Instagram",
        href: "https://instagram.com/gdsc_rcoem",
        icon: "instagram",
        colorClass: "bg-gdg-red text-white",
        ariaLabel: "GDG RBU on Instagram",
      },
      {
        id: "linkedin",
        name: "LinkedIn",
        href: "https://linkedin.com/company/gdsc-rcoem",
        icon: "linkedin",
        colorClass: "bg-gdg-blue text-white",
        ariaLabel: "GDG RBU on LinkedIn",
      },
      {
        id: "twitter",
        name: "X (Twitter)",
        href: "https://x.com/gdsc_rcoem",
        icon: "twitter",
        colorClass: "bg-gdg-green text-black",
        ariaLabel: "GDG RBU on X",
      },
    ],
  },
  credit: {
    text: "Built with passion for GDG RBU Recruitment 2026-27",
    author: "Devansh Ruikar",
    profileUrl: "https://github.com/devansh2007-ruikar",
  },
  shapesBannerSrc: "/decorative-shapes.svg",
};
