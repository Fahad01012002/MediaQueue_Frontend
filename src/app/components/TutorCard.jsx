'use client';

import { redirect } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import Image from 'next/image';
import {
    MapPin,
    Award,
    Calendar,
    ArrowLeft,
    CheckCircle2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createStudentBookings, updateSlot } from "../lib/action";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const TutorCard = ({ tutor }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [studentPhone, setStudentPhone] = useState("");
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {

        const loadSession = async () => {
            try {
                const { data: session } = await authClient.getSession();
                setUser(session?.user || null);
            } catch (error) {
                console.error("Failed to load session:", error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadSession();
    }, []);

    if (!tutor) {
        return (
            <div className="text-center py-20 text-slate-900 dark:text-slate-100">
                <h2 className="text-2xl font-bold mb-4">
                    Tutor not found
                </h2>

                <button
                    onClick={() => redirect("/tutors")}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                    Back to Tutors
                </button>
            </div>
        );
    }

    const isFull = tutor.totalSlot === 0;
    const currentDate = new Date();
    const sessionDate = new Date(tutor.sessionStartDate);

    currentDate.setHours(0, 0, 0, 0);
    sessionDate.setHours(0, 0, 0, 0);

    const isTooEarly = currentDate < sessionDate;

    const handleBookSession = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login to book a session");
            redirect("/login");
            return;
        }

        if (isFull) {
            toast.error(
                "This session is fully booked. You can't join at the moment."
            );
            return;
        }

        if (isTooEarly) {
            toast.error(
                "Booking is not available yet for this tutor"
            );
            return;
        }

        console.log(typeof tutor._id, tutor._id);
        console.log(typeof user.id, user.id);

        try {
            const bookingData = {
                tutorId: tutor._id.toString(),
                tutorName: tutor.name,
                studentId: user.id,
                studentName: user.name,
                studentEmail: user.email,
                studentPhone: studentPhone,
                hourlyFee: tutor.hourlyFee,
                bookingDate: new Date().toISOString(),
                status: 'Booked'
            };

            const result = await updateSlot(tutor._id);
            const isBooked = await createStudentBookings(bookingData);

            if (isBooked.success && result.success) {
                toast.success('Session booked successfully!');
                setIsModalOpen(false);
                router.refresh();
            } else {
                toast.error(result.message || "Failed to book session");
            }
        } catch (error) {
            console.error("Booking error:", error);
            toast.error("An error occurred while booking");
        }
    };

    if (isLoading) {
        return (
            <div className="w-10/12 mt-20 mb-20 mx-auto">
                <div className="animate-pulse">
                    <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-xl mb-4"></div>
                    <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-10/12 mt-20 mb-20 mx-auto">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back
            </button>

            {/* Main Card */}
            <div className="rounded-2xl overflow-hidden shadow-sm border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                {/* Banner */}
                <div className="h-48 md:h-64 overflow-hidden relative">
                    <Image
                        src={tutor.photoUrl}
                        alt={tutor.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <div className="inline-block px-3 py-1 mb-3 rounded-full bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider">
                                {tutor.subject}
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {tutor.name}
                            </h1>

                            <p className="text-slate-200 flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {tutor.location} • {tutor.teachingMode}
                            </p>
                        </div>

                        <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30 text-white text-center min-w-30">
                            <p className="text-xs uppercase font-bold tracking-wider opacity-80 mb-1">
                                Fee
                            </p>

                            <p className="text-3xl font-bold">
                                ${tutor.hourlyFee}
                                <span className="text-sm font-normal">
                                    /hr
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Experience */}
                        <section>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
                                <Award className="w-5 h-5 text-indigo-500" />
                                Experience & Background
                            </h2>

                            <div className="p-4 rounded-xl space-y-3 bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300">
                                <p className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-600">
                                    <span className="font-medium">
                                        Institution:
                                    </span>

                                    <span>{tutor.institution}</span>
                                </p>

                                <p className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-600">
                                    <span className="font-medium">
                                        Experience:
                                    </span>

                                    <span>{tutor.experience}</span>
                                </p>

                                <p className="flex justify-between pb-2">
                                    <span className="font-medium">
                                        Creator Contact:
                                    </span>

                                    <span>{tutor.creatorEmail}</span>
                                </p>
                            </div>
                        </section>

                        {/* Schedule */}
                        <section>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
                                <Calendar className="w-5 h-5 text-indigo-500" />
                                Availability & Schedule
                            </h2>

                            <div className="p-4 rounded-xl space-y-3 bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300">
                                <p className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-600">
                                    <span className="font-medium">
                                        Available Days:
                                    </span>

                                    <span>{tutor.availableDays}</span>
                                </p>

                                <p className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-600">
                                    <span className="font-medium">
                                        Time Slot:
                                    </span>

                                    <span>{tutor.timeSlot}</span>
                                </p>

                                <p className="flex justify-between pb-2">
                                    <span className="font-medium">
                                        Session Start Date:
                                    </span>

                                    <span>
                                        {new Date(
                                            tutor.sessionStartDate
                                        ).toLocaleDateString()}
                                    </span>
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Right */}
                    <div className="space-y-6">
                        {/* Slot Card */}
                        <div className="p-6 rounded-2xl border text-center bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600">
                            <h3 className="font-bold mb-2 uppercase text-sm tracking-wider text-slate-500 dark:text-slate-400">
                                Available Slots
                            </h3>

                            <p
                                className={`text-5xl font-bold mb-4 ${isFull
                                    ? "text-red-500"
                                    : "text-emerald-500"
                                    }`}
                            >
                                {tutor.totalSlot}
                            </p>

                            {!user ? (
                                <button
                                    onClick={() => redirect("/login")}
                                    className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors"
                                >
                                    Login to Book
                                </button>
                            ) : (
                                <Dialog.Root
                                    open={isModalOpen}
                                    onOpenChange={setIsModalOpen}
                                >
                                    <Dialog.Trigger asChild>
                                        <button
                                            disabled={isFull || isTooEarly}
                                            className={`w-full py-3 px-4 rounded-xl font-bold transition-all ${isFull
                                                ? "bg-red-100 dark:bg-red-900/30 text-red-500 cursor-not-allowed"
                                                : isTooEarly
                                                    ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 cursor-not-allowed"
                                                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                                                }`}
                                        >
                                            {isFull
                                                ? "No slots left"
                                                : isTooEarly
                                                    ? "Not available yet"
                                                    : "Book Session"}
                                        </button>
                                    </Dialog.Trigger>

                                    {/* Modal */}
                                    <Dialog.Portal>
                                        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50" />

                                        <Dialog.Content className="fixed top-[50%] left-[50%] w-[90vw] max-w-125 translate-x-[-50%] translate-y-[-50%] rounded-2xl p-8 shadow-2xl z-50 outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                                            <Dialog.Title className="text-2xl font-bold mb-6 flex items-center gap-2">
                                                <CheckCircle2 className="w-6 h-6 text-indigo-500" />
                                                Confirm Booking
                                            </Dialog.Title>

                                            <form
                                                onSubmit={handleBookSession}
                                                className="space-y-4"
                                            >
                                                {/* Tutor ID */}
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                                        Tutor ID
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={tutor._id}
                                                        readOnly
                                                        className="w-full p-3 rounded-lg border outline-none opacity-70 cursor-not-allowed bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100"
                                                    />
                                                </div>

                                                {/* Tutor Name */}
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                                        Tutor Name
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={tutor.name}
                                                        readOnly
                                                        className="w-full p-3 rounded-lg border outline-none opacity-70 cursor-not-allowed bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100"
                                                    />
                                                </div>

                                                {/* Student Info */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                                            Student Name
                                                        </label>

                                                        <input
                                                            type="text"
                                                            value={user?.name || ''}
                                                            readOnly
                                                            className="w-full p-3 rounded-lg border outline-none opacity-70 cursor-not-allowed bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                                            Student Email
                                                        </label>

                                                        <input
                                                            type="email"
                                                            value={user?.email || ''}
                                                            readOnly
                                                            className="w-full p-3 rounded-lg border outline-none opacity-70 cursor-not-allowed bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Phone */}
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                                        Phone Number
                                                    </label>

                                                    <input
                                                        type="tel"
                                                        required
                                                        placeholder="e.g. +1 234 567 8900"
                                                        value={studentPhone}
                                                        onChange={(e) =>
                                                            setStudentPhone(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                                                    />
                                                </div>

                                                {/* Summary */}
                                                <div className="mt-6 p-4 rounded-lg flex items-center justify-between bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800">
                                                    <span className="font-medium text-indigo-800 dark:text-indigo-300">
                                                        Status:
                                                        <span className="font-bold">
                                                            {" "}
                                                            Booked
                                                        </span>
                                                    </span>

                                                    <span className="font-bold text-slate-900 dark:text-slate-100">
                                                        Total: ${tutor.hourlyFee}
                                                    </span>
                                                </div>

                                                {/* Buttons */}
                                                <div className="mt-8 flex gap-4 justify-end">
                                                    <Dialog.Close asChild>
                                                        <button
                                                            type="button"
                                                            className="px-5 py-2.5 rounded-lg font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </Dialog.Close>

                                                    <button
                                                        type="submit"
                                                        className="px-5 py-2.5 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                                                    >
                                                        Confirm Booking
                                                    </button>
                                                </div>
                                            </form>
                                        </Dialog.Content>
                                    </Dialog.Portal>
                                </Dialog.Root>
                            )}

                            {isFull && (
                                <p className="text-red-500 text-sm mt-3 font-medium">
                                    No available slots left.
                                </p>
                            )}

                            {isTooEarly && !isFull && (
                                <p className="text-amber-500 dark:text-amber-400 text-sm mt-3 font-medium">
                                    Booking is not available yet for this tutor
                                </p>
                            )}
                        </div>

                        {/* Help Card */}
                        <div className="p-6 rounded-2xl border bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800">
                            <h3 className="font-bold mb-3 text-indigo-900 dark:text-indigo-300">
                                Need Help?
                            </h3>

                            <p className="text-sm mb-4 text-indigo-700 dark:text-indigo-400">
                                If you have any questions about this tutor
                                or the booking process, our support team is
                                here to assist you.
                            </p>

                            <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                                Contact Support →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorCard;