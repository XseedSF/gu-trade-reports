import React from "react";

const BrushRect = ({ x, y, height, width, fill, stroke, opacity }) => {
  const rect = { x, y, height, width };
  const background = { fill, opacity };
  return (
    <g>
      <rect
        {...rect}
        {...background}
        stroke={stroke}
        style={{ strokeDasharray: "3 3" }}
      />
    </g>
  );
};

export default BrushRect;
