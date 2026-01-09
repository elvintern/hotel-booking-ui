'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { BookingDetail } from '@/components/BookingDetail';
import { useBookingStore } from '@/store/bookingStore';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BookingDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { getBookingById, hasHydrated } = useBookingStore();
  const booking = getBookingById(id);

  if (!hasHydrated) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        </main>
      </div>
    );
  }

  if (!booking) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <BookingDetail booking={booking} />
      </main>
    </div>
  );
}
