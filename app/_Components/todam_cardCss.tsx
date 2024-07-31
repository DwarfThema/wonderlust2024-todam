"use client";

import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  HTMLProps,
} from "react";
import "./Card.css";
import { isMobile } from "react-device-detect";

export const CardCss: React.FC<
  { aiImageUrl: string; isSpecial: boolean } & HTMLProps<HTMLDivElement>
> = ({ aiImageUrl, isSpecial = true, ...props }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  let timeoutId: NodeJS.Timeout;

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (isMobile) return;
      let pos: [number, number] = [0, 0];
      if (e instanceof MouseEvent) {
        pos = [e.offsetX, e.offsetY];
      } else if (e instanceof TouchEvent) {
        pos = [e.touches[0].clientX, e.touches[0].clientY];
      }

      const card = cardRef.current;
      if (!card) return;

      const l = pos[0];
      const t = pos[1];
      const h = card.offsetHeight;
      const w = card.offsetWidth;
      const px = Math.abs(Math.floor((100 / w) * l) - 100);
      const py = Math.abs(Math.floor((100 / h) * t) - 100);
      const pa = 50 - px + (50 - py);
      const lp = 50 + (px - 50) / 1.5;
      const tp = 50 + (py - 50) / 1.5;
      const px_spark = 50 + (px - 50) / 7;
      const py_spark = 50 + (py - 50) / 7;
      const p_opc = 50 + Math.abs(pa) * 1.5;
      const ty = ((tp - 50) / 2) * -1.3;
      const tx = ((lp - 50) / 1.5) * 1.2;

      const grad_pos = `background-position: ${lp}% ${tp}%`;
      const sprk_pos = `background-position: ${px_spark}% ${py_spark}%`;
      const opc = `opacity: ${p_opc / 100}`;
      const tf = `rotateX(${ty}deg) rotateY(${tx}deg)`;

      const style = `
            ${isSpecial ? `.card:hover:after { ${sprk_pos}; ${opc}; }` : ""}
            .card:hover:before { ${grad_pos}; }
            .card { transform: ${tf}; transition: transform 0.1s ease-out; }
          `;

      if (styleRef.current) {
        styleRef.current.innerHTML = style;
      }

      clearTimeout(timeoutId);
    },
    [isFlipped]
  );

  const handleMouseOut = useCallback(() => {
    if (isMobile) return;
    const card = cardRef.current;
    if (!card) return;

    const style = `
          .card:hover:before { background-position: 50% 50%; }
          .card:hover:after { background-position: 50% 50%; opacity: 0.2; }
          .card { transform: rotateX(0deg) rotateY(0deg); transition: transform 0.9s cubic-bezier(0.68, -1.5, 0.27, 2.5); }
        `;

    if (styleRef.current) {
      styleRef.current.innerHTML = style;
    }
  }, [isFlipped]);

  const handleClick = () => {
    /*     setIsFlipped((prev) => !prev);
    console.log("Card clicked!"); */
  };

  useEffect(() => {
    if (isMobile) return;

    const cardElement = cardRef.current;

    if (cardElement) {
      cardElement.addEventListener("click", handleClick); // Add click event listener

      cardElement.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
      cardElement.addEventListener("touchmove", handleMouseMove, {
        passive: true,
      });
      cardElement.addEventListener("mouseout", handleMouseOut, {
        passive: true,
      });
      cardElement.addEventListener("touchend", handleMouseOut, {
        passive: true,
      });
      cardElement.addEventListener("touchcancel", handleMouseOut, {
        passive: true,
      });
    }

    return () => {
      if (isMobile) return;
      if (cardElement) {
        cardElement.removeEventListener("click", handleClick); // Remove click event listener
        cardElement.removeEventListener("mousemove", handleMouseMove);
        cardElement.removeEventListener("touchmove", handleMouseMove);
        cardElement.removeEventListener("mouseout", handleMouseOut);
        cardElement.removeEventListener("touchend", handleMouseOut);
        cardElement.removeEventListener("touchcancel", handleMouseOut);
      }
    };
  }, [handleClick, isFlipped]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div
        {...props}
        ref={cardRef}
        className={`card gradient sparkles ${isFlipped ? "flipped" : ""}`}
        style={
          {
            backgroundImage: `${
              aiImageUrl
                ? `url(${aiImageUrl}/todam)`
                : "url(https://imagedelivery.net/zX2GiBzzHYsroLCJsWTCdA/94d99fd8-1dbc-4b05-b2e4-975f9475d100/todam)"
            }`,
            backgroundColor: "#040712",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            "--card-shadow": isSpecial
              ? "-13px -13px 13px -15px rgb(0, 234, 255), 13px 13px 13px -15px rgb(252, 255, 165), 0 0 20px 2px rgba(255, 255, 200, 0.9), 0 35px 25px -15px rgba(0, 0, 0, 0.3)"
              : "",
            "--card-opacity": isSpecial ? "1" : "0",
            "--card-filter": isSpecial ? "brightness(1.2)" : "",
            "--card-animation": isSpecial
              ? "holoSparkle 15s ease infinite both"
              : "",
            "--card-main-animation":
              isClient && isMobile ? "holoCard 15s ease infinite" : "",
          } as React.CSSProperties
        }
      >
        <style ref={styleRef}></style>
      </div>
    </>
  );
};
