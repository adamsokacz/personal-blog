type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionHeading({ children, className }: Props) {
  return (
    <h2
      className={`text-sm tracking-wider text-slate-900 uppercase after:mt-4 after:block after:h-px after:w-16 after:bg-primary after:content-[''] ${className || ""}`}
    >
      {children}
    </h2>
  );
}
