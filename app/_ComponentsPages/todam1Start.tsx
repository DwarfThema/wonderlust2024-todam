import { useEffect } from "react";
import TodamButton from "./todamButton";
import Image from "next/image";
import Title from "@/public/title/dotam_title_1.png";

export default function Todam1Start({
  sequence,
  setSequence,
}: {
  sequence: number;
  setSequence: (sequence: number) => void;
}) {
  return (
    <div className="flex flex-col text-center items-center justify-center absolute h-full min-w-full">
      <div className="flex flex-col items-center">
        <Image src={Title} alt="title" className="h-auto w-[350px]" />
      </div>
      <div className="h-[30%] w-full" />
      <div className="flex flex-col gap-2 items-center">
        <div>지금까지 수집된 카드 9,999,999장</div>
        <div className="flex flex-col gap-2 justify-center">
          <div className="w-[200px]">
            <TodamButton isBlue={true} onClick={() => setSequence(0)}>
              수집된 카드 구경하기
            </TodamButton>
          </div>
          <div className="w-[200px]">
            <TodamButton isBlue={false} onClick={() => setSequence(2)}>
              카드 만들기
            </TodamButton>
          </div>
        </div>
      </div>
    </div>
  );
}
