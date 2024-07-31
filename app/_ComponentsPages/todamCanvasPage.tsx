import {
  CameraControls,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Sparkles,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import TodamStarsBg from "../_Components/todam_starBg";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import TodamCard from "../_Components/todam_card";

export default function TodamCanvas({
  sequence,
  setSequence,
  className,
  aiImageUrl,
}: {
  sequence: number;
  setSequence: (sequence: number) => void;
  className?: string;
  aiImageUrl: string;
}) {
  const positions = useMemo(() => {
    return [...Array(250)]
      .map(() => ({
        position: [
          50 - Math.random() * 100,
          25 - Math.random() * 50,
          -30 - Math.random() * 30,
        ],
      }))
      .filter(
        (pos) =>
          (pos.position[0] < 0 || pos.position[0] > 0) &&
          (pos.position[1] < 0 || pos.position[1] > 0) &&
          (pos.position[2] < 0 || pos.position[2] > 0)
      );
  }, []);

  return (
    <div className={`fixed w-full h-full bg-black -z-20 ${className}`}>
      <Canvas camera={{ fov: 50 }}>
        <Suspense>
          {sequence === 4 && <TodamCard aiImageUrl={aiImageUrl} />}

          <ambientLight intensity={2.5} />
          {/* <Environment preset="warehouse" /> */}
          <color attach="background" args={["#141319"]} />
          <fog attach="fog" args={["#141319", 10, 70]} />

          {positions.map((props, i) => (
            <TodamStarsBg key={i} {...props} />
          ))}
          <Sparkles
            count={200}
            scale={[15, 15, 15]}
            size={0.5}
            speed={0.1}
            noise={0}
            color={"#45AEFF"}
          />
          <Sparkles
            count={200}
            scale={[15, 15, 15]}
            size={0.5}
            speed={0.1}
            noise={0}
            color={"#FFF446"}
          />
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.8}
              luminanceSmoothing={1.5}
              intensity={1}
            />
            <Vignette eskil={false} offset={0.01} darkness={0.75} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
