import FormattedDate from "./FormattedDate";
import CustomImage from "./CustomImage";

type Props = {
  id: string;
  title: string;
  publishDate: Date;
  updatedDate?: Date;
  excerpt?: string;
  featureImage?: { src: string; alt?: string };
};

export default function FeaturedPostPreview({
  id,
  title,
  publishDate,
  updatedDate,
  excerpt,
  featureImage,
}: Props) {
  return (
    <article className="mb-12 sm:mb-16">
      <header className="mx-auto max-w-3xl">
        <div className="mb-2 text-sm uppercase tracking-wider text-slate-500 sm:mb-3">
          <span className="text-primary">Featured</span>
          {" / "}
          <FormattedDate date={publishDate} />
          {updatedDate && (
            <span>
              {" "}
              (Updated on <FormattedDate date={updatedDate} />)
            </span>
          )}
        </div>
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
          <a href={`/blog/${id}/`}>{title}</a>
        </h2>
      </header>
      {featureImage?.src && (
        <figure className="mx-auto my-6 max-w-6xl sm:my-8">
          <a href={`/blog/${id}/`}>
            <CustomImage
              src={featureImage.src}
              alt={featureImage.alt}
              className="w-full rounded-md"
              loading="eager"
            />
          </a>
        </figure>
      )}
      {excerpt && (
        <div className="mx-auto mt-6 max-w-3xl">
          <div className="prose prose-slate max-w-none sm:prose-lg">{excerpt}</div>
        </div>
      )}
      <div className="mx-auto mt-8 max-w-3xl">
        <a
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-8 py-2.5 font-semibold text-white transition duration-300 hover:shadow-button"
          href={`/blog/${id}/`}
        >
          Continue Reading
        </a>
      </div>
    </article>
  );
}
