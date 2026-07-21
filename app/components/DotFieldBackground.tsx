"use client";

import DotField from "./DotField";

export default function DotFieldBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <DotField
        dotRadius={1.5}
        dotSpacing={14}
        bulgeStrength={67}
        glowRadius={0}
        sparkle={false}
        waveAmplitude={0}
        cursorRadius={500}
        cursorForce={0.1}
        bulgeOnly={true}
        gradientFrom="#A855F7"
        gradientTo="#B497CF"
        glowColor="transparent"
      />
    </div>
  );
}
