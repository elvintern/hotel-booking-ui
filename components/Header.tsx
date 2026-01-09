'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { HOTELS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Title */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <span className="text-xl font-semibold text-gray-900">StayBook</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <Link
              href="/bookings"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              My Bookings
            </Link>

            {/* New Booking Button with Dropdown */}
            <div className="relative" ref={dropdownRef}>
            <Button onClick={() => setIsDropdownOpen(!isDropdownOpen)} size="md" variant="accent">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Booking
              <svg
                className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-200 py-2 z-50 animate-in">
                <div className="px-4 py-2.5 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">Select a hotel</p>
                  <p className="text-xs text-gray-500 mt-0.5">Choose where you&apos;d like to stay</p>
                </div>
                <div className="max-h-80 overflow-y-auto py-1">
                  {HOTELS.map((hotel) => {
                    const lowestPrice = Math.min(...hotel.roomTypes.map((r) => r.price));
                    return (
                      <Link
                        key={hotel.id}
                        href={`/hotels/${hotel.id}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors group"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="w-11 h-11 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-primary/60"
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
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate group-hover:text-primary transition-colors">{hotel.name}</p>
                          <p className="text-xs text-gray-500">{hotel.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-accent">{formatCurrency(lowestPrice)}</p>
                          <p className="text-xs text-gray-500">/night</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </header>
  );
}
