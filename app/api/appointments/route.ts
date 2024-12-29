import { NextResponse } from 'next/server';
import { db, isFirebaseInitialized } from '@/lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { BOOKINGS_COLLECTION } from '@/lib/constants';

export async function GET() {
  if (!isFirebaseInitialized()) {
    return NextResponse.json(
      { error: 'Service configuration error' },
      { status: 500 }
    );
  }

  try {
    const bookingsRef = collection(db, BOOKINGS_COLLECTION);
    const q = query(bookingsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const appointments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}