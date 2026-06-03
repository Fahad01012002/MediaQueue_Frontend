import Link from 'next/link';
import NavbarDesign from './NavbarDesign';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import Profile from './Profile';
import ThemeToggle from './ThemeToggle';

const navbarLinks = [
    { id: 1, name: "Home", href: '/' },
    { id: 2, name: "Tutors", href: '/tutors' },
];

const userLinks = [
    { id: 3, name: 'Add Tutor', href: '/add-tutors' },
    { id: 4, name: 'My Tutors', href: '/my-tutors' },
    { id: 5, name: 'Bookings', href: '/bookings' },
];

const Navbar = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;

    return (
        <div className="sticky top-0 z-50 bg-white/10 backdrop-blur-md shadow-sm">
            <div className="flex items-center justify-between mt-5 mb-5 w-11/12 mx-auto">
                {/* Logo */}
                <div>
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 bg-linear-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300 transform group-hover:-translate-y-0.5">
                            M
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            MediQueue
                        </span>
                    </Link>
                </div>

                {/* Desktop nav links */}
                <div className="hidden md:flex items-center gap-1">
                    {navbarLinks.map(link => (
                        <NavbarDesign key={link.id} navbarLink={link} />
                    ))}
                    {user && userLinks.map(link => (
                        <NavbarDesign key={link.id} navbarLink={link} />
                    ))}
                </div>

                {/* Profile component handles both desktop auth + mobile menu */}
                <div className='flex gap-3'>
                    <ThemeToggle />
                    <Profile
                        user={user}
                        navbarLinks={navbarLinks}
                        userLinks={userLinks}
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;