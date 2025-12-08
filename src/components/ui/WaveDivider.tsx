interface WaveDividerProps {
  position?: "top" | "bottom";
  color?: "white" | "maroon" | "cream";
  flip?: boolean;
  className?: string;
}

const colorMap = {
  white: "#ffffff",
  maroon: "#5b0203",
  cream: "#faf8f6",
};

export default function WaveDivider({
  position = "bottom",
  color = "white",
  flip = false,
  className = "",
}: WaveDividerProps) {
  const fillColor = colorMap[color];

  const topWave = (
    <svg
      className={`w-full ${className}`}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      style={{
        transform: flip ? "scaleX(-1)" : "none",
      }}
    >
      <path
        d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
        fill={fillColor}
      />
    </svg>
  );

  const bottomWave = (
    <svg
      className={`w-full ${className}`}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      style={{
        transform: flip ? "scaleX(-1)" : "none",
      }}
    >
      <path
        d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,0 L0,0 Z"
        fill={fillColor}
      />
    </svg>
  );

  return (
    <div className={position === "top" ? "absolute top-0 left-0 w-full" : "absolute bottom-0 left-0 w-full"}>
      {position === "top" ? topWave : bottomWave}
    </div>
  );
}
