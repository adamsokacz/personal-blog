import type { SiteConfig } from "../types";

const siteConfig: SiteConfig = {
  title: "Adam Sokacz",
  description:
    "A personal blog on manufacturing, finance, and industrial automation.",
  primaryNavLinks: [
    { text: "Home", href: "/" },
    { text: "Projects", href: "/projects" },
  ],
  socialLinks: [
    {
      text: "LinkedIn",
      href: "https://www.linkedin.com/in/adamsokacz",
      icon: "linkedin",
    },
    {
      text: "GitHub",
      href: "https://github.com/adamsokacz",
      icon: "github",
    },
  ],
  hero: {
    title: "Hi there!",
    text: "I'm Adam Sokacz. I am interested in the implementation of Physical AI in the Industrial Automation industry using the NVIDIA Omniverse, Cosmos, and Metropolis platforms.",
    avatar: {
      src: "/profile_photo.png",
      alt: "Adam Sokacz",
    },
    backgroundImage: {
      src: "/hero_bg.webp",
    },
  },
  postsPerPage: 5,
};

export default siteConfig;
