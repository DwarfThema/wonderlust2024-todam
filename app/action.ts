"use server";

import { z } from "zod";

export const fetchFormdata = async (prevdata: any, formData: FormData) => {
  const data = {
    name: formData.get("name"),
    photo: formData.get("photo"),
  };

  /* const passwordRequiredError =
      data?.lang === "KR"
        ? INCORRECT_CURRENT_PASSWORD_ERROR_KR
        : INCORRECT_CURRENT_PASSWORD_ERROR_EN; */

  const FormSchema = z.object({
    name: z.string(),
    photo: z.string(),
    /*       .min(2, { message: "이름은 최소 2자 이상입니다." })
      .max(10, { message: "이름은 최대 10자 이하입니다." }), */
  });

  const result = await FormSchema.spa(data);

  if (!result.success) {
    console.log(result.error);

    return {
      ok: false,
      error: result.error.flatten(),
    };
  } else {
    try {
      const response = await fetch(
        `${process.env.DOMAIN_SERVER_GPU}/todam/conveycomfy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: result.data.name,
            photo: result.data.photo,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "서버 응답이 올바르지 않습니다.");
      }
      const responseData = await response.json();

      console.log("최종 로그 : ", responseData);
      // 여기서 DB에 링크 저장해야함

      return {
        ok: true,
        data: {
          message: responseData.message as string,
          uploadUrl: responseData.uploadUrl as string,
        },
      };
    } catch (error) {
      console.error("서버 요청 중 오류 발생:", error);
      return {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
};

export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_IMAGE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CF_IMAGE_TOKEN}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
