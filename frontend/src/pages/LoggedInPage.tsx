import { FaPlus } from 'react-icons/fa';
import Note from '../components/Note';
import { NotesType } from '../../../backend/src/shared/types';
import { useEffect, useState } from 'react';
import * as apiClient from '../network/api-client';
import AddEditNoteModal from '../components/AddEditNoteModal';
import { toast } from 'react-toastify';

const LoggedInView = () => {
    const [notes, setNotes] = useState<NotesType[]>([]);
    const [noteToEdit, setNoteToEdit] = useState<NotesType | null>(null);
    const [showAddNoteDialogue, setShowAddNoteDialogue] = useState(false);

    useEffect(() => {
        async function loadNotes() {
            try {
                const notes = await apiClient.fetchNotes();
                setNotes(notes);
            } catch (error) {
                console.error(error);
            } finally {
                console.log('done loading notes');
            }
        }
        loadNotes();
    }, []);
    async function deleteNote(note: NotesType) {
        try {
            await apiClient.deleteNote(note._id);
            setNotes(
                notes.filter((existingNote) => existingNote._id !== note._id)
            );
            toast.warn('Your note has been deleted!');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again.');
        }
    }
    return (
        <div>
            <div className="flex justify-center mb-4">
                <button
                    className="flex items-center justify-center focus:outline-none text-white bg-teal-700 hover:bg-teal-600 focus:ring-2 focus:ring-teal-600 font-semibold rounded-lg text-sm px-5 py-2.5 gap-2"
                    onClick={() => setShowAddNoteDialogue(true)}
                >
                    <FaPlus />
                    Add Note
                </button>
            </div>
            {notes.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {notes.map((note) => (
                            <Note
                                key={note._id}
                                note={note}
                                onNoteClicked={setNoteToEdit}
                                onDeleteNoteClicked={deleteNote}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-white text-3xl text-center">
                    You don't have any notes
                </div>
            )}

            {showAddNoteDialogue && (
                <AddEditNoteModal
                    onDismiss={() => setShowAddNoteDialogue(false)}
                    onNoteSaved={(newNote) => {
                        setNotes([...notes, newNote]);
                        setShowAddNoteDialogue(false);
                    }}
                />
            )}

            {noteToEdit && (
                <AddEditNoteModal
                    noteToEdit={noteToEdit}
                    onDismiss={() => setNoteToEdit(null)}
                    onNoteSaved={(updatedNote) => {
                        console.log('Updated Note:', updatedNote);
                        setNotes(
                            notes.map((existingNote) =>
                                existingNote._id === updatedNote._id
                                    ? updatedNote
                                    : existingNote
                            )
                        );
                        setNoteToEdit(null);
                    }}
                />
            )}
        </div>
    );
};

export default LoggedInView;
