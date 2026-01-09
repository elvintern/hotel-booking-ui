'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { BookingForm } from '@/components/BookingForm';
import { Modal } from '@/components/ui/Modal';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HOTELS, ROOM_LABELS, ROOM_DESCRIPTIONS, type RoomType } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function HotelDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | undefined>(undefined);

  const hotel = HOTELS.find((h) => h.id === id);

  const openBookingModal = (roomType?: RoomType) => {
    setSelectedRoomType(roomType);
    setIsModalOpen(true);
  };

  if (!hotel) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
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
            Back to hotels
          </Link>

          {/* Hotel Header */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Image */}
            <div className="h-64 lg:h-80 rounded-xl relative overflow-hidden shadow-lg">
              <Image
                src={hotel.image}
                alt={hotel.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Hotel Info */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <svg className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-medium text-gray-900">{hotel.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{hotel.location}</span>
                </div>
              </div>

              <p className="text-gray-600 text-lg">{hotel.description}</p>

              <Button size="lg" onClick={() => openBookingModal()} className="w-full sm:w-auto">
                Book Now
              </Button>
            </div>
          </div>

          {/* Room Types */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Rooms</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {hotel.roomTypes.map((room) => (
                <Card key={room.type}>
                  <CardContent className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{ROOM_LABELS[room.type]}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {ROOM_DESCRIPTIONS[room.type]}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-baseline justify-between pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-xl font-bold text-accent">
                          {formatCurrency(room.price)}
                        </span>
                        <span className="text-gray-500"> / night</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {room.available} available
                      </span>
                    </div>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => openBookingModal(room.type)}
                    >
                      Select Room
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Book at ${hotel.name}`}
      >
        <BookingForm hotel={hotel} onClose={() => setIsModalOpen(false)} initialRoomType={selectedRoomType} />
      </Modal>
    </div>
  );
}
