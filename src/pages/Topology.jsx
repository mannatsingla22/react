import React, { useEffect, useRef } from 'react';
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

const iconMap = {
  tower: '📡',
  router: '🛜',
  cluster: '🗄️',
  server: '🖥️',
  vm: '💾',
};

const Topology = () => {
  const ref = useRef();

  useEffect(() => {
    const width = 900;
    const height = 600;
    d3.select(ref.current).selectAll('*').remove();

    const svg = d3
      .select(ref.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('width', '100%')
      .style('height', 'auto')
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().size([width - 100, height - 100]);
    treeLayout(root);

    // Draw links
    svg
      .append('g')
      .selectAll('path')
      .data(root.links())
      .join('path')
      .attr(
        'd',
        d3
          .linkVertical()
          .x(d => d.x + 50)
          .y(d => d.y + 50)
      )
      .attr('fill', 'none')
      .attr('stroke', '#999')
      .attr('stroke-width', 2);

    // Draw nodes
    const node = svg
      .append('g')
      .selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr('transform', d => `translate(${d.x + 50},${d.y + 50})`);

    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('font-size', 32)
      .text(d => iconMap[d.data.type]);

    node
      .append('text')
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('font-size', 14)
      .attr('fill', '#333')
      .text(d => d.data.name);
  }, []);

  return (
    <div className="topology-container">
      <h2>Network Topology</h2>
      <svg ref={ref} preserveAspectRatio="xMidYMid meet"></svg>
    </div>
  );
};

export default Topology;