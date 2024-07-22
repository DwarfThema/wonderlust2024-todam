"use client";

import { useEffect, useState } from "react";
import TodamButton from "./todamButton";

export default function Todam3Ready({
  sequence,
  setSequence,
}: {
  sequence: number;
  setSequence: (sequence: number) => void;
}) {
  const [previewPhotoURL, setPreviewPhotoURL] = useState<string>("");

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Do something with the stream, e.g., attach it to a video element
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  };

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreviewPhotoURL(url);

    // CF에서 사진 업로드 하는 코드 추가
    /*     const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setImageId(id);
    } */
  };

  useEffect(() => {
    console.log(previewPhotoURL);
  }, [previewPhotoURL]);

  return (
    <div className="flex flex-col text-center items-center justify-center absolute h-full min-w-full">
      {previewPhotoURL === "" ? (
        <>
          <h1>이런 사진이 좋아요!</h1>
          <div className="grid grid-cols-3 w-full px-5 my-12 h-[20%] gap-4">
            <div className="h-full w-full rounded-lg bg-neutral-500"></div>
            <div className="h-full w-full rounded-lg bg-neutral-500"></div>
            <div className="h-full w-full rounded-lg bg-neutral-500"></div>
          </div>

          <form className="flex flex-col gap-5">
            <div className="sm:hidden">
              <label
                htmlFor="fileInput1"
                className="bg-slate-500 py-3 px-8 rounded-lg text-white"
              >
                촬영하기
              </label>
              <input
                id="fileInput1"
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onClick={(e) => {
                  if (window.innerWidth <= 768) {
                    // Mobile
                    openCamera(); // Open camera using browser API
                  } else {
                    // PC
                    setSequence(3);
                  }
                }}
              />
            </div>
            <label
              htmlFor="fileInput2"
              className="bg-slate-500 py-3 px-8 rounded-lg text-white"
            >
              앨범에서 사진 선택하기
            </label>
            <input
              onChange={onImageChange}
              id="fileInput2"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </form>
        </>
      ) : (
        <div className="flex flex-col gap-5 w-full h-full items-center justify-center">
          <div
            className="h-[50%] w-[70%] shadow-md bg-cover bg-center"
            style={{
              backgroundImage: `url(${previewPhotoURL})`,
            }}
          />
          <div className="mx-11">
            원본 사진은 절대 외부로 유출되지 않으며 카드 제작에만 사용됩니다
          </div>
          <TodamButton onClick={() => setSequence(4)}>
            카드 만들기 시작
          </TodamButton>
        </div>
      )}
    </div>
  );
}
