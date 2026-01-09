'use client';

import { Header } from '@/components/Header';
import { BookingList } from '@/components/BookingList';

export default function BookingsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>
        <BookingList />
      </main>
    </div>
  );
}
