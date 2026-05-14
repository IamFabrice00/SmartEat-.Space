import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLOR_ACCENT, COLOR_BLACK, COLOR_TEXT } from "../Constants";

interface Props {
  image: string;
  title: string;
  subtitle: string;
}

export const ScreenScene: React.FC<Props> = ({ image, title, subtitle }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  // Pan effect
  const translateY = interpolate(
    frame,
    [0, durationInFrames],
    [0, -200],
    { extrapolateRight: "clamp" }
  );

  const scale = interpolate(frame, [0, durationInFrames], [1, 1.2]);

  const textOpacity = interpolate(
    frame,
    [0, 20, durationInFrames - 20, durationInFrames],
    [0, 1, 1, 0]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLOR_BLACK, overflow: "hidden" }}>
      <div
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          width: "100%",
          height: "100%",
        }}
      >
        <Img
          src={staticFile(`assets/screens/${image}`)}
          style={{
            width: "100%",
            height: "auto",
            minHeight: "100%",
            objectFit: "cover",
            filter: "brightness(0.6)",
          }}
        />
      </div>

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          padding: 80,
          background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
        }}
      >
        <div style={{ opacity: textOpacity }}>
          <h3
            style={{
              color: COLOR_ACCENT,
              fontSize: 48,
              fontWeight: 800,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              color: COLOR_TEXT,
              fontSize: 32,
              fontWeight: 400,
              marginTop: 10,
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
