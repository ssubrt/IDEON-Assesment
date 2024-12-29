"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchApi } from '@/lib/api-utils';
import type { TimeSlot } from '@/types/booking';
import { format, parseISO } from 'date-fns';

interface TimeSlotsProps {
  date: string;
  userName: string;
}

export function TimeSlots({ date, userName }: TimeSlotsProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    fetchSlots();
  }, [date]);

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const data = await fetchApi<{ slots: TimeSlot[] }>(`/api/slots?date=${date}`);
      setSlots(data.slots);
    } catch (error) {
      toast.error("Failed to fetch available slots");
    } finally {
      setLoading(false);
    }
  };

  const bookSlot = async (time: string) => {
    try {
      setBooking(true);
      await fetchApi('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, time, userName }),
      });
      
      const formattedDate = format(parseISO(date), 'MMMM d, yyyy');
      toast.success(
        `✅ Appointment scheduled!\n${formattedDate} at ${time}`, 
        {
          duration: 4000,
          style: {
            background: '#10B981',
            color: '#fff',
            padding: '16px',
          },
        }
      );
      
      fetchSlots();
    } catch (error) {
      toast.error("Failed to book the slot");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        No slots available for this date
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {slots.map((slot) => (
        <Button
          key={slot.time}
          onClick={() => slot.available && bookSlot(slot.time)}
          disabled={!slot.available || booking}
          variant={slot.available ? "default" : "secondary"}
          className="w-full"
        >
          {slot.time}
        </Button>
      ))}
    </div>
  );
}