"use client";

import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  forwardRef,
} from "react";
import "./Card.css";
import { isMobile } from "react-device-detect";

interface CardCssArrayProps {
  aiImageUrl: string;
  isSpecial: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
}

export const CardCssArray = forwardRef<HTMLDivElement, CardCssArrayProps>(
  ({ aiImageUrl, isSpecial = true, onClick, style }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`cardArray gradient sparkles`}
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
              ? "-13px -13px 13px -15px rgb(0, 234, 255), 13px 13px 13px -15px rgb(252, 255, 165), 0 0 7px 2px rgba(255, 255, 200, 0.9), 0 35px 25px -15px rgba(0, 0, 0, 0.3)"
              : "",
            "--card-opacity": isSpecial ? "1" : "0",
            "--card-filter": isSpecial ? "brightness(1.2)" : "",
            ...style,
          } as React.CSSProperties
        }
      />
    );
  }
);

CardCssArray.displayName = "CardCssArray";
