'use client'

import * as Dialog from '@radix-ui/react-dialog';
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { deleteMyTutor } from '../lib/action';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const DeleteModule = ({ id }) => {

    const router = useRouter();

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDeleteConfirm = async () => {
        setDeleting(true);
        try {
            const result = await deleteMyTutor(id);
            if (result.success) {
                toast.success('Deleted Successfully');
            } else {
                toast.error('Something went wrong');
            }
            router.refresh();
        } finally {
            setDeleting(false);
        }
    }

    return (
        <div>
            <Dialog.Root open={deleteOpen} onOpenChange={setDeleteOpen}>
                <Dialog.Trigger asChild>
                    <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-red-600 dark:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-100 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl z-50 outline-none p-6 text-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                        <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-500" />
                        </div>
                        <Dialog.Title className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                            Delete Tutor
                        </Dialog.Title>
                        <Dialog.Description className="mb-8 text-slate-500 dark:text-slate-400">
                            Are you sure? This action cannot be undone and will permanently remove this listing.
                        </Dialog.Description>
                        <div className="flex gap-3 justify-center">
                            <Dialog.Close asChild>
                                <button className="px-5 py-2.5 rounded-xl font-medium flex-1 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-zinc-700">
                                    Cancel
                                </button>
                            </Dialog.Close>
                            <button
                                onClick={async () => {
                                    await handleDeleteConfirm();
                                    setDeleteOpen(false);
                                }}
                                disabled={deleting}
                                className="px-5 py-2.5 rounded-xl font-medium bg-red-600 text-white hover:bg-red-700 flex-1 shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
                            >
                                {deleting && <Loader2 className="w-4 h-4 animate-spin" />}
                                Yes, Delete
                            </button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default DeleteModule;