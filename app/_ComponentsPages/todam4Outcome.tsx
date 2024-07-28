import { useEffect, useState } from "react";
import TodamButton from "./todamButton";

export default function Todam5Outcome({
  sequence,
  setSequence,
}: {
  sequence: number;
  setSequence: (sequence: number) => void;
}) {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShowing(true);
    }, 10000);
  }, []);

  return (
    <div className="flex flex-col text-center items-center justify-center absolute h-full min-w-full">
      <h1 className="absolute top-[5%]">Todam5Outcome</h1>
      <TodamButton
        className={`absolute bottom-[10%] transition-opacity duration-500 ${
          isShowing ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setSequence(5)}
      >
        <h1>Continue</h1>
      </TodamButton>
    </div>
  );
}
