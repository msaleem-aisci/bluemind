"use client";
import { useEffect, useRef } from "react";

export default function TrueNeuralNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0; 
    
    // CONFIGURATION: [Input, Hidden 1, Hidden 2, Output]
    // 4 inputs -> 4 hidden -> 4 hidden -> 2 outputs
    const layerConfig = [2, 3, 3, 1, 1]; 
    
    const nodes = []; 
    const connections = [];
    const pulses = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      // Make canvas slightly taller to accommodate floating
      canvas.height = 600; 
      initNetwork();
    };

    const initNetwork = () => {
      nodes.length = 0;
      connections.length = 0;

      // 1. Spread Across Screen (85% Width)
      const networkWidth = canvas.width * 0.85; 
      const startX = (canvas.width - networkWidth) / 2;
      const layerSpacing = networkWidth / (layerConfig.length - 1);
      
      layerConfig.forEach((nodeCount, layerIndex) => {
        const x = startX + (layerIndex * layerSpacing);
        
        // Spread vertical spacing based on node count to fill height
        // Less nodes = more space between them
        const availableHeight = 400; 
        const nodeSpacing = availableHeight / (nodeCount + 1);
        const startY = (canvas.height - availableHeight) / 2;
        
        for (let i = 0; i < nodeCount; i++) {
          nodes.push({
            x: x,
            baseY: startY + ((i + 1) * nodeSpacing), 
            y: startY + ((i + 1) * nodeSpacing),
            layer: layerIndex,
            id: `${layerIndex}-${i}`,
            activation: 0,
            floatOffset: Math.random() * 100,
            floatSpeed: 0.001 + Math.random() * 0.001 // Slower float
          });
        }
      });

      // 2. Connect Layers
      nodes.forEach(source => {
        nodes.forEach(target => {
          if (target.layer === source.layer + 1) {
            connections.push({
              source,
              target,
              weight: Math.random()
            });
          }
        });
      });
    };

    class Pulse {
      constructor(connection) {
        this.connection = connection;
        this.progress = 0;
        this.speed = 0.008; // SLOW SPEED (Adjusted as requested)
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
          this.connection.target.activation = 1.0; 
          return false; 
        }
        return true; 
      }

      draw() {
        const sx = this.connection.source.x;
        const sy = this.connection.source.y;
        const tx = this.connection.target.x;
        const ty = this.connection.target.y;

        // Curve Control Points
        const cp1x = sx + (tx - sx) * 0.5;
        const cp1y = sy;
        const cp2x = sx + (tx - sx) * 0.5;
        const cp2y = ty;

        const t = this.progress;
        const invT = 1 - t;
        
        const cx = Math.pow(invT, 3)*sx + 3*Math.pow(invT, 2)*t*cp1x + 3*invT*Math.pow(t, 2)*cp2x + Math.pow(t, 3)*tx;
        const cy = Math.pow(invT, 3)*sy + 3*Math.pow(invT, 2)*t*cp1y + 3*invT*Math.pow(t, 2)*cp2y + Math.pow(t, 3)*ty;

        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#60a5fa"; // Lighter Blue for visibility
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#3b82f6";
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      // 1. Animate Nodes (Slow Breathing)
      nodes.forEach(node => {
        node.y = node.baseY + Math.sin(time * node.floatSpeed + node.floatOffset) * 8;
      });

      // 2. Draw Connections
      connections.forEach(conn => {
        ctx.beginPath();
        const sx = conn.source.x;
        const sy = conn.source.y;
        const tx = conn.target.x;
        const ty = conn.target.y;
        const cp1x = sx + (tx - sx) * 0.5;
        const cp1y = sy; 
        const cp2x = sx + (tx - sx) * 0.5;
        const cp2y = ty;

        ctx.moveTo(sx, sy);
        ctx.bezierCurveTo(cp1x, sy, cp2x, ty, tx, ty);
        
        // Dynamic Opacity
        const alpha = 0.05; // Base visibility
        const activeAlpha = (conn.source.activation * 0.4) + (conn.target.activation * 0.4);
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(alpha + activeAlpha, 0.6)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // 3. Fire Pulses (Input Layer)
      // Fire more frequently because speed is slower, to keep visual interest
      if (time % 40 === 0) { 
        const inputNodes = nodes.filter(n => n.layer === 0);
        // Fire 1 random input node
        const sourceNode = inputNodes[Math.floor(Math.random() * inputNodes.length)];
        sourceNode.activation = 1.0;
      }

      // 4. Propagate Logic
      nodes.forEach(node => {
        if (node.activation > 0) {
           node.activation -= 0.01; // Decay slower for smoother fade
           
           // Threshold to fire next layer
           if (node.activation > 0.85 && !node.fired && node.layer < layerConfig.length - 1) {
              node.fired = true;
              const outgoing = connections.filter(c => c.source === node);
              outgoing.forEach(conn => pulses.push(new Pulse(conn)));
           }

           if (node.activation < 0.2) node.fired = false;
        }
      });

      // 5. Update Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const keep = pulses[i].update();
        pulses[i].draw();
        if (!keep) pulses.splice(i, 1);
      }

      // 6. Draw Nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2); // Slightly larger nodes
        
        const r = 30 + (59 - 30) * node.activation;
        const g = 31 + (130 - 31) * node.activation;
        const b = 32 + (246 - 32) * node.activation;
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.2 + node.activation * 0.8})`;
        ctx.fill();

        if (node.activation > 0.05) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 6 + node.activation * 10, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(96, 165, 250, ${node.activation * 0.6})`;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}