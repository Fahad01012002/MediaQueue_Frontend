// app/sign-up/layout.js
export const metadata = {
  title: 'Sign Up',
  description: 'Create a new account on Tutor Finder',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUpLayout({ children }) {
  return <>{children}</>;
}