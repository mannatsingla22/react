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
      strokeStyle: '',
      lineWidth: 1,
      font: '',
      textAlign: '',
      textBaseline: '',
    });
  });
  
import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders App without crashing', () => {
  render(<App />);
  // You can add more specific tests based on your App logic
});
