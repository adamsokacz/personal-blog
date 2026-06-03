import FormattedDate from "./FormattedDate";
import CustomImage from "./CustomImage";

type Props = {
  id: string;
  title: string;
  publishDate: Date;
  updatedDate?: Date;
  featureImage?: { src: string; alt?: string };
};

export default function ReadNextPostPreview({
  id,
  title,
  publishDate,
  updatedDate,
  featureImage,
}: Props) {
  return (
    <article className="mb-12 flex flex-col gap-x-8 gap-y-6 sm:flex-row">
      <header className="grow">
        <div className="mb-2 text-sm uppercase tracking-wider text-slate-500">
          <FormattedDate date={publishDate} />
          {updatedDate && (
            <span>
              {" "}
              (Updated on <FormattedDate date={updatedDate} />)
            </span>
          )}
        </div>
        <h3 className="text-2xl font-bold text-slate-900">
          <a href={`/blog/${id}/`}>{title}</a>
        </h3>
      </header>
      {featureImage?.src && (
        <figure className="shrink-0 sm:w-40">
          <a href={`/blog/${id}/`}>
            <CustomImage
              src={featureImage.src}
              alt={featureImage.alt}
              className="w-full rounded-md"
            />
          </a>
        </figure>
      )}
    </article>
  );
}
