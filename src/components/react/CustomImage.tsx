type Props = {
  src: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
};

export default function CustomImage({
  src,
  alt = "",
  className,
  loading = "lazy",
  width,
  height,
}: Props) {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      width={width}
      height={height}
    />
  );
}
