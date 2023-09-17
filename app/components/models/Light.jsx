import { useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import THREE, { PointLightHelper, SpotLightHelper } from "three";

// interface ILight {
//   intensity?: number;
//   position?: [number, number, number];
// }
export default function Light(props) {
  const light = useRef();
  // useHelper(!light, DirectionalLightHelper, 3, "cyan");
  useHelper(light, PointLightHelper, 1, "red");
  return (
    <pointLight position={props.position} intensity={props.intensity} ref={props.helper ? light : undefined} castShadow={false} penumbra={0.1} />
  );
}
