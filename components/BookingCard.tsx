'use client';

import Link from 'next/link';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import type { Booking } from '@/store/bookingStore';
import { ROOM_LABELS } from '@/lib/constants';
import { formatDateShort, formatCurrency, calculateNights } from '@/lib/utils';

interface BookingCardProps {
  booking: Booking;
}

export function BookingCard({ booking }: BookingCardProps) {
  const nights = calculateNights(booking.checkInDate, booking.checkOutDate);

  return (
    <Link href={`/bookings/${booking.id}`}>
      <Card hover className="h-full">
        <CardContent className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 line-clamp-1">
              {booking.hotelName}
            </h3>
            <Badge status={booking.status} />
          </div>

          {/* Room Type */}
          <p className="text-sm text-gray-600">{ROOM_LABELS[booking.roomType]}</p>

          {/* Dates */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>
              {formatDateShort(booking.checkInDate)} - {formatDateShort(booking.checkOutDate)}
            </span>
            <span className="text-gray-400">·</span>
            <span>
              {nights} {nights === 1 ? 'night' : 'nights'}
            </span>
          </div>

          {/* Guest Info */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>{booking.guestName}</span>
            <span className="text-gray-400">·</span>
            <span>
              {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
            </span>
          </div>

          {/* Price */}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-lg font-bold text-accent">
              {formatCurrency(booking.totalPrice)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
