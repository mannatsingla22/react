// Mock D3 functions used in your component
jest.mock('d3', () => ({
  zoom: () => ({
    scaleExtent: () => ({ on: () => {} }),
    on: () => {}
  }),
  select: () => ({ call: () => {} }),
  hierarchy: () => ({ links: () => [], descendants: () => [] }),
  tree: () => ({ size: () => ({}) }),
  linkVertical: () => ({ x: () => ({ y: () => ({ context: () => () => {} }) }) })
}));

// Mock canvas getContext for jsdom
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = () => ({
    save: () => {},
    restore: () => {},
    clearRect: () => {},
    translate: () => {},
    scale: () => {},
    beginPath: () => {},
    arc: () => {},
    fill: () => {},
    stroke: () => {},
    fillText: () => {},
    drawImage: () => {},
    moveTo: () => {},
    lineTo: () => {},
    strokeStyle: '',
    lineWidth: 1,
    font: '',
    textAlign: '',
    textBaseline: '',
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import TopologyCanvas from '../components/TopologyCanvas';

test('renders the topology canvas', () => {
  render(<TopologyCanvas />);
  expect(document.querySelector('canvas')).toBeInTheDocument();
});
