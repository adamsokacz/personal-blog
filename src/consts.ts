import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Adam Sokacz",
  DESCRIPTION: "A personal blog on manufacturing, finance, and industrial automation.",
  EMAIL: "contact@adamsokacz.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Adam Sokacz's personal blog.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/adamsokacz",
  },
  {
    NAME: "GitHub",
    HREF: "https://github.com/adamsokacz",
  },
  {
    NAME: "Website",
    HREF: "https://adamsokacz.com",
  },
];
