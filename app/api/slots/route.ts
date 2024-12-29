import { NextResponse } from 'next/server';
import { db, isFirebaseInitialized } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { generateTimeSlots } from '@/lib/date-utils';
import { BOOKINGS_COLLECTION } from '@/lib/constants';

export async function GET(request: Request) {
  if (!isFirebaseInitialized()) {
    console.error('Firebase is not initialized');
    return NextResponse.json(
      { error: 'Service configuration error' },
      { status: 500 }
    );
  }

  try {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { error: 'Date is required' },
        { status: 400 }
      );
    }

    // Generate all possible slots
    const slots = generateTimeSlots(date);

    // Get booked slots from Firestore
    const bookingsRef = collection(db, BOOKINGS_COLLECTION);
    const q = query(
      bookingsRef,
      where('date', '==', date)
    );
    
    const querySnapshot = await getDocs(q);
    const bookedSlots = querySnapshot.docs.map(doc => doc.data().time);

    // Mark booked slots as unavailable
    const availableSlots = slots.map(slot => ({
      ...slot,
      available: !bookedSlots.includes(slot.time)
    }));

    return NextResponse.json({ slots: availableSlots });
  } catch (error) {
    console.error('Error in slots API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch slots' },
      { status: 500 }
    );
  }
}
