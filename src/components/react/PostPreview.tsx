import FormattedDate from "./FormattedDate";
import CustomImage from "./CustomImage";

type Props = {
  id: string;
  title: string;
  publishDate: Date;
  updatedDate?: Date;
  excerpt?: string;
  featured?: boolean;
  featureImage?: { src: string; alt?: string };
};

export default function PostPreview({
  id,
  title,
  publishDate,
  updatedDate,
  excerpt,
  featured,
  featureImage,
}: Props) {
  return (
    <article className="post-card mb-12 sm:mb-16">
      <header className="post-card-header">
        <div className="mb-2 text-sm uppercase tracking-wider text-slate-500">
          {featured && (
            <>
              <span className="text-primary">Featured</span>
              {" / "}
            </>
          )}
          <FormattedDate date={publishDate} />
          {updatedDate && (
            <span>
              {" "}
              (Updated on <FormattedDate date={updatedDate} />)
            </span>
          )}
        </div>
        <h2 className="text-3xl font-bold text-slate-900">
          <a href={`/blog/${id}/`}>{title}</a>
        </h2>
      </header>
      {featureImage?.src && (
        <figure className="post-card-thumbnail mt-6 mb-6 xl:mt-7 xl:mb-0">
          <a href={`/blog/${id}/`}>
            <CustomImage
              src={featureImage.src}
              alt={featureImage.alt}
              className="w-full rounded-md"
            />
          </a>
        </figure>
      )}
      {excerpt && (
        <div className="post-card-content mt-4">
          <div className="prose prose-slate max-w-none sm:prose-lg">{excerpt}</div>
        </div>
      )}
    </article>
  );
}
