import React from "react";
import { Series, interpolate, useCurrentFrame } from "remotion";
import { Intro } from "./components/Intro";
import { ScreenScene } from "./components/ScreenScene";
import { Outro } from "./components/Outro";

const TransitionOverlay: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, duration / 2, duration],
    [0, 1, 0]
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "black",
        opacity,
        zIndex: 100,
        pointerEvents: "none",
      }}
    />
  );
};

export const MyComposition: React.FC = () => {
  return (
    <div style={{ flex: 1, backgroundColor: "black" }}>
      <Series>
        {/* Intro: 4s (120f) */}
        <Series.Sequence durationInFrames={120}>
          <Intro />
        </Series.Sequence>

        {/* Scene 1: Dashboard - 7s (210f) */}
        <Series.Sequence durationInFrames={210}>
          <ScreenScene
            image="dashboard.png"
            title="Bio-Metric Control"
            subtitle="Real-time analysis of your body's vital metrics and nutritional needs."
          />
        </Series.Sequence>

        {/* Scene 2: Nutrition - 7s (210f) */}
        <Series.Sequence durationInFrames={210}>
          <ScreenScene
            image="nutrition.png"
            title="AI-Driven Nutrition"
            subtitle="Precision macro tracking and automated meal plans designed for elite athletes."
          />
        </Series.Sequence>

        {/* Scene 3: Performance - 7s (210f) */}
        <Series.Sequence durationInFrames={210}>
          <ScreenScene
            image="performance.png"
            title="The Training Hub"
            subtitle="Connect with elite coaches and track every workout with surgical precision."
          />
        </Series.Sequence>

        {/* Scene 4: Login/Registration - 7s (210f) */}
        <Series.Sequence durationInFrames={210}>
          <ScreenScene
            image="intro.png"
            title="Seamless Integration"
            subtitle="Start your journey in seconds and unlock your true athletic potential."
          />
        </Series.Sequence>

        {/* Outro: 5s (150f) */}
        <Series.Sequence durationInFrames={150}>
          <Outro />
        </Series.Sequence>
      </Series>
    </div>
  );
};
