"use client";

import { Float, useAnimations, useFBX, useGLTF } from "@react-three/drei";
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
  Mesh,
} from "three";
import { SkeletonUtils } from "three-stdlib";

export default function TodamCard({
  aiImageUrl = "https://imagedelivery.net/zX2GiBzzHYsroLCJsWTCdA/94d99fd8-1dbc-4b05-b2e4-975f9475d100",
}: {
  aiImageUrl: string;
}) {
  const [isAnimEnd, setIsAnimEnd] = useState(false);
  const cardGroupRef = useRef<Group>(null);

  const { scene, animations } = useGLTF("/card/Todam_Card.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const { actions } = useAnimations(animations, clone);

  const [mainGroup, setMainGroup] = useState<Group | null>(null);

  const texture = useMemo(() => {
    const textureLoader = new TextureLoader();
    const newTexture = textureLoader.load(
      aiImageUrl
        ? `${aiImageUrl}/todam`
        : "https://imagedelivery.net/zX2GiBzzHYsroLCJsWTCdA/94d99fd8-1dbc-4b05-b2e4-975f9475d100/todam"
    );

    newTexture.wrapS = MirroredRepeatWrapping;
    newTexture.wrapT = MirroredRepeatWrapping;
    newTexture.center.set(0.5, 0.5);
    newTexture.repeat.set(-1, 1); // 좌우반전을 위해 x축 반복을 -1로 설정
    newTexture.rotation = MathUtils.degToRad(180);

    return newTexture;
  }, [aiImageUrl]);

  useEffect(() => {
    if (clone) {
      const group = new Group();
      group.add(clone);
      setMainGroup(group);

      // 텍스처를 적용할 메시 찾기
      clone.traverse((object) => {
        if (
          object.name === "CardMesh" &&
          object instanceof Mesh &&
          object.material instanceof MeshStandardMaterial
        ) {
          object.material.map = texture;
          object.material.needsUpdate = true;
        }
      });
    }
  }, [clone, texture]);

  useEffect(() => {
    if (mainGroup && actions) {
      Object.values(actions).forEach((action) => {
        if (action) {
          action.reset();
          action.setLoop(LoopOnce, 1);
          action.clampWhenFinished = true;
          action.setEffectiveTimeScale(1);
          action.play();
        }
      });
    }
  }, [mainGroup, actions]);

  return (
    <group
      ref={cardGroupRef}
      scale={[28, 28, 28]}
      position={[0, 0, -7.5]}
      name="card"
    >
      {mainGroup && <primitive object={mainGroup} />}
    </group>
  );
}
