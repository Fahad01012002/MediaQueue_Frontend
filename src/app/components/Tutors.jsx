'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Filter, BookOpen, Clock, Star, MapPin, Search } from "lucide-react";

const Tutors = ({ tutor }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const filteredTutors = useMemo(() => {
        return tutor.filter(tutor => {
            const matchName = tutor.name.toLowerCase().includes(searchTerm.toLowerCase());

            let matchDate = true;
            if (startDate || endDate) {
                const tDate = new Date(tutor.sessionStartDate);
                if (startDate) matchDate = matchDate && tDate >= new Date(startDate);
                if (endDate) matchDate = matchDate && tDate <= new Date(endDate);
            }

            return matchName && matchDate;
        });
    }, [tutor, searchTerm, startDate, endDate]);

    return (
        <div className="space-y-8 p-6 w-11/12 mx-auto">

            {/* Header */}
            <div className="mt-10">
                <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">
                    Available Tutors
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Find the perfect match for your educational needs.
                </p>
            </div>

            {/* Filter Bar */}
            <div className="p-6 rounded-xl border shadow-sm bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Search */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Search by Name
                        </label>

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="e.g. Robert Smith"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* From Date */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Session Start (From)
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    {/* To Date */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Session Start (To)
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                </div>
            </div>

            {/* No Result */}
            {filteredTutors.length === 0 ? (
                <div className="text-center py-20 rounded-xl border bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
                    <Filter className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-zinc-600" />
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                        No tutors found
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400">
                        Try adjusting your search or filters.
                    </p>
                </div>
            ) : (

                /* Cards */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {filteredTutors.map((tutor) => (
                        <div
                            key={tutor._id}
                            className="rounded-xl overflow-hidden border shadow-sm bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800"
                        >

                            {/* Image */}
                            <div className="h-56 relative overflow-hidden">
                                <Image
                                    src={tutor.photoUrl}
                                    alt={tutor.name}
                                    width={400}
                                    height={300}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                />

                                <div className="absolute top-3 right-3 bg-white/90 dark:bg-zinc-800/90 px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                                    <Star className="w-3 h-3" />
                                    {tutor.subject}
                                </div>

                                <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {tutor.teachingMode}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4">

                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        {tutor.name}
                                    </h3>

                                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                                        ${tutor.hourlyFee}
                                        <span className="text-xs text-slate-500">/hr</span>
                                    </span>
                                </div>

                                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" />
                                    {tutor.institution}
                                </p>

                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <Clock className="w-4 h-4 text-indigo-500" />
                                    {tutor.availableDays} ({tutor.timeSlot})
                                </div>

                                <div className="flex justify-between items-center p-3 rounded-lg border bg-slate-50 dark:bg-zinc-800 border-slate-100 dark:border-zinc-700">
                                    <span className="text-xs font-bold uppercase text-slate-500">
                                        Slots
                                    </span>

                                    <span className={`font-bold ${tutor.totalSlot === 0 ? "text-red-500" : "text-emerald-500"}`}>
                                        {tutor.totalSlot === 0 ? "Full" : tutor.totalSlot}
                                    </span>
                                </div>

                                <Link
                                    href={`/tutors/${tutor._id}`}
                                    className="block text-center py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition font-semibold"
                                >
                                    Book Session
                                </Link>

                            </div>
                        </div>
                    ))}

                </div>
            )}

        </div>
    );
};

export default Tutors;