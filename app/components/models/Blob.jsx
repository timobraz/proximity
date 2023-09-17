import React, { useRef } from "react";
import { useGLTF, useAnimations, Float } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export function Blob(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/blob.glb");
  const { actions, names } = useAnimations(animations, group);
  const { viewport } = useThree();

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <Float floatIntensity={1} speed={2}>
          <mesh
            name="Sphere"
            geometry={nodes.Sphere.geometry}
            material={materials.Material}
            position={[0, 0, 0]}
            rotation={[0.24, 0, 0]}
            scale={[1.2, 1.2, 1.2]}
          />
        </Float>
      </group>
    </group>
  );
}

useGLTF.preload("/blob.glb");
