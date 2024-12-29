import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const { date, time, userName } = await request.json();

    if (!date || !time || !userName) {
      return NextResponse.json(
        { error: 'Date, time and userName are required' },
        { status: 400 }
      );
    }

    // Check if slot is already booked
    const bookingsRef = collection(db, 'bookings');
    const q = query(
      bookingsRef,
      where('date', '==', date),
      where('time', '==', time)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return NextResponse.json(
        { error: 'Slot already booked' },
        { status: 409 }
      );
    }

    // Create new booking
    await addDoc(bookingsRef, {
      date,
      time,
      userName,
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error booking slot:', error);
    return NextResponse.json(
      { error: 'Failed to book slot' },
      { status: 500 }
    );
  }
}