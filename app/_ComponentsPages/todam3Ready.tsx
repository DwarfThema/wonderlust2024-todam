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

  const openCamera = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";

    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        // 파일 크기 제한 (예: 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert("파일 크기가 너무 큽니다. 5MB 이하의 이미지를 선택해주세요.");
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const imageDataUrl = e.target?.result as string;
          // setTimeout을 사용하여 상태 업데이트를 다음 틱으로 지연
          setTimeout(() => {
            setPreviewPhotoURL(imageDataUrl);
            setPhotoData(file);
          }, 0);
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
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

  // useEffect를 사용하여 previewPhotoURL 변경 감지
  useEffect(() => {
    console.log("Preview URL updated:", previewPhotoURL);
  }, [previewPhotoURL]);

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col text-center items-center justify-center absolute h-full min-w-full gap-8">
          {previewPhotoURL === "" ? (
            <>
              <div className="flex flex-col gap-3">
                <h1>이런 사진이 좋아요!</h1>
                <div className="flex flex-row gap-4 w-full h-[20%] ">
                  <div className="h-[210px] w-[150px] rounded-lg bg-neutral-500"></div>
                  <div className="h-[210px] w-[150px] rounded-lg bg-neutral-500"></div>
                  <div className="h-[210px] w-[150px] rounded-lg bg-neutral-500 lg:block hidden"></div>
                </div>
              </div>

              <div className="flex flex-col gap-1 items-center">
                <div className="sm:hidden w-[200px] h-[50px]">
                  <TodamButton isBlue={false} onClick={openCamera}>
                    촬영하기
                  </TodamButton>
                </div>
                <label htmlFor="fileInput2" className="w-[200px] h-[50px]">
                  <TodamButton isBlue={true}>
                    앨범에서 사진 선택하기
                  </TodamButton>
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
                className="h-[400px] w-[300px] shadow-md bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${previewPhotoURL})`,
                }}
              />
              <div className="mx-11">
                원본 사진은 절대 외부로 유출되지 않으며 카드 제작에만 사용됩니다
              </div>
              <form action={dispatch}>
                <button>
                  <TodamButton isBlue={true}>카드 만들기 시작</TodamButton>
                </button>
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
