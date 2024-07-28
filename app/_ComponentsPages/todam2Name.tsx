"use client";

import TodamButton from "./todamButton";

export default function Todam2Name({
  sequence,
  setSequence,
  setName,
}: {
  sequence: number;
  setSequence: (sequence: number) => void;
  setName: (name: string) => void;
}) {
  return (
    <div className="flex flex-col text-center items-center justify-center absolute h-full min-w-full">
      <form
        action={(value) => {
          setName(value.get("name") as string);
          setSequence(3);
        }}
        className="flex flex-col gap-4"
      >
        <div>이름을 입력해주세요</div>
        <input
          name="name"
          type="text"
          placeholder="여기요!"
          className="bg-neutral-200 text-neutral-900 px-4 py-2 rounded-md"
          onChange={(e) => setName(e.target.value)}
        />
        <TodamButton>이름을 입력해주세요</TodamButton>
      </form>
    </div>
  );
}
