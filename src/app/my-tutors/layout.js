// app/my-tutors/layout.js
export const metadata = {
  title: 'My Tutors',
  description: 'View your booked tutors and manage appointments',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MyTutorsLayout({ children }) {
  return <>{children}</>;
}