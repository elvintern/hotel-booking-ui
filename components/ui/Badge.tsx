'use client';

import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';
import { STATUS_COLORS, type BookingStatus } from '@/lib/constants';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: BookingStatus;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, status, ...props }, ref) => {
    const colors = STATUS_COLORS[status];

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize',
          colors.bg,
          colors.text,
          className
        )}
        {...props}
      >
        <span className={cn(
          'w-1.5 h-1.5 rounded-full',
          status === 'confirmed' && 'bg-emerald-500',
          status === 'pending' && 'bg-amber-500',
          status === 'cancelled' && 'bg-red-500'
        )} />
        {status}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
