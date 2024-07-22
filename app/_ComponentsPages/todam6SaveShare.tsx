import { CardCss } from "../_Components/todam_cardCss";

export default function Todam6SaveShare({
  sequence,
  setSequence,
}: {
  sequence: number;
  setSequence: (sequence: number) => void;
}) {
  return (
    <div className="flex flex-col text-center items-center justify-center h-full absolute min-w-full bg-[#141319] bg-opacity-100 lg:bg-opacity-0">
      <h1>Todam6SaveShare</h1>

      <section className="cards flex flex-col w-screen items-center justify-evenly md:flex-row">
        <CardCss />
      </section>
    </div>
  );
}
