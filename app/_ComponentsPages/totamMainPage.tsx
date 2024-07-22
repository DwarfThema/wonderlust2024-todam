"use client";

import { useState } from "react";
import Todam1Start from "./todam1Start";
import Todam2Name from "./todam2Name";
import Todam4MakingLoading from "./todam4MakingLoading";
import Todam5Outcome from "./todam5Outcome";
import Todam6SaveShare from "./todam6SaveShare";
import TodamCanvas from "./todamCanvasPage";
import Todam3Ready from "./todam3Ready";
import LoadingScreen from "./loadingScreen";

export default function TotamMainPage() {
  // 0 카드 월드
  // 1 시작페이지
  // 2 이름입력
  // 3 이런사진 좋아요 / 카드만들기 시작
  // 4 만드는 로딩화면
  // 5 결과물 카드
  // 6 저장 공유 씬
  const [sequence, setSequence] = useState(6);

  return (
    <div className="absolute h-screen min-w-full">
      <button
        className="z-50 text-black text-center absolute top-0 left-0  bg-white"
        onClick={() =>
          setSequence((prev) => {
            if (prev === 5) {
              return 6;
            } else {
              return 5;
            }
          })
        }
      >
        상태변경
      </button>
      {/* <LoadingScreen /> */}
      {sequence !== 7 && (
        <TodamCanvas
          className="hidden lg:block"
          sequence={sequence}
          setSequence={setSequence}
        />
      )}

      {(sequence === 2 || sequence === 3 || sequence === 4) && (
        <div className="absolute top-0 left-0 w-full h-full bg-[#141319] opacity-90 -z-10" />
      )}

      {sequence === 1 && (
        <Todam1Start sequence={sequence} setSequence={setSequence} />
      )}
      {sequence === 2 && (
        <Todam2Name sequence={sequence} setSequence={setSequence} />
      )}
      {sequence === 3 && (
        <Todam3Ready sequence={sequence} setSequence={setSequence} />
      )}
      {sequence === 4 && (
        <Todam4MakingLoading sequence={sequence} setSequence={setSequence} />
      )}
      {sequence === 5 && (
        <Todam5Outcome sequence={sequence} setSequence={setSequence} />
      )}
      {sequence === 6 && (
        <Todam6SaveShare sequence={sequence} setSequence={setSequence} />
      )}
    </div>
  );
}
