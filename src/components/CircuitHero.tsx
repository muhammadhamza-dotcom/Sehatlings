"use client";
import { useEffect, useState } from "react";

export default function CircuitHero() {
  const [mounted, setMounted] = useState(false);
  const [pulseConfigs, setPulseConfigs] = useState<{ pathId: string; delay: number; duration: number }[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate randomized data pulses once on mount
  useEffect(() => {
    if (!mounted) return;
    const pathIds = [
      'pin1-path','pin2-path','pin3-path','pin4-path','pin5-path',
      'pin6-path','pin7-path','pin8-path','pin9-path','pin10-path',
      'pin11-path','pin12-path','pin13-path','pin14-path','pin15-path',
      'pin16-path','pin17-path','pin18-path','pin19-path','pin20-path'
    ];

    const configs: { pathId: string; delay: number; duration: number }[] = [];

    for (const id of pathIds) {
      // Exactly one pulse per path to avoid stacking
      const baseDelay = +(1.0 + Math.random() * 1.4).toFixed(2); // after traces/chip
      const baseDuration = +(2.2 + Math.random() * 0.9).toFixed(2); // ~2.2–3.1s
      configs.push({ pathId: id, delay: baseDelay, duration: baseDuration });
    }
    // Enforce a minimum global spacing so pulses don't start together
    const minSpacing = 0.25; // seconds
    configs.sort((a, b) => a.delay - b.delay);
    for (let i = 1; i < configs.length; i++) {
      const prev = configs[i - 1];
      const curr = configs[i];
      const diff = curr.delay - prev.delay;
      if (diff < minSpacing) {
        curr.delay = +(prev.delay + minSpacing + Math.random() * 0.05).toFixed(2); // add tiny jitter
      }
    }
    setPulseConfigs(configs);
  }, [mounted]);

  // Lightweight, native-SVG animation: draw trace, then fade-in node
  const PathWithNode = ({
    d,
    cx,
    cy,
    delay = 0,
    dur = 0.6,
  }: {
    d: string;
    cx: number;
    cy: number;
    delay?: number;
    dur?: number;
  }) => (
    <g>
      <path
        d={d}
        stroke="#8b2635"
        strokeWidth="2"
        fill="none"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
      >
        <animate attributeName="stroke-dashoffset" from="1" to="0" dur={`${dur}s`} begin={`${delay}s`} fill="freeze" />
      </path>
      <circle cx={cx} cy={cy} r="2" fill="#8b2635" opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin={`${(delay + dur * 0.6).toFixed(2)}s`} fill="freeze" />
      </circle>
    </g>
  );

  // Data pulse moving along a path (pure SVG)
  const DataPulse = ({
    pathId,
    delay = 1.2,
    duration = 1.5,
  }: {
    pathId: string;
    delay?: number;
    duration?: number;
  }) => (
    <circle r="2" fill="rgba(139, 38, 53, 0.85)" opacity="0">
      <set attributeName="opacity" to="1" begin={`${delay}s`} />
      <animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${delay}s`}>
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </circle>
  );

  if (!mounted) return null;
  return (
    <div className="w-full h-full overflow-hidden bg-white">
      <svg
        className="w-full h-full min-h-[192px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[384px] xl:min-h-[480px]"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Trace path definitions for data pulses */}
          <path id="pin1-path" d="M 85 78 L 85 50 L 70 50" />
          <path id="pin2-path" d="M 95 78 L 95 35 L 50 35" />
          <path id="pin3-path" d="M 100 78 L 100 45 L 80 45" />
          <path id="pin4-path" d="M 105 78 L 105 35 L 150 35" />
          <path id="pin5-path" d="M 115 78 L 115 50 L 135 50" />
          <path id="pin6-path" d="M 122 85 L 150 85 L 150 70" />
          <path id="pin7-path" d="M 122 95 L 165 95 L 165 55" />
          <path id="pin8-path" d="M 122 100 L 155 100 L 155 80" />
          <path id="pin9-path" d="M 122 105 L 165 105 L 165 145" />
          <path id="pin10-path" d="M 122 115 L 150 115 L 150 130" />
          <path id="pin11-path" d="M 85 122 L 85 150 L 70 150" />
          <path id="pin12-path" d="M 95 122 L 95 165 L 50 165" />
          <path id="pin13-path" d="M 100 122 L 100 155 L 80 155" />
          <path id="pin14-path" d="M 105 122 L 105 165 L 150 165" />
          <path id="pin15-path" d="M 115 122 L 115 150 L 135 150" />
          <path id="pin16-path" d="M 78 85 L 50 85 L 50 70" />
          <path id="pin17-path" d="M 78 95 L 35 95 L 35 55" />
          <path id="pin18-path" d="M 78 100 L 45 100 L 45 80" />
          <path id="pin19-path" d="M 78 105 L 35 105 L 35 145" />
          <path id="pin20-path" d="M 78 115 L 50 115 L 50 130" />
          {/* Enhanced glow filter for CPU with pulsing effect */}
          <filter id="cpuGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Connection point pulse filter */}
          <filter id="connectionPulse" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1" result="glow"/>
            <feMerge>
              <feMergeNode in="glow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g transform="translate(0,0) translate(100,100) scale(1.05) translate(-100,-100)">
        {/* Central CPU Chip will appear after pins */}

        {/* TOP PINS (animated natively) */}
        <PathWithNode d="M 85 78 L 85 50 L 70 50" cx={70} cy={50} delay={0.05} />
        <PathWithNode d="M 95 78 L 95 35 L 50 35" cx={50} cy={35} delay={0.10} />
        <PathWithNode d="M 100 78 L 100 45 L 80 45" cx={80} cy={45} delay={0.15} />
        <PathWithNode d="M 105 78 L 105 35 L 150 35" cx={150} cy={35} delay={0.20} />
        <PathWithNode d="M 115 78 L 115 50 L 135 50" cx={135} cy={50} delay={0.25} />

        {/* Optimized Data Pulse Animations - Reduced to 6 for smooth performance */}
        {/* Data pulses removed */}

        {/* RIGHT PINS (animated natively) */}
        <PathWithNode d="M 122 85 L 150 85 L 150 70" cx={150} cy={70} delay={0.60} />
        <PathWithNode d="M 122 95 L 165 95 L 165 55" cx={165} cy={55} delay={0.65} />
        <PathWithNode d="M 122 100 L 155 100 L 155 80" cx={155} cy={80} delay={0.40} />
        <PathWithNode d="M 122 105 L 165 105 L 165 145" cx={165} cy={145} delay={0.45} />
        <PathWithNode d="M 122 115 L 150 115 L 150 130" cx={150} cy={130} delay={0.50} />

        {/* BOTTOM PINS - Animated */}
        {/* BOTTOM PINS (animated natively) */}
        <PathWithNode d="M 85 122 L 85 150 L 70 150" cx={70} cy={150} delay={0.55} />
        <PathWithNode d="M 95 122 L 95 165 L 50 165" cx={50} cy={165} delay={0.60} />
        <PathWithNode d="M 100 122 L 100 155 L 80 155" cx={80} cy={155} delay={0.30} />
        <PathWithNode d="M 105 122 L 105 165 L 150 165" cx={150} cy={165} delay={0.40} />
        <PathWithNode d="M 115 122 L 115 150 L 135 150" cx={135} cy={150} delay={0.50} />

        {/* LEFT PINS (animated natively) */}
        <PathWithNode d="M 78 85 L 50 85 L 50 70" cx={50} cy={70} delay={0.15} />
        <PathWithNode d="M 78 95 L 35 95 L 35 55" cx={35} cy={55} delay={0.20} />
        <PathWithNode d="M 78 100 L 45 100 L 45 80" cx={45} cy={80} delay={0.35} />
        <PathWithNode d="M 78 105 L 35 105 L 35 145" cx={35} cy={145} delay={0.45} />
        <PathWithNode d="M 78 115 L 50 115 L 50 130" cx={50} cy={130} delay={0.55} />

        {/* Central CPU Chip then Caduceus (sequential fade-in) */}
        <g>
          <g opacity="0">
            <rect
              x="78"
              y="78"
              width="44"
              height="44"
              rx="2"
              fill="#f8f9fa"
              stroke="#8b2635"
              strokeWidth="1.5"
              filter="url(#cpuGlow)"
            />
            <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="1.10s" fill="freeze" />
          </g>
          <g opacity="0" transform="translate(100 100)">
            <g id="health-cross">
              <rect x="-5" y="-14" width="10" height="28" rx="2" fill="#8b2635" />
              <rect x="-14" y="-5" width="28" height="10" rx="2" fill="#8b2635" />
            </g>
            <animate attributeName="opacity" from="0" to="1" dur="0.1s" begin="1.30s" fill="freeze" />
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="scale"
              values="1;1.12;1"
              dur="1.6s"
              repeatCount="indefinite"
              begin="1.30s"
              additive="sum"
            />
          </g>
        </g>

        {/* Randomized data pulses across all paths */}
        <g>
          {pulseConfigs.map((p, idx) => (
            <DataPulse key={idx} pathId={p.pathId} delay={p.delay} duration={p.duration} />
          ))}
        </g>
        </g>
      </svg>
    </div>
  );
}