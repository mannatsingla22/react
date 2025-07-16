# React Network Topology Visualization

This project is a modern React app that visualizes a network topology using D3.js on a `<canvas>`. It features a mock authentication flow, a responsive UI, and unit tests with Jest.

## Features

- **D3.js Topology on Canvas**: Network topology is rendered using D3.js on a `<canvas>`, not SVG or JSX.
- **Correct Node Icons**: Each node type (tower, router, cluster, server, VM) uses a modern icon (PNG) from the `public/` folder.
- **Zoom, Pan, and Scroll**: Interactive zoom in/out and pan with D3. The canvas is scrollable, and page scroll is prevented during interaction.
- **Responsive Design**: The topology loads fast and works well on all screen sizes.
- **Modern Login Page**: The login screen features a simple, modern background image (from Unsplash/Freepik) and shows only the login form at first.
- **Mock Authentication**: No real login or API—after clicking "Login," the topology screen is shown.
- **Unit Testing**: All UI unit test files are in `src/ui-tests/` and use the Jest framework.

## Getting Started

### Prerequisites
- Node.js (v16 or later recommended)
- npm

### Install Dependencies
```sh
npm install
```

### Run the App
```sh
npm run dev
```
Visit the URL shown in the terminal (e.g., http://localhost:5173).

### Run Unit Tests
```sh
npm test
```

### Folder Structure
```
react/
  src/
    components/
    pages/
    ui-tests/      # All UI unit test files here
  public/          # PNG icons and background image here
```

## Contributing
- Keep all UI test files in `src/ui-tests/`.
- Use clear commit messages.
- For new features, update the README as needed.

## License
MIT