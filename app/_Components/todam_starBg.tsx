import { Detailed, Float, Sparkles, useGLTF } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { createRef, useEffect, useRef, useState } from "react";
import { Mesh, MeshStandardMaterial, TextureLoader } from "three";

const imgUrls = [
  "/star/todam_star_1.svg",
  "/star/todam_star_2.svg",
  "/star/todam_star_3.svg",
  "/star/todam_star_4.svg",
  "/star/todam_star_5.svg",
  "/star/todam_star_6.svg",
  "/star/todam_star_7.svg",
  "/star/todam_star_8.svg",
  "/star/todam_star_9.svg",
  "/star/todam_star_10.svg",
];

const minIntensity = 1.5;
const maxIntensity = 2;

export default function TodamStarsBg(props: any) {
  const textures = useLoader(TextureLoader, imgUrls);
  const { camera } = useThree();
  const meshRefs = useRef<(React.RefObject<Mesh> | null)[]>([]);
  const [offsets, setOffsets] = useState<number[]>([]);
  const [shuffledTextures, setShuffledTextures] = useState(textures);

  useEffect(() => {
    setOffsets(imgUrls.map(() => Math.random() * Math.PI * 1));
    meshRefs.current = imgUrls.map(() => createRef<Mesh>());

    // Shuffle textures
    const shuffled = [...textures].sort(() => Math.random() - 0.5);
    setShuffledTextures(shuffled);
  }, [textures]);

  useFrame(({ clock }) => {
    meshRefs?.current?.forEach((ref, i) => {
      if (ref?.current) {
        //ref.current.lookAt(camera.position);
        (ref.current.material as MeshStandardMaterial).emissiveIntensity =
          ((Math.sin(clock.getElapsedTime() + offsets[i]) + 1) / 2) *
          (maxIntensity - minIntensity);
      }
    });
  });

  useEffect(() => {
    meshRefs.current.forEach((ref) => {
      if (ref?.current) {
        ref.current.lookAt(camera.position);
      }
    });
  }, [meshRefs]);

  const planes = shuffledTextures.map((texture, i) => (
    <Float
      speed={2} // Animation speed, defaults to 1
      rotationIntensity={6} // XYZ rotation intensity, defaults to 1
      floatIntensity={2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[0.4, -0.4]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <mesh receiveShadow castShadow key={i} ref={meshRefs.current[i]}>
        <planeGeometry args={[1, 1]} attach="geometry" />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          //emissive={"#ffffe4"}
          attach="material"
          transparent={true}
        />
      </mesh>
    </Float>
  ));

  return (
    <Detailed distances={[0, 15, 25, 35, 100]} {...props}>
      {planes}
    </Detailed>
  );
}
