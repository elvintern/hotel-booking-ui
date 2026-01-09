'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from './ui/Card';
import type { Hotel } from '@/lib/constants';
import { ROOM_LABELS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const lowestPrice = Math.min(...hotel.roomTypes.map((r) => r.price));

  return (
    <Link href={`/hotels/${hotel.id}`}>
      <Card hover className="h-full overflow-hidden group">
        {/* Hotel Image */}
        <div className="h-48 relative overflow-hidden">
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {/* Rating badge */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold text-gray-900">{hotel.rating}</span>
          </div>
        </div>

        <CardContent className="space-y-3">
          {/* Header */}
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1">{hotel.name}</h3>
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">{hotel.description}</p>

          {/* Room types preview */}
          <div className="flex flex-wrap gap-1.5">
            {hotel.roomTypes.map((room) => (
              <span
                key={room.type}
                className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full font-medium"
              >
                {ROOM_LABELS[room.type]}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="pt-3 border-t border-gray-100 flex items-baseline justify-between">
            <div>
              <span className="text-lg font-bold text-accent">
                {formatCurrency(lowestPrice)}
              </span>
              <span className="text-sm text-gray-500"> / night</span>
            </div>
            <span className="text-sm text-primary font-medium group-hover:underline">View details →</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
