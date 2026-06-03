import type { Hero as HeroType, SocialLink as SocialLinkType } from "../../types";
import SocialLink from "./SocialLink";
import CustomImage from "./CustomImage";

type Props = HeroType & {
  socialLinks?: SocialLinkType[];
};

export default function Hero({ title, text, avatar, backgroundImage, socialLinks }: Props) {
  if (!title && !text && !avatar?.src) return null;

  return (
    <>
      {backgroundImage?.src && (
        <CustomImage
          src={backgroundImage.src}
          alt={backgroundImage.alt}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
          loading="eager"
        />
      )}
      <section className="relative px-4 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          {avatar?.src && (
            <div className="mb-6 p-6">
              <CustomImage
                src={avatar.src}
                alt={avatar.alt || ""}
                className="aspect-square w-32 rounded-full border-2 border-primary object-cover shadow-avatar"
                loading="eager"
                width={128}
                height={128}
              />
            </div>
          )}
          {title && (
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">{title}</h1>
          )}
          {text && (
            <p className={`text-slate-700 sm:text-lg ${title ? "mt-4" : ""}`}>{text}</p>
          )}
          {socialLinks && socialLinks.length > 0 && (
            <div className={`flex flex-wrap justify-center gap-x-4 gap-y-3 ${title || text ? "mt-8" : ""}`}>
              {socialLinks.map((link) => (
                <SocialLink
                  key={link.href}
                  {...link}
                  className="bg-white text-slate-700 hover:bg-primary hover:text-white hover:shadow-button"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
