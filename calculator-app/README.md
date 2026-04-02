# Calculator App

A beautiful, fully-functional calculator built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## Features

- ✅ Basic arithmetic: addition, subtraction, multiplication, division
- ✅ Percentage calculation
- ✅ Toggle sign (+/-)
- ✅ Backspace / Clear Entry / All Clear
- ✅ Calculation history (last 10 results)
- ✅ Full keyboard support
- ✅ Responsive design
- ✅ Error handling (e.g., division by zero)
- ✅ Docker support

## Getting Started

### Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Docker

**Using Docker Compose (recommended):**

```bash
docker-compose up --build
```

**Using Docker directly:**

```bash
# Build the image
docker build -t calculator-app .

# Run the container
docker run -p 3000:3000 calculator-app
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
calculator-app/
├── public/                  # Static assets
│   ├── favicon.ico
│   ├── calculator-icon.svg
│   └── og-image.png
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   └── components/
│       ├── Calculator.tsx   # Main calculator logic
│       ├── Display.tsx      # Display component
│       ├── ButtonGrid.tsx   # Button layout
│       └── CalcButton.tsx   # Individual button
├── Dockerfile
├── docker-compose.yml
├── next.config.js
├── tailwind.config.ts
└── package.json
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Input digit |
| `.` | Decimal point |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `%` | Percentage |
| `Enter` / `=` | Calculate result |
| `Backspace` | Delete last digit |
| `Escape` | Clear all |
| `Delete` | Clear entry |

## Tech Stack

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Docker](https://www.docker.com/)
