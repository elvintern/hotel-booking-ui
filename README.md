# StayBook - Hotel Booking UI

A modern hotel booking interface built with Next.js, React, Zustand, and Tailwind CSS.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Zustand** - State management with localStorage persistence
- **Tailwind CSS v4** - Utility-first styling
- **TypeScript** - Type safety

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd hotel-booking-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Assumptions & Trade-offs

### Assumptions
- Single user application (no authentication needed)
- Hotels are pre-defined with fixed room types and pricing
- Bookings are always confirmed on creation (no payment flow)
- Date validation ensures check-out is after check-in

### Trade-offs
- **No backend**: All data in client-side state for simplicity
- **No date picker library**: Using native HTML date inputs for lighter bundle
- **No form library**: Custom validation keeps dependencies minimal
- **No animation library**: CSS animations provide smooth UX without extra dependencies

### Rough Time Spent
- Around 3 hours
