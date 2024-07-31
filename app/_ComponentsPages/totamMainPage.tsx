"use client";

import { useState } from "react";
import Todam1Start from "./todam1Start";
import Todam2Name from "./todam2Name";
import Todam4Outcome from "./todam4Outcome";
import Todam5SaveShare from "./todam5SaveShare";
import TodamCanvas from "./todamCanvasPage";
import Todam3Ready from "./todam3Ready";
import LoadingScreen from "./loadingScreen";
import { isMobile } from "react-device-detect";

export default function TotamMainPage() {
  // 0 카드 월드
  // 1 시작페이지
  // 2 이름입력
  // 3 이런사진 좋아요 / 카드만들기 시작 누르세요 / 만드는 로딩화면
  // 4 결과물 애니메이션
  // 5 저장 공유 씬

  const [sequence, setSequence] = useState(4);

  const [name, setName] = useState("");
  const [aiImageUrl, setAiImageUrl] = useState("");

  return (
    <div className="flex justify-center ">
      {isMobile ? (
        sequence === 5 ? null : (
          <TodamCanvas
            sequence={sequence}
            setSequence={setSequence}
            aiImageUrl={aiImageUrl}
          />
        )
      ) : (
        <TodamCanvas
          sequence={sequence}
          setSequence={setSequence}
          aiImageUrl={aiImageUrl}
        />
      )}

      {sequence === 2 || sequence === 3 ? (
        <div className="fixed top-0 left-0 w-full h-full bg-[#141319] opacity-90 -z-10" />
      ) : sequence === 5 ? (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-[#141319] ${
            isMobile ? "opacity-100" : "opacity-40"
          } -z-10`}
        />
      ) : null}

      {sequence !== 5 && (
        <div className="flex min-h-screen flex-col min-w-screen justify-center items-center w-auto h-auto text-white">
          {/* <LoadingScreen /> */}

          {sequence === 1 && (
            <Todam1Start sequence={sequence} setSequence={setSequence} />
          )}
          {sequence === 2 && (
            <Todam2Name
              sequence={sequence}
              setSequence={setSequence}
              setName={setName}
            />
          )}
          {sequence === 3 && (
            <Todam3Ready
              sequence={sequence}
              setSequence={setSequence}
              name={name}
              setAiImageUrl={setAiImageUrl}
            />
          )}
          {sequence === 4 && (
            <Todam4Outcome sequence={sequence} setSequence={setSequence} />
          )}
        </div>
      )}

      {sequence === 5 && (
        <Todam5SaveShare
          aiImageUrl={aiImageUrl}
          sequence={sequence}
          setSequence={setSequence}
        />
      )}
    </div>
  );
}
