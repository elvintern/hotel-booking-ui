'use client';

import { Header } from '@/components/Header';
import { HotelList } from '@/components/HotelList';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <HotelList />
      </main>
    </div>
  );
}
