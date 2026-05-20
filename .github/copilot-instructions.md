# TheHerTribe Next.js Project Instructions

This is a Next.js project for www.thehertribe.com.

## Project Setup

- Project Type: Next.js
- Domain: www.thehertribe.com
- Node Version: 18+ recommended
- Package Manager: npm
- Framework: Next.js 15 with App Router
- Styling: Tailwind CSS
- Language: TypeScript

## Development

To run the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000 (or the next available port if 3000 is in use)

## Build

To build for production:
```bash
npm run build
```

To start the production server:
```bash
npm start
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      - Root layout
│   ├── page.tsx        - Home page
│   └── globals.css     - Global styles
.github/
└── copilot-instructions.md  - This file
public/                - Static assets
```

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open http://localhost:3000 in your browser
4. Begin editing `src/app/page.tsx` to see changes

## Technologies

- Next.js 15 - React framework with App Router
- TypeScript - Type-safe development
- Tailwind CSS - Utility-first styling
- ESLint - Code quality
