import { useEffect, useState } from "react";

export default function Todam4MakingLoading({
  sequence,
  setSequence,
}: {
  sequence: number;
  setSequence: (sequence: number) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSequence(5);
    }, 5000);
  }, []);

  return (
    <div className="flex flex-col text-center items-center justify-center absolute h-full min-w-full">
      <h1>Todam4MakingLoading</h1>
    </div>
  );
}
