import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

export const Model = (props: any) => {
  const { scene } = useGLTF("/oc.glb");
  return <primitive object={scene} {...props} />;
};

function ThreePage() {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
      <color attach="background" args={["red"]}></color>
      <PresentationControls
        speed={1.5}
        global={false}
        zoom={0.01}
        polar={[-0.1, Math.PI / 4]}
      >
        <Stage environment={undefined}>
          <Model scale={0.01}></Model>
        </Stage>
      </PresentationControls>
    </Canvas>
  );
}

export default ThreePage;
