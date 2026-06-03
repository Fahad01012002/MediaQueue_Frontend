'use client'

import * as Dialog from '@radix-ui/react-dialog';
import { Loader2, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { updateMyTutors } from '../lib/action';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const inputClass = 'w-full p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all';

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'English Literature', 'Computer Science'];
const TEACHING_MODES = ['Online', 'Offline', 'Both'];

const EditModule = ({ tutor }) => {
    const router = useRouter();

    console.log(tutor);

    const [editingTutor, setEditingTutor] = useState(tutor);
    const [editOpen, setEditOpen] = useState(false);
    const [updating, setUpdating] = useState(false);

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const result = await updateMyTutors(tutor._id, editingTutor);
            console.log(result.success)
            if (result.success) {
                toast.success('Data edited successfully');
            } else {
                toast.error('Try to change atleast single data!');
            }
            router.refresh();
            setEditOpen(false);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div>
            <Dialog.Root open={editOpen} onOpenChange={setEditOpen}>
                <Dialog.Trigger asChild>
                    <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-indigo-600 dark:text-indigo-400 transition-colors">
                        <Edit2 className="w-4 h-4" />
                    </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[90vh] w-[90vw] max-w-150 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl z-100 outline-none overflow-y-auto bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">

                        {/* Header */}
                        <div className="sticky top-0 z-10 px-6 py-4 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center ">
                            <Dialog.Title className="text-xl font-bold text-slate-900 dark:text-white">
                                Update Tutor
                            </Dialog.Title>
                            <Dialog.Close className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors text-slate-500 dark:text-zinc-400">
                                ✕
                            </Dialog.Close>
                        </div>

                        <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tutor Name</label>
                                    <input
                                        type="text"
                                        value={editingTutor.name}
                                        onChange={(e) => setEditingTutor({ ...editingTutor, name: e.target.value })}
                                        className={inputClass}
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Photo URL</label>
                                    <input
                                        type="url"
                                        value={editingTutor.photoUrl}
                                        onChange={(e) => setEditingTutor({ ...editingTutor, photoUrl: e.target.value })}
                                        className={inputClass}
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Subject</label>
                                    <select
                                        value={editingTutor.subject}
                                        onChange={(e) => setEditingTutor({ ...editingTutor, subject: e.target.value })}
                                        className={inputClass}
                                    >
                                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Teaching Mode</label>
                                    <select
                                        value={editingTutor.teachingMode}
                                        onChange={(e) => setEditingTutor({ ...editingTutor, teachingMode: e.target.value })}
                                        className={inputClass}
                                    >
                                        {TEACHING_MODES.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Hourly Fee ($)</label>
                                    <input
                                        type="number"
                                        value={editingTutor.hourlyFee}
                                        onChange={(e) => setEditingTutor({ ...editingTutor, hourlyFee: Number(e.target.value) })}
                                        className={inputClass}
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Slots</label>
                                    <input
                                        type="number"
                                        value={editingTutor.totalSlot}
                                        onChange={(e) => setEditingTutor({ ...editingTutor, totalSlot: Number(e.target.value) })}
                                        className={inputClass}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-200 dark:border-zinc-800 flex justify-end gap-3">
                                <Dialog.Close asChild>
                                    <button type="button" className="px-4 py-2 rounded-lg font-medium bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-zinc-700">
                                        Cancel
                                    </button>
                                </Dialog.Close>
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="px-5 py-2 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm disabled:opacity-60 flex items-center gap-2"
                                >
                                    {updating && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default EditModule;