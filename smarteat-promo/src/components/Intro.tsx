import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLOR_ACCENT, COLOR_BLACK, COLOR_TEXT } from "../Constants";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 12,
    },
  });

  const textY = interpolate(frame, [0, 30], [50, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLOR_BLACK,
        justifyContent: "center",
        alignItems: "center",
        color: COLOR_TEXT,
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale}) translateY(${textY}px)`,
          textAlign: "center",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: 120,
            fontWeight: 900,
            margin: 0,
            letterSpacing: "-0.05em",
            textTransform: "uppercase",
            color: COLOR_ACCENT,
          }}
        >
          SmartEat
        </h1>
        <h2
          style={{
            fontSize: 60,
            fontWeight: 400,
            margin: 0,
            color: COLOR_TEXT,
            opacity: 0.8,
          }}
        >
          .Space
        </h2>
        <div
          style={{
            marginTop: 40,
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: COLOR_ACCENT,
          }}
        >
          Unlock Elite Performance
        </div>
      </div>
    </AbsoluteFill>
  );
};
