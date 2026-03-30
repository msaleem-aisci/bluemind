"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TechGrid() {
  const [beams, setBeams] = useState([]);
  const GRID_SIZE = 70; // 70px Grid

  useEffect(() => {
    // 1. Calculate how many grid lines fit on the screen
    const maxRows = Math.floor(window.innerHeight / GRID_SIZE);
    const maxCols = Math.floor(window.innerWidth / GRID_SIZE);

    // 2. Create exactly 3 beams
    const newBeams = Array.from({ length: 3 }).map((_, i) => {
      // Pick a random direction
      const types = ["LTR", "RTL", "TTB", "BTT"];
      const type = types[Math.floor(Math.random() * types.length)];
      
      let pos;
      if (type === "LTR" || type === "RTL") {
        // Horizontal beams: Pick a random ROW (Y-axis)
        pos = Math.floor(Math.random() * maxRows) * GRID_SIZE;
      } else {
        // Vertical beams: Pick a random COLUMN (X-axis)
        pos = Math.floor(Math.random() * maxCols) * GRID_SIZE;
      }
      
      return {
        id: i,
        type,
        pos, 
        delay: Math.random() * 2, // Short random delay
        duration: 2 + Math.random() * 2 // Speed: 2s to 4s
      };
    });
    setBeams(newBeams);
  }, []);

  const getBeamProps = (beam) => {
    const beamLength = "250px"; 
    const beamWidth = "1px"; 
    
    // COLOR LOGIC:
    // Head (Orange #f97316) is always at the front.
    // Tail (Cyan #06b6d4) is always at the back.
    
    switch (beam.type) {
      case "LTR": // Moves Left -> Right
        return {
          style: { 
            top: `${beam.pos}px`, 
            left: `-${beamLength}`, 
            width: beamLength, 
            height: beamWidth,
            // Gradient 90deg: Left(0%) -> Right(100%)
            // 0% Transparent -> 50% Cyan (Tail) -> 100% Orange (Head)
            background: "linear-gradient(90deg, transparent 0%, #4C99F5 50%, #4C99F5 100%)",
            boxShadow: "2px 0 10px #4C99F5" 
          },
          animate: { left: "120%", opacity: [0, 1, 0] }
        };

      case "RTL": // Moves Right -> Left
        return {
          style: { 
            top: `${beam.pos}px`, 
            right: `-${beamLength}`, 
            width: beamLength, 
            height: beamWidth,
            // Gradient 270deg: Right(0%) -> Left(100%)
            // 0% Transparent -> 50% Cyan (Tail) -> 100% Orange (Head)
            background: "linear-gradient(90deg, transparent 0%, #4C99F5 50%, #4C99F5 100%)",
            boxShadow: "2px 0 10px #4C99F5" 
          },
          animate: { right: "120%", opacity: [0, 1, 0] }
        };

      case "TTB": // Moves Top -> Bottom
        return {
          style: { 
            left: `${beam.pos}px`, 
            top: `-${beamLength}`, 
            width: beamWidth, 
            height: beamLength,
            // Gradient 180deg: Top(0%) -> Bottom(100%)
            // 0% Transparent -> 50% Cyan (Tail) -> 100% Orange (Head)
            background: "linear-gradient(180deg, transparent 0%, #4C99F5 50%, #4C99F5 100%)",
            boxShadow: "0 2px 10px #4C99F5" // Glow on bottom
          },
          animate: { top: "120%", opacity: [0, 1, 0] }
        };

      case "BTT": // Moves Bottom -> Top
        return {
          style: { 
            left: `${beam.pos}px`, 
            bottom: `-${beamLength}`, 
            width: beamWidth, 
            height: beamLength,
            // Gradient 0deg: Bottom(0%) -> Top(100%)
            // 0% Transparent -> 50% Cyan (Tail) -> 100% Orange (Head)
            background: "linear-gradient(0deg, transparent 0%, #4C99F5 50%, #4C99F5 100%)",
            boxShadow: "0 -2px 10px #4C99F5" // Glow on top
          },
          animate: { bottom: "120%", opacity: [0, 1, 0] }
        };
      default: return {};
    }
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      
      {/* 1. GRID BACKGROUND */}
      <div 
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #808080 1px, transparent 1px),
            linear-gradient(to bottom, #808080 1px, transparent 1px)
          `,
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
          maskImage: "radial-gradient(circle at center, black 60%, transparent 100%)" 
        }}
      />

      {/* 2. RANDOM DIRECTION BEAMS */}
      {beams.map((beam) => {
        const props = getBeamProps(beam);
        return (
          <motion.div
            key={beam.id}
            initial={{ opacity: 0 }}
            animate={props.animate}
            transition={{ 
              duration: beam.duration, 
              repeat: Infinity, 
              ease: "linear", 
              delay: beam.delay 
            }}
            className="absolute"
            style={props.style}
          />
        );
      })}
    </div>
  );
}