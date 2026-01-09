export const ROOM_TYPES = ['standard', 'deluxe', 'suite'] as const;
export type RoomType = (typeof ROOM_TYPES)[number];

export const ROOM_LABELS: Record<RoomType, string> = {
  standard: 'Standard Room',
  deluxe: 'Deluxe Room',
  suite: 'Suite',
};

export const ROOM_DESCRIPTIONS: Record<RoomType, string> = {
  standard: 'Comfortable room with essential amenities',
  deluxe: 'Spacious room with premium amenities',
  suite: 'Luxury suite with separate living area',
};

export interface HotelRoomType {
  type: RoomType;
  price: number;
  available: number;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  roomTypes: HotelRoomType[];
}

export const HOTELS: Hotel[] = [
  {
    id: 'grand-plaza',
    name: 'Grand Plaza Hotel',
    location: 'New York, NY',
    description: 'Luxury hotel in the heart of Manhattan with stunning city views.',
    image: '/images/hotel1.jpg',
    rating: 4.8,
    roomTypes: [
      { type: 'standard', price: 150, available: 20 },
      { type: 'deluxe', price: 250, available: 15 },
      { type: 'suite', price: 450, available: 5 },
    ],
  },
  {
    id: 'seaside-resort',
    name: 'Seaside Resort & Spa',
    location: 'Miami, FL',
    description: 'Beachfront resort with world-class spa and ocean views.',
    image: '/images/hotel2.jpg',
    rating: 4.6,
    roomTypes: [
      { type: 'standard', price: 120, available: 30 },
      { type: 'deluxe', price: 200, available: 20 },
      { type: 'suite', price: 380, available: 8 },
    ],
  },
  {
    id: 'mountain-lodge',
    name: 'Mountain Lodge Retreat',
    location: 'Aspen, CO',
    description: 'Cozy mountain retreat with ski-in/ski-out access.',
    image: '/images/hotel3.jpg',
    rating: 4.7,
    roomTypes: [
      { type: 'standard', price: 180, available: 15 },
      { type: 'deluxe', price: 280, available: 10 },
      { type: 'suite', price: 500, available: 3 },
    ],
  },
  {
    id: 'urban-boutique',
    name: 'Urban Boutique Inn',
    location: 'San Francisco, CA',
    description: 'Stylish boutique hotel in downtown San Francisco.',
    image: '/images/hotel4.jpg',
    rating: 4.5,
    roomTypes: [
      { type: 'standard', price: 130, available: 25 },
      { type: 'deluxe', price: 220, available: 12 },
      { type: 'suite', price: 400, available: 4 },
    ],
  },
  {
    id: 'desert-oasis',
    name: 'Desert Oasis Resort',
    location: 'Phoenix, AZ',
    description: 'Tranquil desert escape with golf course and spa.',
    image: '/images/hotel5.jpg',
    rating: 4.4,
    roomTypes: [
      { type: 'standard', price: 100, available: 35 },
      { type: 'deluxe', price: 170, available: 18 },
      { type: 'suite', price: 320, available: 6 },
    ],
  },
];

export const BOOKING_STATUSES = ['confirmed', 'pending', 'cancelled'] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const STATUS_COLORS: Record<BookingStatus, { bg: string; text: string }> = {
  confirmed: { bg: 'bg-green-100', text: 'text-green-800' },
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800' },
};

export const MAX_GUESTS = 6;
export const MIN_GUESTS = 1;
