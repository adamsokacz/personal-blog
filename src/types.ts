export type ImageInput = {
  src: string;
  alt?: string;
};

export type NavLink = {
  text: string;
  href: string;
};

export type SocialLink = NavLink & {
  icon: "github" | "linkedin" | "x" | "bluesky";
};

export type Hero = {
  title?: string;
  text?: string;
  avatar?: ImageInput;
  backgroundImage?: ImageInput;
};

export type SiteConfig = {
  logo?: ImageInput;
  title: string;
  description: string;
  image?: ImageInput;
  primaryNavLinks: NavLink[];
  secondaryNavLinks?: NavLink[];
  socialLinks: SocialLink[];
  hero?: Hero;
  postsPerPage: number;
};

export type PostMeta = {
  title: string;
  excerpt?: string;
  publishDate: Date;
  updatedDate?: Date;
  featureImage?: ImageInput & { caption?: string };
  featured?: boolean;
  draft?: boolean;
  tags?: string[];
  pdf?: string;
  type: "markdown" | "pdf";
};

export type ProjectLink = {
  text: string;
  href: string;
};

export type ProjectType = "work project" | "personal project" | "school project" | "course project" | "school club";

export type ProjectTopic =
  | "Simulation"
  | "Robotics & Embedded Systems"
  | "AI & Software"
  | "Finance"
  | "Other";

export type Project = {
  title: string;
  category: ProjectType;
  topic: ProjectTopic;
  /** Lower values appear first within the same topic section. */
  listPositionOverride: number;
  organization?: string;
  bullets: string[];
  links?: ProjectLink[];
};
