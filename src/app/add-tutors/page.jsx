'use client'
import { Upload, BookOpen, CalendarIcon, Clock, DollarSign, Users, MapPin, Briefcase } from 'lucide-react';
import { createMyTutorsCollection, createTutorsCollection } from '../lib/action';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';

const AddTutorsPage = () => {

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all";
    const labelClass = "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1";

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const tutorData = Object.fromEntries(formData.entries());

        const { _id, name, photoUrl, subject, teachingMode, availableDays, timeSlot, hourlyFee, totalSlot, sessionStartDate, location, institution, experience } = tutorData;

        console.log(tutorData);

        const tutorDetails = {
            userId: user?.id,
            name,
            photoUrl,
            subject,
            teachingMode,
            availableDays,
            timeSlot,
            hourlyFee,
            totalSlot,
            sessionStartDate,
            location,
            institution,
            experience
        }

        const tutorsCollection = await createTutorsCollection(tutorDetails);

        if (tutorsCollection.success) {
            const myTutorsCollection = await createMyTutorsCollection({
                ...tutorDetails,
                _id: tutorsCollection.data.insertedId
            });

            if (myTutorsCollection.success) {
                toast.success(`${tutorDetails.name} is added to tutors list`);
            } else {
                toast.error('Something went wrong');
            }
        } else {
            toast.error('Something went wrong');
        }
    };

    return (
        <div className="w-7/12 mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                    Add New Tutor
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Fill in the details to create a new tutor listing.
                </p>
            </div>

            <div className="rounded-2xl shadow-sm border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className={labelClass}>Tutor Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="name"
                                placeholder="e.g. John Doe"
                                className={inputClass}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className={labelClass}>Photo URL <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="url"
                                    name="photoUrl"
                                    placeholder="https://imgbb.com/..."
                                    className={`${inputClass} pl-10`}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className={labelClass}>Subject / Category</label>
                            <div className="relative">
                                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <select
                                    name="subject"
                                    className={`${inputClass} pl-10 appearance-none`}
                                >
                                    <option value="Mathematics">Mathematics</option>
                                    <option value="Physics">Physics</option>
                                    <option value="Chemistry">Chemistry</option>
                                    <option value="English Literature">English Literature</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Languages">Languages</option>
                                    <option value="Biology">Biology</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className={labelClass}>Teaching Mode</label>
                            <select
                                name="teachingMode"
                                className={inputClass}
                            >
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                                <option value="Both">Both</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className={labelClass}>Available Days</label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    name="availableDays"
                                    placeholder="e.g. Sun - Thu"
                                    className={`${inputClass} pl-10`}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className={labelClass}>Time Slot</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    name="timeSlot"
                                    placeholder="e.g. 5:00 PM - 8:00 PM"
                                    className={`${inputClass} pl-10`}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className={labelClass}>Hourly Fee ($) <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="number"
                                    min="0"
                                    name="hourlyFee"
                                    placeholder="e.g. 50"
                                    className={`${inputClass} pl-10`}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className={labelClass}>Total Slots <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="number"
                                    min="1"
                                    name="totalSlot"
                                    placeholder="e.g. 10"
                                    className={`${inputClass} pl-10`}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className={labelClass}>Session Start Date <span className="text-red-500">*</span></label>
                            <input
                                type="date"
                                name="sessionStartDate"
                                className={inputClass}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className={labelClass}>Location (Area/City)</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="e.g. New York, NY"
                                    className={`${inputClass} pl-10`}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className={labelClass}>Institution</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    name="institution"
                                    placeholder="e.g. Harvard University"
                                    className={`${inputClass} pl-10`}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className={labelClass}>Experience</label>
                            <input
                                type="text"
                                name="experience"
                                placeholder="e.g. 5 years teaching advanced calculus"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-200 dark:border-zinc-700 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-6 py-3 rounded-xl font-medium transition-colors bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition-all hover:-translate-y-0.5"
                        >
                            Add Tutor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTutorsPage;