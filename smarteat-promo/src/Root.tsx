import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { DURATION_FRAMES, FPS, HEIGHT, WIDTH } from "./Constants";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SmartEatPromo"
        component={MyComposition}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
