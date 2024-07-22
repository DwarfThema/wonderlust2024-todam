import Image from "next/image";
import TotamMainPage from "./_ComponentsPages/totamMainPage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col min-w-screen justify-center items-center w-auto h-auto text-white">
      <TotamMainPage />
    </main>
  );
}
