"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppointmentList } from '@/components/dashboard/appointment-list';
import { DashboardHeader } from '@/components/dashboard/header';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/theme-switcher';
import toast from 'react-hot-toast';
import type { Booking } from '@/types/booking';

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);
      
      setAppointments(data.appointments);
    } catch (error) {
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <DashboardHeader />
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button 
              onClick={() => router.push('/')}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            >
              Book New Appointment
            </Button>
            <ThemeSwitcher />
          </div>
        </div>
        <AppointmentList 
          appointments={appointments} 
          loading={loading} 
        />
      </div>
    </main>
  );
}