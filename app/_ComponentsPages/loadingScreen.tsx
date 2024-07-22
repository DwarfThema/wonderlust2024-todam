import { useProgress } from "@react-three/drei";
import Image from "next/image";
import { useEffect, useState } from "react";
import Title from "@/public/title/dotam_title_1.png";

export default function LoadingScreen() {
  const { progress, loaded } = useProgress();
  const [loading, setLoading] = useState(false);
  const [transitionEnd, setTransitionEnd] = useState(false);

  const [loadingPercent, setLoadingPercent] = useState(0);

  const [houseRotate, setHouseRoate] = useState(true);

  useEffect(() => {
    if (loaded >= 72) {
      setLoading(true);
      setTimeout(() => {
        setTransitionEnd(true);
      }, 5000);
    }
  }, [progress, loaded]);

  useEffect(() => {
    setLoadingPercent(Math.floor((loaded / 72) * 100));
  }, [loaded]);

  useEffect(() => {
    setTimeout(() => {
      if (houseRotate) {
        setHouseRoate(false);
      } else {
        setHouseRoate(true);
      }
    }, 700);
  }, [houseRotate]);

  return (
    <div
      className={`transition-opacity ease-in-out duration-[2000ms] z-50 absolute bg-[#FF8BC6] w-screen h-screen flex flex-col justify-center items-center text-[#ffffff] 
        ${progress ? "opacity-0 hidden" : "opacity-100 block"}`}
    >
      <div className="flex flex-col items-center justify-center w-4/6 h-full">
        <div className=" w-[1200px] h-[500px] flex justify-center items-center">
          <Image
            src={Title}
            className="absolute w-[200px] h-fit zero:hidden lg:flex"
            alt="logo"
          />
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-0 h-5 bg-[#FFF346]`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
