// react/src/components/TopologyCanvas.jsx
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useState } from "react";

// Mock data for demonstration
const nodes = [
  { id: 1, type: "vm", x: 100, y: 100 },
  { id: 2, type: "router", x: 300, y: 200 },
  { id: 3, type: "db", x: 500, y: 100 },
];
const links = [
  { source: 1, target: 2 },
  { source: 2, target: 3 },
];

// Simple icon mapping (replace with images later)
const nodeIcons = {
  vm: "🖥️",
  router: "🌐",
  db: "🗄️",
};

const TopologyCanvas = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // D3 zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 2])
      .on("zoom", (event) => {
        context.save();
        context.clearRect(0, 0, dimensions.width, dimensions.height);
        context.translate(event.transform.x, event.transform.y);
        context.scale(event.transform.k, event.transform.k);
        drawTopology(context);
        context.restore();
      });

    d3.select(canvas).call(zoom);

    // Initial draw
    drawTopology(context);

    // Prevent page scroll on canvas interaction
    const preventScroll = (e) => e.preventDefault();
    canvas.addEventListener("wheel", preventScroll, { passive: false });

    // Cleanup
    return () => {
      canvas.removeEventListener("wheel", preventScroll);
    };
  }, [dimensions]);

  // Draw nodes and links
  function drawTopology(ctx) {
    // Draw links
    ctx.strokeStyle = "#888";
    ctx.lineWidth = 2;
    links.forEach((link) => {
      const source = nodes.find((n) => n.id === link.source);
      const target = nodes.find((n) => n.id === link.target);
      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach((node) => {
      ctx.font = "32px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(nodeIcons[node.type] || "❓", node.x, node.y);
    });
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        background: "#f8fafc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{
          border: "1px solid #ccc",
          background: "#fff",
          cursor: "grab",
        }}
        tabIndex={0}
      />
    </div>
  );
};

export default TopologyCanvas;
