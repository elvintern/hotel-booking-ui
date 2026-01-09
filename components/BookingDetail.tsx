'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import type { Booking } from '@/store/bookingStore';
import { useBookingStore } from '@/store/bookingStore';
import { ROOM_LABELS, ROOM_DESCRIPTIONS } from '@/lib/constants';
import { formatDate, formatCurrency, calculateNights } from '@/lib/utils';

interface BookingDetailProps {
  booking: Booking;
}

export function BookingDetail({ booking }: BookingDetailProps) {
  const { updateBookingStatus } = useBookingStore();
  const nights = calculateNights(booking.checkInDate, booking.checkOutDate);

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      updateBookingStatus(booking.id, 'cancelled');
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to bookings
      </Link>

      {/* Header Card */}
      <Card>
        <CardHeader className="pb-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{booking.hotelName}</h1>
                  <p className="text-gray-500">{ROOM_LABELS[booking.roomType]}</p>
                </div>
              </div>
            </div>
            <Badge status={booking.status} />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Dates Section */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-3 rounded-lg bg-gray-50">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Check-in</p>
              <p className="text-gray-900 font-medium mt-1">{formatDate(booking.checkInDate)}</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Check-out</p>
              <p className="text-gray-900 font-medium mt-1">{formatDate(booking.checkOutDate)}</p>
            </div>
          </div>

          {/* Guest Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Guest Name</p>
              <p className="text-gray-900">{booking.guestName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Number of Guests</p>
              <p className="text-gray-900">
                {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</p>
              <p className="text-gray-900">{booking.email}</p>
            </div>
            {booking.phone && (
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</p>
                <p className="text-gray-900">{booking.phone}</p>
              </div>
            )}
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Special Requests</p>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{booking.specialRequests}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Room Details Card */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Room Details</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-gray-900">{ROOM_LABELS[booking.roomType]}</p>
              <p className="text-sm text-gray-600">
                {ROOM_DESCRIPTIONS[booking.roomType]}
              </p>
            </div>
            <p className="text-gray-900">
              {formatCurrency(booking.pricePerNight)}/night
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Price Summary Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Price Summary</h2>
        </div>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>
              {ROOM_LABELS[booking.roomType]} x {nights}{' '}
              {nights === 1 ? 'night' : 'nights'}
            </span>
            <span>{formatCurrency(booking.totalPrice)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-100">
            <span>Total</span>
            <span className="text-accent">{formatCurrency(booking.totalPrice)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      {booking.status !== 'cancelled' && (
        <div className="flex gap-3">
          <Button variant="danger" onClick={handleCancel}>
            Cancel Booking
          </Button>
        </div>
      )}

      {/* Booking ID */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-md font-mono">
          ID: {booking.id.slice(0, 8)}
        </span>
        <span>·</span>
        <span>Created {formatDate(booking.createdAt)}</span>
      </div>
    </div>
  );
}
