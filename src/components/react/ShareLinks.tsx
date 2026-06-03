type Props = {
  title: string;
  url: string;
};

export default function ShareLinks({ title, url }: Props) {
  return (
    <div className="mt-8 flex flex-wrap gap-x-3 gap-y-1 text-sm sm:mt-12 sm:text-base">
      <span className="font-semibold">Share:</span>
      <a
        className="text-primary transition duration-300 hover:text-slate-700"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        LinkedIn
      </a>
      <a
        className="text-primary transition duration-300 hover:text-slate-700"
        href={`https://bsky.app/intent/compose?text=${encodeURIComponent(title + " " + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Bluesky"
      >
        Bluesky
      </a>
      <a
        className="text-primary transition duration-300 hover:text-slate-700"
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
      >
        X/Twitter
      </a>
    </div>
  );
}
