import React, { useEffect, useRef, useCallback, useState } from "react";
import "./Card.css";

export const CardCss: React.FC<{ aiImageUrl: string }> = ({ aiImageUrl }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  let timeoutId: NodeJS.Timeout;

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
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
            .card:hover:before { ${grad_pos} }
            .card:hover:after { ${sprk_pos}; ${opc}; }
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
    setIsFlipped((prev) => !prev);
    console.log("Card clicked!");
  };

  useEffect(() => {
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

  return (
    <div
      ref={cardRef}
      className={`card gradient sparkles ${isFlipped ? "flipped" : ""}`}
      style={{
        backgroundImage: `url(${aiImageUrl}/todam)`,
        backgroundColor: "#040712",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="gradient"></div>
      <div className="sparkles"></div>
      <style ref={styleRef}></style>
    </div>
  );
};
