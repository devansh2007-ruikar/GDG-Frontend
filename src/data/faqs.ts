export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export interface FAQsData {
  sectionTitle: string;
  items: FAQItem[];
}

export const faqsData: FAQsData = {
  sectionTitle: "FAQs",
  items: [
    {
      id: "faq-what-is-gdg",
      question: "What is GDG RBU?",
      answer:
        "GDG RBU is focused on empowering students through hands-on workshops, tech talks, hackathons, and real-world project collaboration.",
      defaultOpen: true,
    },
    {
      id: "faq-how-to-join",
      question: "How to join GDG?",
      answer:
        "You can join GDG RBU by registering on our community platform, following our announcement channels, and attending our introductory onboarding workshops and hackathons.",
      defaultOpen: false,
    },
    {
      id: "faq-gdg-lead",
      question: "What does a GDG Lead do?",
      answer:
        "A GDG Lead organizes campus tech initiatives, coordinates hands-on workshops with industry mentors, supports student developers, and collaborates with Google Developer relations.",
      defaultOpen: false,
    },
    {
      id: "faq-related-to-google",
      question: "How is GDG related to Google?",
      answer:
        "GDG chapters are university and professional developer communities supported by Google Developers, providing resources, curriculum, and mentorship while remaining student-led.",
      defaultOpen: false,
    },
    {
      id: "faq-reach-us",
      question: "How to reach us?",
      answer:
        "You can reach us through email at gdg@rknec.edu, connect on our official LinkedIn and Instagram handles, or visit the Department of Computer Science & Engineering at Ramdeobaba University.",
      defaultOpen: false,
    },
  ],
};
