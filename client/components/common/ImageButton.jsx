import React, { useState } from "react";

function ImageButton({ src, alt, onClick, width, height}) {
  const [pressed, setPressed] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{
        cursor: "pointer",
        opacity: pressed ? 0.6 : 1,
        transition: "opacity 0.2s",
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
    />
  );
}

export default ImageButton;
