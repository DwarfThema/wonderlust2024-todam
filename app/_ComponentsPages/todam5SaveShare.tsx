"use client";

import { useCallback, useRef, useState, useEffect, FormEvent } from "react";
import { CardCss } from "../_Components/todam_cardCss";
import { CardCssArray } from "../_Components/todam_cardCssArray";
import TodamButton from "./todamButton";
import { isMobile } from "react-device-detect";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";
import html2canvas from "html2canvas";
import Image from "next/image";

export default function Todam6SaveShare({
  sequence,
  setSequence,
  aiImageUrl = "https://imagedelivery.net/zX2GiBzzHYsroLCJsWTCdA/94d99fd8-1dbc-4b05-b2e4-975f9475d100",
}: {
  sequence: number;
  setSequence: (sequence: number) => void;
  aiImageUrl: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [img, setImg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveImage = () => {
    const cardElement = document.getElementById("CardArea");
    if (cardElement) {
      html2canvas(cardElement, {
        backgroundColor: null,
        logging: false,
        useCORS: true,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById("CardArea");
          if (clonedElement) {
            clonedElement.innerHTML = "";
            clonedElement.style.width = `${320 * 2}px`;
            clonedElement.style.height = `${510 * 2}px`;
          }
        },
      }).then((canvas) => {
        const imageDataUrl = canvas.toDataURL("image/png");
        setImg(imageDataUrl);
        setIsModalOpen(true);
      });
    }
  };
  const [isSpecial, setIsSpecial] = useState(true);

  return (
    <div className="flex flex-col gap-10 text-center items-center justify-center h-full max-w-full lg:pt-[100px] pt-[50px]">
      <button
        className="bg-white p-2 rounded-md"
        onClick={() => setIsSpecial((prev) => !prev)}
      >
        카드 변경
      </button>
      <section className="cards flex gap-16 w-full items-center justify-evenly md:flex-row">
        <CardCss id="CardArea" isSpecial={isSpecial} aiImageUrl={aiImageUrl} />
      </section>

      <div className="flex flex-col w-[300px] gap-14">
        <div className="flex flex-col gap-2">
          <div className="flex justify-center gap-4 w-full h-[50px]">
            <TodamButton isBlue={false} onClick={handleSaveImage}>
              저장하기 / 공유하기
            </TodamButton>
          </div>

          <div className="flex justify-center gap-4 w-full h-[55px]">
            <TodamButton isBlue={true}>{`소장하기`}</TodamButton>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-white">
            토담 작가의 작품을 카드로 만나볼수 있는 개쩌는 기회! 단 1000장 한정
            펀딩 진행 중
          </div>
          <div className="text-white text-left">
            기간 : 총 수량 : 1000개 한정 지금 제작된 카드를 몇월 며칠에
            보내드립니다. 상세 설명 어쩌구 저쩌구 + 구매 순서대로 카드의
            일련번호가 부여됩니다 (구매하는 사람들만 일련번호 1~1000까지 부여) +
            상품 사이즈, 소재 등등 상세 정보
          </div>
        </div>

        <div className="flex justify-center gap-4 w-full h-[45px]">
          <TodamButton isBlue={true}>{`구매하기(소장하기)`}</TodamButton>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="text-center text-white text-3xl">
          지금까지 수집된 카드
        </div>
        <CardGrid aiImageUrl={aiImageUrl} />
        <div className="text-white font-extrabold pb-[100px]">
          {"."}
          <br />
          {"."}
          <br />
          {"."}
          <br />
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={aiImageUrl}
        downloadImg={img}
      />
    </div>
  );
}

// CardGrid 컴포넌트
function CardGrid({ aiImageUrl }: { aiImageUrl: string }) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [selectedCardPosition, setSelectedCardPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [selectedCardSize, setSelectedCardSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);

  const handleCardClick = useCallback(
    (index: number, isSpecial: boolean) => {
      if (isMobile) return;
      if (selectedCard === null) {
        setIsSpecial(isSpecial);
        const card = cardRefs.current[index];
        if (card) {
          const rect = card.getBoundingClientRect();
          setSelectedCardPosition({
            top: rect.top,
            left: rect.left,
          });
          setSelectedCardSize({
            width: rect.width,
            height: rect.height,
          });
          setSelectedCard(index);
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 300);
        }
      }
    },
    [selectedCard]
  );

  const handleOverlayClick = useCallback(() => {
    if (isMobile) return;
    if (selectedCard !== null) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedCard(null);
        setSelectedCardPosition(null);
        setSelectedCardSize(null);
        setIsAnimating(false);
      }, 300);
    }
  }, [selectedCard]);

  useEffect(() => {
    if (isMobile) return;
    const handleResize = () => {
      if (selectedCard !== null) {
        const card = cardRefs.current[selectedCard];
        if (card) {
          const rect = card.getBoundingClientRect();
          setSelectedCardPosition({
            top: rect.top,
            left: rect.left,
          });
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedCard]);

  return (
    <div className="cardsArray grid grid-cols-2 gap-x-[2px] relative">
      {cardData.map((data, i) => (
        <CardCssArray
          key={i}
          ref={(el: HTMLDivElement | null) => {
            cardRefs.current[i] = el;
          }}
          onClick={() => handleCardClick(i, data.isSpecial)}
          isSpecial={data.isSpecial}
          aiImageUrl={aiImageUrl}
          style={{
            opacity: selectedCard === i ? 0 : 1,
            transition: "opacity 0.3s",
            pointerEvents: selectedCard !== null ? "none" : "auto",
          }}
        />
      ))}
      {selectedCard !== null && selectedCardPosition && selectedCardSize && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 9,
            }}
            onClick={handleOverlayClick}
          />
          <div
            style={{
              position: "fixed",
              top: isAnimating ? selectedCardPosition.top : "50%",
              left: isAnimating ? selectedCardPosition.left : "50%",
              width: selectedCardSize.width,
              height: selectedCardSize.height,
              transform: isAnimating
                ? "translate(0, 0) scale(1)"
                : "translate(-50%, -50%) scale(1.5)",
              zIndex: 10,
              transition: "all 0.3s",
            }}
          >
            <CardCssArray
              isSpecial={isSpecial}
              aiImageUrl={aiImageUrl}
              onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                e.stopPropagation()
              }
              style={{
                width: "100%",
                height: "100%",
                padding: 0,
                margin: 0,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

// New ImageModal component
function ImageModal({
  isOpen,
  onClose,
  imageUrl = "https://imagedelivery.net/zX2GiBzzHYsroLCJsWTCdA/94d99fd8-1dbc-4b05-b2e4-975f9475d100",
  downloadImg,
}: {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  downloadImg: string;
}) {
  if (!isOpen) return null;

  const [imageUrlState, setImageUrlState] = useState(imageUrl);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = downloadImg;
    link.download = "todam-card-background.png";
    link.click();
  };

  useEffect(() => {
    console.log(imageUrl);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose} // 배경 클릭 시 모달 닫기
    >
      <div
        className="flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 이벤트 전파 방지
      >
        <div className="w-[300px] h-[500px] flex items-center justify-center mb-4 relative">
          <Image
            src={`${imageUrlState}/todam`}
            alt="Generated Card"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex justify-center w-[300px] h-[50px]">
          <TodamButton isBlue={false} onClick={handleDownload}>
            DOWNLOAD
          </TodamButton>
        </div>
      </div>
    </div>
  );
}

const cardData = [
  { isSpecial: true },
  { isSpecial: true },
  { isSpecial: false },
  { isSpecial: true },
  { isSpecial: false },
  { isSpecial: true },
  { isSpecial: false },
  { isSpecial: true },
  { isSpecial: false },
  { isSpecial: false },
  { isSpecial: false },
  { isSpecial: true },
  { isSpecial: false },
  { isSpecial: true },
  { isSpecial: false },
  { isSpecial: true },
  { isSpecial: false },
  { isSpecial: true },
  { isSpecial: false },
  { isSpecial: true },
  { isSpecial: false },
  { isSpecial: true },
  { isSpecial: false },
];
