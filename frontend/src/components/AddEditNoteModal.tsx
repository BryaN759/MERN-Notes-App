import { useForm } from 'react-hook-form';
import { NotesType } from '../../../backend/src/shared/types';
import * as apiClient from '../network/api-client';
import { toast } from 'react-toastify';

interface AddEditNoteDialogueProps {
    noteToEdit?: NotesType;
    onDismiss: () => void;
    onNoteSaved: (note: NotesType) => void;
}

export interface NoteInput {
    title: string;
    text?: string;
}

const AddEditNoteModal = ({
    onDismiss,
    noteToEdit,
    onNoteSaved
}: AddEditNoteDialogueProps) => {
    const {
        register,
        handleSubmit
        // formState: { errors, isSubmitting },
    } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || '',
            text: noteToEdit?.text || ''
        }
    });
    async function onSubmit(input: NoteInput) {
        try {
            let noteResponse: NotesType;
            if (noteToEdit) {
                noteResponse = await apiClient.updateNote(
                    noteToEdit._id,
                    input
                );
                toast.success('Note updated successfully!');
            } else {
                noteResponse = await apiClient.createNote(input);
                toast.success('Note added successfully!');
            }

            onNoteSaved(noteResponse);
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again.');
        }
    }
    return (
        <div className="fixed inset-0 bg-slate-400 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="relative flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-[400px] bg-slate-800 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="flex justify-end px-2 pt-2">
                        <button
                            onClick={onDismiss}
                            className="text-white bg-transparent hover:bg-gray-700 rounded-full p-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="pt-0 pb-6 px-6 space-y-4 md:space-y-6 sm:px-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-200 md:text-2xl">
                            {noteToEdit ? 'Edit Note' : 'Add Note'}
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter a title"
                                    {...register('title', { required: true })}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">
                                    Text
                                </label>
                                <textarea
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-32 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter the text here"
                                    {...register('text')}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEditNoteModal;
