import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './topology.css';

// Hierarchical data structure for d3.tree
const data = {
  name: 'Tower',
  type: 'tower',
  children: [
    {
      name: 'Router',
      type: 'router',
      children: [
        {
          name: 'Server Cluster',
          type: 'cluster',
          children: [
            {
              name: 'Server',
              type: 'server',
              children: [{ name: 'VM', type: 'vm' }],
            },
            {
              name: 'Server',
              type: 'server',
              children: [{ name: 'VM', type: 'vm' }],
            },
            {
              name: 'Server',
              type: 'server',
              children: [{ name: 'VM', type: 'vm' }],
            },
          ],
        },
      ],
    },
    {
      name: 'Router',
      type: 'router',
      children: [
        {
          name: 'Server Cluster',
          type: 'cluster',
          children: [
            {
              name: 'Server',
              type: 'server',
              children: [{ name: 'VM', type: 'vm' }],
            },
            {
              name: 'Server',
              type: 'server',
              children: [{ name: 'VM', type: 'vm' }],
            },
            {
              name: 'Server',
              type: 'server',
              children: [{ name: 'VM', type: 'vm' }],
            },
          ],
        },
      ],
    },
  ],
};

// Map node types to icon filenames (place these icons in public/)
const iconMap = {
  tower: '/tower.png',
  router: '/router.png',
  cluster: '/cluster.png',
  server: '/server.png',
  vm: '/vm.png',
};

const ICON_SIZE = 100; // Make icons big

const Topology = () => {
  const canvasRef = useRef();
  const containerRef = useRef();
  const [icons, setIcons] = useState({});

  // Load icons
  useEffect(() => {
    const types = Object.keys(iconMap);
    const loadedIcons = {};
    let loadedCount = 0;
    types.forEach(type => {
      const img = new window.Image();
      img.src = iconMap[type];
      img.onload = () => {
        loadedIcons[type] = img;
        loadedCount++;
        if (loadedCount === types.length) {
          setIcons({ ...loadedIcons });
        }
      };
      img.onerror = () => {
        loadedIcons[type] = null;
        loadedCount++;
        if (loadedCount === types.length) {
          setIcons({ ...loadedIcons });
        }
      };
    });
  }, []);

  // Responsive canvas size
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      if (container && canvasRef.current) {
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        drawTopology(width, height);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line
  }, [icons]);

  // Draw topology
  const drawTopology = (width, height) => {
    if (!Object.keys(icons).length) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);

    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().size([width - 100, height - 100]);
    treeLayout(root);

    // Draw links
    context.save();
    context.strokeStyle = '#999';
    context.lineWidth = 2;
    context.translate(50, 100);
    root.links().forEach(link => {
      context.beginPath();
      d3.linkVertical()
        .x(d => d.x)
        .y(d => d.y)
        .context(context)(link);
      context.stroke();
    });
    context.restore();

    // Draw nodes
    context.save();
    context.translate(50, 100);
    root.descendants().forEach(node => {
      // Draw icon
      const icon = icons[node.data.type];
      if (icon) {
        context.drawImage(
          icon,
          node.x - ICON_SIZE / 2,
          node.y - ICON_SIZE / 2 - 10,
          ICON_SIZE,
          ICON_SIZE
        );
      } else {
        // fallback: draw a circle
        context.beginPath();
        context.arc(node.x, node.y - 5, ICON_SIZE / 2, 0, 2 * Math.PI);
        context.fillStyle = '#fff';
        context.fill();
        context.strokeStyle = '#555';
        context.lineWidth = 3;
        context.stroke();
      }
      // Draw label below the icon
      context.fillStyle = '#1a237e';
      context.font = 'bold 22px Segoe UI, Arial, sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'top';
      context.fillText(node.data.name, node.x, node.y + ICON_SIZE / 2 + 8);
    });
    context.restore();
  };

  // D3 zoom and pan
  useEffect(() => {
    if (!Object.keys(icons).length) return;
    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;
    let currentTransform = d3.zoomIdentity;

    function draw() {
      const context = canvas.getContext('2d');
      context.save();
      context.clearRect(0, 0, width, height);
      context.translate(currentTransform.x, currentTransform.y);
      context.scale(currentTransform.k, currentTransform.k);
      drawTopology(width, height);
      context.restore();
    }

    const zoom = d3.zoom()
      .scaleExtent([0.5, 5])
      .on('zoom', (event) => {
        currentTransform = event.transform;
        draw();
      });

    d3.select(canvas).call(zoom);
    draw();

    // Prevent page scroll during canvas interaction
    const preventScroll = (e) => {
      if (document.activeElement === canvas) {
        e.preventDefault();
      }
    };
    canvas.addEventListener('wheel', preventScroll, { passive: false });

    // Cleanup
    return () => {
      d3.select(canvas).on('.zoom', null);
      canvas.removeEventListener('wheel', preventScroll);
    };
    // eslint-disable-next-line
  }, [icons]);

  return (
    <div
      ref={containerRef}
      className="topology-container"
      style={{ overflow: 'auto', height: '100vh', width: '100vw', background: '#f8f9fa' }}
      tabIndex={0}
    >
      <canvas
        ref={canvasRef}
        style={{ border: '1px solid #ccc', display: 'block', margin: '0 auto', background: '#fff' }}
      ></canvas>
    </div>
  );
};

export default Topology;