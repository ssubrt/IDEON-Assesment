"use client";

import { useState } from 'react';
import { UserNameForm } from '@/components/user-name-form';
import { BookingCalendar } from '@/components/booking-calendar';
import Link from 'next/link';

export default function Home() {
  const [userName, setUserName] = useState<string>('');

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Appointment Booking
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Book your 30-minute appointment slot
          </p>
          <Link 
            href="/dashboard" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View All Appointments →
          </Link>
        </div>

        {!userName ? (
          <UserNameForm onSubmit={setUserName} />
        ) : (
          <BookingCalendar userName={userName} />
        )}
      </div>
    </main>
  );
}