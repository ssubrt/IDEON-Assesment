"use client";

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { TimeSlots } from '@/components/time-slots';
import { Card } from '@/components/ui/card';
import { isValidBookingDate } from '@/lib/date-utils';
import { DATE_FORMAT } from '@/lib/constants';

interface BookingCalendarProps {
  userName: string;
}

export function BookingCalendar({ userName }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Select a Date</h2>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={(date) => !isValidBookingDate(date)}
        />
      </Card>

      {selectedDate && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            Available Slots for {format(selectedDate, 'MMMM d, yyyy')}
          </h2>
          <TimeSlots
            date={format(selectedDate, DATE_FORMAT)}
            userName={userName}
          />
        </Card>
      )}
    </div>
  );
}