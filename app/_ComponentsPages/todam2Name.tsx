import TodamButton from "./todamButton";

export default function Todam2Name({
  sequence,
  setSequence,
}: {
  sequence: number;
  setSequence: (sequence: number) => void;
}) {
  return (
    <div className="flex flex-col text-center items-center justify-center absolute h-full min-w-full">
      <form action="" className="flex flex-col gap-4">
        <div>이름을 입력해주세요</div>
        <input
          type="text"
          placeholder="여기요!"
          className="bg-neutral-200 text-neutral-900 px-4 py-2 rounded-md"
        />
        <TodamButton onClick={() => setSequence(3)}>
          이름을 입력해주세요
        </TodamButton>
      </form>
    </div>
  );
}
