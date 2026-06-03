
export const metadata = {
  title: 'My Bookings',
  description: 'Manage your tutor booking requests and schedules',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BookingsLayout({ children }) {
  return <>{children}</>;
}