import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

const Model = ({ modelPath, ...rest }: any) => {
  const { scene } = useGLTF(`${modelPath}`);
  return <primitive object={scene} {...rest} />;
};

const ThreeDModel = ({ path, canvasStyle }: any) => {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ fov: 45 }}
      style={{ ...canvasStyle }}
    >
      <PresentationControls
        speed={1.5}
        global={false}
        zoom={0.01}
        polar={[-0.1, Math.PI / 4]}
      >
        <Stage environment={undefined}>
          <Model modelPath={path} scale={0.01}></Model>
        </Stage>
      </PresentationControls>
    </Canvas>
  );
};

export default ThreeDModel;
