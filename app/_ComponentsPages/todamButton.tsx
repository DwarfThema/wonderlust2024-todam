export default function TodamButton({
  onClick,
  children,
  className,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`bg-neutral-600 text-white px-4 py-2 rounded-md ${className}`}
    >
      {children}
    </button>
  );
}
