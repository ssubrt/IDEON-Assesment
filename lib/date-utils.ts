import { addMinutes, format, parse, setHours, setMinutes } from 'date-fns';
import {
  WORK_START_HOUR,
  WORK_END_HOUR,
  SLOT_DURATION_MINUTES,
  DATE_FORMAT,
  TIME_FORMAT,
  BOOKING_WINDOW_DAYS
} from './constants';
import type { TimeSlot } from '@/types/booking';

export function generateTimeSlots(date: string): TimeSlot[] {
  const selectedDate = parse(date, DATE_FORMAT, new Date());
  const slots: TimeSlot[] = [];
  
  let currentSlot = setHours(setMinutes(selectedDate, 0), WORK_START_HOUR);
  const endTime = setHours(selectedDate, WORK_END_HOUR);

  while (currentSlot < endTime) {
    slots.push({
      time: format(currentSlot, TIME_FORMAT),
      available: true
    });
    currentSlot = addMinutes(currentSlot, SLOT_DURATION_MINUTES);
  }

  return slots;
}

export function isValidBookingDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + BOOKING_WINDOW_DAYS);
  
  return date >= today && date <= maxDate;
}