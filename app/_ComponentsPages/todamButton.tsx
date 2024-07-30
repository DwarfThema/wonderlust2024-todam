import Image from "next/image";

export default function TodamButton({
  onClick,
  children,
  className,
  isBlue = true,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  isBlue: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`${
        isBlue ? " text-white" : " text-neutral-900"
      } w-full h-full bg-center relative text-center flex justify-center items-center cursor-pointer
       px-4 py-2 rounded-md ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <Image
        src={
          isBlue
            ? "/elements/Todam_Button_Short_Blue.png"
            : "/elements/Todam_Button_Short.png"
        }
        alt="Todam Button"
        className="absolute"
        fill
      />
    </div>
  );
}
