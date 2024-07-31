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
    }, 12000);
  }, []);

  return (
    <div className="flex flex-col text-center items-center justify-center absolute h-full min-w-full">
      <div className="w-[300px] h-[50px] absolute bottom-[10%] ">
        <TodamButton
          isBlue={true}
          className={`transition-opacity duration-500 ${
            isShowing ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSequence(5)}
        >
          <h1>Continue</h1>
        </TodamButton>
      </div>
    </div>
  );
}
