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
      <div className="flex flex-col gap-2">
        <div>지금까지 수집된 카드 9,999,999장</div>
        <TodamButton onClick={() => setSequence(0)}>
          수집된 카드 구경하기
        </TodamButton>
        <TodamButton onClick={() => setSequence(2)}>카드 만들기</TodamButton>
      </div>
    </div>
  );
}
