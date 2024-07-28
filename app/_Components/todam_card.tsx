"use client";

import { Float, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimationAction,
  Group,
  LoopOnce,
  MathUtils,
  MirroredRepeatWrapping,
  SkinnedMesh,
  TextureLoader,
  MeshStandardMaterial,
} from "three";
import { SkeletonUtils } from "three-stdlib";

export default function TodamCard({ aiImageUrl }: { aiImageUrl: string }) {
  const { scene, animations } = useGLTF("/card/Todam_BoxAnimation__.glb");

  const cardGroupRef = useRef<Group>(null);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const cardMesh = nodes.Scene as Group;

  const { ref: animRef, actions, names } = useAnimations(animations);

  const meshs: SkinnedMesh[] = [];
  cardMesh.traverse((obj) => {
    if (obj instanceof SkinnedMesh) {
      meshs.push(obj);
    }
  });

  const [currentActionState, setCurrentActionState] =
    useState<AnimationAction | null>(null);

  useEffect(() => {
    if (actions[names[0]]) {
      const currentAction = actions[names[0]] as AnimationAction;
      setCurrentActionState(currentAction);
      currentAction.reset();
      currentAction.setLoop(LoopOnce, 1);
      currentAction.clampWhenFinished = true;
      currentAction.setEffectiveTimeScale(1);
      currentAction.play();
    }
  }, [meshs]);

  const [isAnimEnd, setIsAnimEnd] = useState(false);

  useFrame(() => {
    if (currentActionState && !isAnimEnd) {
      if (currentActionState?.time <= 11.666666984558105) {
        currentActionState?.stop();
        setIsAnimEnd(true);
      }
    }
  });

  useEffect(() => {
    const textureLoader = new TextureLoader();
    const newTexture = textureLoader.load(`${aiImageUrl}/todam`);

    newTexture.wrapS = MirroredRepeatWrapping;
    newTexture.wrapT = MirroredRepeatWrapping;
    newTexture.center.set(0.5, 0.5); // Set the center of rotation to the center of the texture
    newTexture.rotation = MathUtils.degToRad(180); // Rotate the texture 180 degrees

    meshs.forEach((mesh) => {
      if (
        mesh.name === "Plane001" &&
        mesh.material instanceof MeshStandardMaterial
      ) {
        mesh.material.map = newTexture;
        mesh.material.needsUpdate = true;
      }
    });
  }, [meshs]);

  return (
    <Float
      speed={isAnimEnd ? 3 : 0} // Animation speed, defaults to 1
      rotationIntensity={0} // XYZ rotation intensity, defaults to 1
      floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[0.05, -0.05]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <group
        ref={cardGroupRef}
        scale={[28, 28, 28]}
        position={[0, -0.2, -6]}
        name="card"
      >
        <primitive object={nodes.Armature} ref={animRef} />
        {meshs.map((mesh, index) => {
          console.log(mesh.name, " : ", mesh.material);
          return (
            <skinnedMesh
              key={index}
              geometry={mesh.geometry}
              material={mesh.material}
              skeleton={mesh.skeleton}
              receiveShadow
              castShadow
            />
          );
        })}
      </group>
    </Float>
  );
}
