import Icon from "./Icon";

type Props = {
  text: string;
  href: string;
  icon: string;
  className?: string;
};

export default function SocialLink({ text, href, icon, className }: Props) {
  return (
    <a
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition duration-300 ${className || ""}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={text}
    >
      <Icon icon={icon} className="h-5 w-5 overflow-visible fill-current" />
    </a>
  );
}
