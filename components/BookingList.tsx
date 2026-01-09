'use client';

import { useBookingStore } from '@/store/bookingStore';
import { BookingCard } from './BookingCard';
import { Button } from './ui/Button';

export function BookingList() {
  const { openModal, hasHydrated, getBookingsSortedByCheckIn } = useBookingStore();
  const bookings = getBookingsSortedByCheckIn();

  if (!hasHydrated) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center mb-5">
          <svg
            className="w-10 h-10 text-primary/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
        <p className="text-gray-500 text-center mb-8 max-w-sm">
          Create your first hotel booking to get started. Your bookings will appear here.
        </p>
        <Button onClick={openModal} size="lg">Create Your First Booking</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Your Bookings ({bookings.length})
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}
