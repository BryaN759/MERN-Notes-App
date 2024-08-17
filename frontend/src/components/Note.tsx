import { MdDelete } from 'react-icons/md';
import { NotesType } from '../../../backend/src/shared/types';
import { formatDate } from '../utils/formatDate';

interface NoteProps {
    note: NotesType;
    onNoteClicked: (note: NotesType) => void;
    onDeleteNoteClicked: (note: NotesType) => void;
}
const Note = ({ note, onNoteClicked, onDeleteNoteClicked }: NoteProps) => {
    const { title, text, createdAt, updatedAt } = note;
    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = 'Updated: ' + formatDate(updatedAt);
    } else {
        createdUpdatedText = 'Created: ' + formatDate(createdAt);
    }
    return (
        <div
            className="bg-amber-200 rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => onNoteClicked(note)}
        >
            <div className="p-4 h-40 flex flex-col">
                <div className="flex items-center">
                    <h5 className="text-lg font-semibold">{title}</h5>
                    <MdDelete
                        className="ml-auto text-gray-500 hover:text-red-500"
                        onClick={(e) => {
                            onDeleteNoteClicked(note);
                            e.stopPropagation();
                        }}
                    />
                </div>
                <p className="mt-2 text-gray-700 flex-grow overflow-hidden text-ellipsis">
                    {text}
                </p>
            </div>
            <div className="bg-amber-300 px-4 py-2 text-sm text-gray-500 flex-shrink-0">
                {createdUpdatedText}
            </div>
        </div>
    );
};

export default Note;
