import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLOR_ACCENT, COLOR_BLACK, COLOR_TEXT } from "../Constants";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 20], [0, 1]);
  const scale = spring({ frame, fps, config: { damping: 12 } });

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
          transform: `scale(${scale})`,
          textAlign: "center",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: 100,
            fontWeight: 900,
            color: COLOR_ACCENT,
            margin: 0,
          }}
        >
          SmartEat.Space
        </h1>
        <p
          style={{
            fontSize: 40,
            fontWeight: 400,
            marginTop: 20,
            opacity: 0.8,
          }}
        >
          The Future of Athletic Nutrition
        </p>
        <div
          style={{
            marginTop: 60,
            padding: "20px 40px",
            border: `2px solid ${COLOR_ACCENT}`,
            borderRadius: 50,
            fontSize: 28,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Join the Evolution
        </div>
      </div>
    </AbsoluteFill>
  );
};
