import React, { useRef } from "react";
import { Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Model(props) {
  const { nodes, materials } = useGLTF("/house2-transformed.glb");
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y = (Math.PI / 4.0) * 5));

  return (
    <Center>
      <group {...props} dispose={null} scale={1}>
        <group name="Circle" position={[-0.11, 0.3, 0.38]} userData={{ name: "Circle" }} ref={ref}>
          <mesh name="Circle_1" geometry={nodes.Circle_1.geometry} material={materials["Material.010"]} />
          <mesh name="Circle_2" geometry={nodes.Circle_2.geometry} material={materials["Material.011"]} />
        </group>
      </group>
    </Center>
  );
}

useGLTF.preload("/house2-transformed.glb");
