import React, { useRef } from "react";
import { Center, useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/castlelowp-transformed.glb");
  console.log(materials);
  return (
    <Center>
      <group {...props} dispose={null} scale={1}>
        <mesh name="bricks" geometry={nodes.bricks.geometry} material={materials.blue} position={[1.01, 3.24, 0.22]} userData={{ name: "bricks" }} />
        <group name="main" position={[0, 2.68, -1.87]} userData={{ name: "main" }}>
          <mesh name="Cube" geometry={nodes.Cube.geometry} material={materials.blue} />
          <mesh name="Cube_1" geometry={nodes.Cube_1.geometry} material={materials.white} />
        </group>
      </group>
    </Center>
  );
}

useGLTF.preload("/castlelowp-transformed.glb");
