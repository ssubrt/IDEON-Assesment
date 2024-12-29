export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Booking {
  date: string;
  time: string;
  userName: string;
  createdAt: string;
}