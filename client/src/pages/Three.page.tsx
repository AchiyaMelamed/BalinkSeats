import React, { useRef, useEffect } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = () => {
  const modelRef = useRef<any>(null);
  const { scene, camera, gl } = useThree();
  const { nodes, materials } = useLoader(GLTFLoader, "./scene.gltf");

  useEffect(() => {
    modelRef.current!.add(nodes.Scene);
    scene.add(modelRef.current);
  }, [nodes, scene]);

  return <div ref={modelRef} />;
};

function ThreePage() {
  return (
    <Canvas>
      {/* <ambientLight /> */}
      <Model />
    </Canvas>
  );
}

export default ThreePage;
