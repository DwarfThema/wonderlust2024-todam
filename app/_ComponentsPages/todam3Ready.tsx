"use client";

import { useEffect, useState } from "react";
import TodamButton from "./todamButton";
import { useFormState } from "react-dom";
import { fetchFormdata, getUploadUrl } from "../action";

export default function Todam3Ready({
  sequence,
  setSequence,
  name,
  setAiImageUrl,
}: {
  sequence: number;
  setSequence: (sequence: number) => void;
  name: string;
  setAiImageUrl: (aiImageUrl: string) => void;
}) {
  const [previewPhotoURL, setPreviewPhotoURL] = useState<string>("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [photoId, setImageId] = useState("");
  const [photoData, setPhotoData] = useState<File | null>(null);

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
    setPhotoData(file);
    const url = URL.createObjectURL(file);
    setPreviewPhotoURL(url);

    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setImageId(id);
    }
  };

  const interceptFetchAction = async (_: any, formData: FormData) => {
    if (!photoData) {
      return;
    }

    const cloudflareForm = new FormData();
    cloudflareForm.append("file", photoData);

    const response = await fetch(uploadUrl, {
      method: "post",
      body: cloudflareForm,
    });
    //console.log(await response.text());
    if (response.status !== 200) {
      return;
    }

    const photoUrl = `https://imagedelivery.net/zX2GiBzzHYsroLCJsWTCdA/${photoId}`;
    formData.set("photo", photoUrl);
    formData.append("name", name);

    setIsLoading(true);

    return fetchFormdata(_, formData);
  };

  const [state, dispatch] = useFormState(interceptFetchAction, null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("state : ", state?.data);
    if (state?.ok === undefined || state?.ok === null) return;
    if (state?.ok) {
      console.log("state22 : ", state?.data);
      setAiImageUrl(state.data?.uploadUrl || "");
      setIsLoading(false);
      setSequence(4);
    } else {
      alert("뭔가 사진에 문제가있네요? 다시 시도해보세요.");
    }
  }, [state?.ok]);

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col text-center items-center justify-center absolute h-full min-w-full">
          {previewPhotoURL === "" ? (
            <>
              <h1>이런 사진이 좋아요!</h1>
              <div className="grid grid-cols-3 w-full px-5 my-12 h-[20%] gap-4">
                <div className="h-full w-full rounded-lg bg-neutral-500"></div>
                <div className="h-full w-full rounded-lg bg-neutral-500"></div>
                <div className="h-full w-full rounded-lg bg-neutral-500"></div>
              </div>

              <div className="flex flex-col gap-5">
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
                    name="photo"
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
                  name="photo"
                  id="fileInput2"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-5 w-full h-full items-center justify-center">
              <div
                className="h-[500px] w-[300px] shadow-md bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${previewPhotoURL})`,
                }}
              />
              <div className="mx-11">
                원본 사진은 절대 외부로 유출되지 않으며 카드 제작에만 사용됩니다
              </div>
              <form action={dispatch}>
                <TodamButton>카드 만들기 시작</TodamButton>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col text-center items-center justify-center absolute h-full min-w-full">
          <h1>Todam3MakingLoading</h1>
        </div>
      )}
    </>
  );
}
