'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Calendar, XCircle, Search, AlertTriangle } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { authClient } from "@/lib/auth-client";
import { getStudentBookingsDetails } from "../lib/data";
import { updateStudentBookingStatus } from "../lib/action";

const BookingsPage = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [canceling, setCanceling] = useState(false);
    const [cancelingId, setCancelingId] = useState(null);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {

        if (!user?.id) return;

        const fetchBookings = async () => {
            try {
                setLoading(true);

                const {data: tokenData} = await authClient.token();
                const data = await getStudentBookingsDetails(user.id , tokenData.token);

                setBookings(data);

            } catch (err) {
                console.error("Fetch bookings error:", err);
                toast.error("Failed to load bookings");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();

    }, [user?.id]);

    const handleCancelConfirm = async () => {

        try {

            setCanceling(true);

            const result = await updateStudentBookingStatus(cancelingId);

            if (result.success) {

                toast.success('Booking cancelled successfully');

                // UI instantly update
                setBookings((prev) =>
                    prev.map((booking) =>
                        booking._id === cancelingId
                            ? { ...booking, status: "Canceled" }
                            : booking
                    )
                );

                router.refresh();
            }

        } catch (err) {

            console.error(err);
            toast.error("Failed to cancel booking");

        } finally {

            setCanceling(false);
            setCancelingId(null);

        }
    };

    if (loading) {
        return (
            <div className="space-y-8 w-11/12 mx-auto mt-20 mb-20">

                {/* Header Skeleton */}
                <div className="animate-pulse">
                    <div className="h-8 w-64 rounded-lg bg-slate-200 dark:bg-zinc-800 mb-3"></div>
                    <div className="h-4 w-96 rounded-lg bg-slate-200 dark:bg-zinc-800"></div>
                </div>

                {/* Table Skeleton */}
                <div className="rounded-2xl overflow-hidden border shadow-sm bg-white border-slate-200 dark:bg-zinc-900 dark:border-zinc-800">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            {/* Table Header */}
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-zinc-800">
                                    {[1, 2, 3, 4, 5, 6].map((item) => (
                                        <th key={item} className="p-4">
                                            <div className="h-4 w-20 rounded bg-slate-200 dark:bg-zinc-800 animate-pulse"></div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>

                                {[1, 2, 3, 4].map((row) => (

                                    <tr
                                        key={row}
                                        className="border-b border-slate-100 dark:border-zinc-800"
                                    >

                                        {/* Tutor */}
                                        <td className="p-4">
                                            <div className="h-5 w-32 rounded bg-slate-200 dark:bg-zinc-800 animate-pulse"></div>
                                        </td>

                                        {/* Student */}
                                        <td className="p-4 space-y-2">
                                            <div className="h-4 w-28 rounded bg-slate-200 dark:bg-zinc-800 animate-pulse"></div>
                                            <div className="h-3 w-40 rounded bg-slate-200 dark:bg-zinc-800 animate-pulse"></div>
                                        </td>

                                        {/* Date */}
                                        <td className="p-4">
                                            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-zinc-800 animate-pulse"></div>
                                        </td>

                                        {/* Fee */}
                                        <td className="p-4">
                                            <div className="h-4 w-14 rounded bg-slate-200 dark:bg-zinc-800 animate-pulse"></div>
                                        </td>

                                        {/* Status */}
                                        <td className="p-4">
                                            <div className="h-7 w-20 rounded-full bg-slate-200 dark:bg-zinc-800 animate-pulse"></div>
                                        </td>

                                        {/* Action */}
                                        <td className="p-4 text-right">
                                            <div className="h-9 w-24 ml-auto rounded-xl bg-slate-200 dark:bg-zinc-800 animate-pulse"></div>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="space-y-8 w-11/12 mx-auto mt-20 mb-20">
            <div>
                <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">
                    My Booked Sessions
                </h1>

                <p className="text-slate-600 dark:text-slate-400">
                    View and manage your upcoming tutoring sessions.
                </p>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-20 rounded-2xl border border-dashed bg-slate-50 border-slate-300 dark:bg-zinc-800/50 dark:border-zinc-700">
                    <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50 text-indigo-600 dark:text-indigo-400" />

                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                        No sessions booked yet
                    </h3>

                    <p className="mb-6 max-w-md mx-auto text-slate-500 dark:text-slate-400">
                        You haven&apos;t booked any tutoring sessions.
                    </p>

                    <Link
                        href="/tutors"
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                        <Search className="w-5 h-5" />
                        Find a Tutor
                    </Link>
                </div>
            ) : (
                <div className="rounded-2xl overflow-hidden border shadow-sm bg-white border-slate-200 dark:bg-zinc-900 dark:border-zinc-800">
                    <div className="overflow-x-auto">

                        <table className="w-full text-left border-collapse">

                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 dark:bg-zinc-800 dark:border-zinc-700 text-sm uppercase tracking-wider font-semibold text-slate-600 dark:text-slate-300">
                                    <th className="p-4">Tutor Name</th>
                                    <th className="p-4">Student Info</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Fee</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">

                                {bookings.map((booking) => (

                                    <tr
                                        key={booking._id}
                                        className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                                    >

                                        <td className="p-4 font-bold text-slate-900 dark:text-white">
                                            {booking.tutorName}
                                        </td>

                                        <td className="p-4">
                                            <p className="font-medium text-slate-800 dark:text-slate-200">
                                                {booking.studentName}
                                            </p>

                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                {booking.studentEmail}
                                            </p>
                                        </td>

                                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                                            {new Date(booking.bookingDate).toLocaleDateString()}
                                        </td>

                                        <td className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                                            ${booking.hourlyFee}
                                        </td>

                                        <td className="p-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${booking.status === 'Booked'
                                                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                                                    : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                                                    }`}
                                            >
                                                {booking.status}
                                            </span>
                                        </td>

                                        <td className="p-4 text-right">

                                            {booking.status === 'Booked' && (

                                                <button
                                                    onClick={() => setCancelingId(booking._id)}
                                                    disabled={canceling}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                    Cancel
                                                </button>

                                            )}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>
                </div>
            )}

            <Dialog.Root
                open={!!cancelingId}
                onOpenChange={(open) => !open && setCancelingId(null)}
            >
                <Dialog.Portal>

                    <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />

                    <Dialog.Content className="fixed top-[50%] left-[50%] w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-2xl shadow-2xl z-50 outline-none p-6 text-center bg-white dark:bg-zinc-900 dark:border dark:border-zinc-800 text-slate-900 dark:text-white">

                        <div className="mx-auto w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
                            <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-500" />
                        </div>

                        <Dialog.Title className="text-xl font-bold mb-2">
                            Cancel Booking
                        </Dialog.Title>

                        <Dialog.Description className="mb-8 text-slate-500 dark:text-slate-400">
                            Are you sure you want to cancel this booking?
                        </Dialog.Description>

                        <div className="flex gap-3 justify-center">

                            <Dialog.Close asChild>
                                <button className="px-5 py-2.5 rounded-xl font-medium flex-1 bg-slate-100 text-slate-700 hover:bg-slate-200">
                                    Keep Booking
                                </button>
                            </Dialog.Close>

                            <button
                                onClick={handleCancelConfirm}
                                disabled={canceling}
                                className="px-5 py-2.5 rounded-xl font-medium bg-red-600 text-white hover:bg-red-700 flex-1 shadow-sm disabled:opacity-50"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    {canceling && (
                                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                                    )}

                                    <span>
                                        {canceling ? "Canceling..." : "Yes, Cancel"}
                                    </span>
                                </div>
                            </button>

                        </div>

                    </Dialog.Content>

                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default BookingsPage;