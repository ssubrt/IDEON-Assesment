# Appointment Booking System

A modern, responsive appointment booking system built with Next.js, Firebase, and Tailwind CSS. Features include dark/light theme switching, real-time slot availability, and a comprehensive dashboard.

## Features

- 📅 Interactive calendar for date selection
- ⏰ Real-time slot availability
- 🌓 Dark/Light theme switching
- 📱 Fully responsive design
- 📊 Admin dashboard for appointment management
- 🔥 Firebase integration for data persistence
- 🚀 Fast and optimized performance

## Tech Stack

- **Frontend Framework**: Next.js 13 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Firebase Firestore
- **State Management**: React Hooks
- **Form Handling**: React Hook Form
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Notifications**: react-hot-toast

## Project Structure

```
├── app/
│   ├── api/                 # API routes
│   │   ├── appointments/    # Appointments API
│   │   ├── book/           # Booking API
│   │   └── slots/          # Slots availability API
│   ├── dashboard/          # Dashboard page
│   └── page.tsx            # Home page
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── dashboard/          # Dashboard-specific components
│   ├── booking-calendar.tsx # Calendar component
│   ├── time-slots.tsx      # Time slots selection
│   ├── theme-switcher.tsx  # Theme switching
│   └── user-name-form.tsx  # User name input form
├── lib/
│   ├── api-utils.ts        # API utilities
│   ├── constants.ts        # Global constants
│   ├── date-utils.ts       # Date handling utilities
│   ├── firebase.ts         # Firebase configuration
│   └── utils.ts            # General utilities
└── types/
    └── booking.ts          # TypeScript types
```

## Key Components

- `BookingCalendar`: Handles date selection and displays available time slots
- `TimeSlots`: Manages time slot selection and booking
- `AppointmentList`: Displays booked appointments in the dashboard
- `ThemeSwitcher`: Handles theme switching functionality
- `UserNameForm`: Manages user name input before booking

## API Routes

- `/api/appointments`: Fetches all booked appointments
- `/api/book`: Handles new appointment bookings
- `/api/slots`: Returns available slots for a specific date

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Firebase:
   - Create a Firebase project
   - Enable Firestore
   - Add Firebase configuration to `.env`

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

