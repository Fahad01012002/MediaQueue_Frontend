import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers';
import { Plus, BookOpen } from 'lucide-react';

import { auth } from '@/lib/auth';
import { getStudentTutorDetails } from '../lib/data';
import DeleteModule from '../components/DeleteModule';
import EditModule from '../components/EditModule';

// Loading Skeleton Component
const TutorsTableSkeleton = () => {
    return (
        <div className="rounded-2xl overflow-hidden border shadow-sm bg-white border-slate-200 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-sm uppercase tracking-wider font-semibold text-slate-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-slate-300">
                            <th className="p-4">Tutor Details</th>
                            <th className="p-4">Subject</th>
                            <th className="p-4">Fee / hr</th>
                            <th className="p-4 text-center">Available Slots</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/50">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <tr key={item} className="animate-pulse">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-slate-200 dark:bg-zinc-700 rounded-lg"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-slate-200 dark:bg-zinc-700 rounded w-32"></div>
                                            <div className="h-3 bg-slate-200 dark:bg-zinc-700 rounded w-20"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="h-6 bg-slate-200 dark:bg-zinc-700 rounded w-20"></div>
                                </td>
                                <td className="p-4">
                                    <div className="h-5 bg-slate-200 dark:bg-zinc-700 rounded w-16"></div>
                                </td>
                                <td className="p-4 text-center">
                                    <div className="h-8 w-8 bg-slate-200 dark:bg-zinc-700 rounded-full mx-auto"></div>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <div className="w-8 h-8 bg-slate-200 dark:bg-zinc-700 rounded-lg"></div>
                                        <div className="w-8 h-8 bg-slate-200 dark:bg-zinc-700 rounded-lg"></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const LoadingState = () => {
    return (
        <div className="space-y-8 p-6 w-11/12 mx-auto">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="animate-pulse">
                    <div className="h-8 bg-slate-200 dark:bg-zinc-700 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-slate-200 dark:bg-zinc-700 rounded w-96"></div>
                </div>
                <div className="animate-pulse">
                    <div className="h-10 bg-slate-200 dark:bg-zinc-700 rounded-xl w-36"></div>
                </div>
            </div>

            {/* Table Skeleton */}
            <TutorsTableSkeleton />
        </div>
    );
};

const MyTutorsContent = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const user = session?.user;
    const id = user.id;

    const data = await getStudentTutorDetails(id , token);

    return (
        <div className="space-y-8 p-6 w-11/12 mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">My Tutors</h1>
                    <p className="text-slate-600 dark:text-slate-400">Manage the tutors you have listed on the platform.</p>
                </div>
                <Link
                    href="/add-tutors"
                    className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5" /> Add New Tutor
                </Link>
            </div>

            {/* Empty state */}
            {data.length === 0 ? (
                <div className="text-center py-20 rounded-2xl border border-dashed bg-slate-50 border-slate-300 dark:bg-zinc-800/50 dark:border-zinc-700">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">No tutors created yet</h3>
                    <p className="mb-6 max-w-md mx-auto text-slate-500 dark:text-slate-400">
                        You haven't listed any tutors yet. Click the button above to add your first tutor.
                    </p>
                    <Link
                        href="/add-tutors"
                        className="inline-flex items-center gap-2 bg-white border border-indigo-200 text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors shadow-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-indigo-400 dark:hover:bg-zinc-700"
                    >
                        <Plus className="w-5 h-5" /> Add Your First Tutor
                    </Link>
                </div>
            ) : (
                /* Table */
                <div className="rounded-2xl overflow-hidden border shadow-sm bg-white border-slate-200 dark:bg-zinc-900 dark:border-zinc-800">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-sm uppercase tracking-wider font-semibold text-slate-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-slate-300">
                                    <th className="p-4">Tutor Details</th>
                                    <th className="p-4">Subject</th>
                                    <th className="p-4">Fee / hr</th>
                                    <th className="p-4 text-center">Available Slots</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/50">
                                {data.map((tutor) => (
                                    <tr key={tutor._id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={tutor.photoUrl}
                                                    alt={tutor.name}
                                                    width={48}
                                                    height={48}
                                                    className="rounded-lg object-cover bg-slate-100"
                                                />
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white">{tutor.name}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{tutor.teachingMode}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                                                {tutor.subject}
                                            </span>
                                        </td>
                                        <td className="p-4 font-medium text-slate-700 dark:text-slate-300">
                                            ${tutor.hourlyFee}
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${tutor.totalSlot === 0 ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
                                                {tutor.totalSlot}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <EditModule tutor={tutor} />
                                                <DeleteModule id={tutor._id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

const MyTutorsPage = () => {
    return (
        <Suspense fallback={<LoadingState />}>
            <MyTutorsContent />
        </Suspense>
    );
};

export default MyTutorsPage;