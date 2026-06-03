"use client";

import { useState, useEffect } from "react";
import Tutors from "../components/Tutors";
import { getTutor } from "../lib/data";

// Loading Skeleton (MyTutors style)
const LoadingSkeleton = () => {
    return (
        <div className="space-y-8 p-6 w-11/12 mx-auto">
            {/* Header */}
            <div className="mt-10 animate-pulse">
                <div className="h-8 w-56 rounded bg-slate-200 dark:bg-zinc-700 mb-3"></div>
                <div className="h-4 w-80 rounded bg-slate-200 dark:bg-zinc-700"></div>
            </div>

            {/* Filter Section */}
            <div className="p-6 rounded-xl border shadow-sm bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="space-y-2">
                            <div className="h-4 w-28 rounded bg-slate-200 dark:bg-zinc-700"></div>
                            <div className="h-10 rounded-lg bg-slate-200 dark:bg-zinc-700"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                        key={item}
                        className="rounded-xl overflow-hidden border shadow-sm bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800"
                    >
                        <div className="animate-pulse">
                            {/* Image */}
                            <div className="h-56 bg-slate-200 dark:bg-zinc-700"></div>

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="h-6 w-32 rounded bg-slate-200 dark:bg-zinc-700"></div>
                                    <div className="h-6 w-16 rounded bg-slate-200 dark:bg-zinc-700"></div>
                                </div>

                                <div className="h-4 w-40 rounded bg-slate-200 dark:bg-zinc-700"></div>

                                <div className="h-4 w-full rounded bg-slate-200 dark:bg-zinc-700"></div>

                                <div className="rounded-lg border border-slate-100 dark:border-zinc-800 p-3">
                                    <div className="flex justify-between items-center">
                                        <div className="h-3 w-24 rounded bg-slate-200 dark:bg-zinc-700"></div>
                                        <div className="h-6 w-10 rounded-full bg-slate-200 dark:bg-zinc-700"></div>
                                    </div>
                                </div>

                                <div className="h-11 rounded-xl bg-slate-200 dark:bg-zinc-700"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Tutorspage = () => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                setLoading(true);
                const data = await getTutor();
                setTutors(data);
                setError(null);
            } catch (err) {
                setError("Failed to load tutors. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTutors();
    }, []);

    if (loading) return <LoadingSkeleton />;

    if (error) {
        return (
            <div className="w-11/12 mx-auto p-6 mt-10">
                <div className="rounded-2xl border shadow-sm bg-white dark:bg-zinc-900 border-red-200 dark:border-red-900/30 p-10 text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h2>
                    <p className="text-red-500">{error}</p>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-5 px-5 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-11/12 mx-auto p-6">
            <Tutors tutor={tutors} />
        </div>
    );
};

export default Tutorspage;