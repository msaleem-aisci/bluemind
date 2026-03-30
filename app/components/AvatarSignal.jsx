"use client";
import { motion } from "framer-motion";

export default function AvatarSignal() {
  const beamColor = "#4C99F5"; // Solid Orange

  // TIMING (4.5 Seconds Total Loop)
  const cycleTime = 4.5; 
  const pulseLength = 0.4; 

  // 1. INPUT (0s -> 1s)
  const inputConfig = {
    duration: 1,
    repeat: Infinity,
    ease: "linear",
    repeatDelay: cycleTime - 1,
  };

  // 2. BORDER (0.95s -> 2.45s)
  const borderConfig = {
    duration: 1.5,
    repeat: Infinity,
    ease: "linear",
    repeatDelay: cycleTime - 1.5,
    delay: 0.95
  };

  // 3. OUTPUT (2.4s -> 3.4s)
  const outputConfig = {
    duration: 1,
    repeat: Infinity,
    ease: "linear",
    repeatDelay: cycleTime - 1,
    delay: 2.4
  };

  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200">
        
        {/* --- 1. BACKGROUND TRACKS (Dark Gray) --- */}
        {/* Input extends to 180 (Deep inside left) */}
        <path d="M 0,100 L 180,100" stroke="#333" strokeWidth="2" fill="none" />
        
        {/* Arcs (Visual only) */}
        <path d="M 135,100 A 65 65 0 0 1 265,100" stroke="#333" strokeWidth="2" fill="none" />
        <path d="M 135,100 A 65 65 0 0 0 265,100" stroke="#333" strokeWidth="2" fill="none" />
        
        {/* Output starts at 220 (Deep inside right) */}
        <path d="M 220,100 L 400,100" stroke="#333" strokeWidth="2" fill="none" />


        {/* --- 2. INPUT BEAM (Left -> Right) --- */}
        <motion.path
          d="M 0,100 L 180,100"
          stroke={beamColor}
          strokeWidth="3"
          fill="none"
          strokeLinecap="butt" // FLAT CAP (No dot)
          initial={{ pathLength: pulseLength, pathOffset: -pulseLength }}
          animate={{ pathOffset: 1 }}
          transition={inputConfig}
        />

        {/* --- 3. BORDER BEAMS (Split) --- */}
        <motion.path
          d="M 135,100 A 65 65 0 0 1 265,100" // Top
          stroke={beamColor}
          strokeWidth="3"
          fill="none"
          strokeLinecap="butt"
          initial={{ pathLength: pulseLength, pathOffset: -pulseLength }}
          animate={{ pathOffset: 1 }}
          transition={borderConfig}
        />
        <motion.path
          d="M 135,100 A 65 65 0 0 0 265,100" // Bottom
          stroke={beamColor}
          strokeWidth="3"
          fill="none"
          strokeLinecap="butt"
          initial={{ pathLength: pulseLength, pathOffset: -pulseLength }}
          animate={{ pathOffset: 1 }}
          transition={borderConfig}
        />

        {/* --- 4. OUTPUT BEAM (Right -> Out) --- */}
        <motion.path
          d="M 220,100 L 400,100" // Starts DEEP inside (220)
          stroke={beamColor}
          strokeWidth="3"
          fill="none"
          strokeLinecap="butt" // FLAT CAP (No dot)
          initial={{ pathLength: pulseLength, pathOffset: -pulseLength }}
          animate={{ pathOffset: 1 }}
          transition={outputConfig}
        />
      </svg>
    </div>
  );
}